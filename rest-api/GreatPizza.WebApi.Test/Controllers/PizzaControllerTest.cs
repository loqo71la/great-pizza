using System.Linq.Expressions;
using System.Net;
using System.Text;
using System.Text.Json;
using GreatPizza.Domain.Commons;
using GreatPizza.Domain.Entities;
using GreatPizza.Domain.Interfaces;
using GreatPizza.WebApi.DTOs;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;

namespace GreatPizza.WebApi.Test.Controllers;

public class PizzaControllerTest
{
    private readonly Mock<IToppingRepository> _mockToppingRepository;
    private readonly Mock<IPizzaRepository> _mockPizzaRepository;
    private readonly HttpClient _client;

    public PizzaControllerTest()
    {
        _mockToppingRepository = new Mock<IToppingRepository>();
        _mockPizzaRepository = new Mock<IPizzaRepository>();
        _client = new WebApplicationFactory<Program>()
            .WithWebHostBuilder(builder =>
            {
                builder.ConfigureTestServices(services =>
                    {
                        services.AddScoped(_ => _mockToppingRepository.Object);
                        services.AddScoped(_ => _mockPizzaRepository.Object);
                    });
            })
            .CreateClient();
    }

    public static IEnumerable<object[]> PizzaScenario()
    {
        var pizzas = new[] { new Pizza { Id = 1 }, new Pizza { Id = 2 }, new Pizza { Id = 3 } };
        var emptyPizzas = Array.Empty<Pizza>();
        return new List<object[]>
        {
            new object[] {"", 0, 1, 1, null, null, emptyPizzas},
            new object[] {"?limit=10&page=1", 0, 1, 1, null, null, emptyPizzas},
            new object[] {"", 3, 1, 1, null, null, pizzas},
            new object[] {"?limit=1", 3, 3, 1, "http://localhost/api/pizza?page=2&limit=1", null, pizzas},
            new object[]
            {
                "?page=2&limit=1", 3, 3, 2, "http://localhost/api/pizza?page=3&limit=1",
                "http://localhost/api/pizza?page=1&limit=1", pizzas
            },
            new object[]
                {"?page=3&limit=1", 3, 3, 3, null, "http://localhost/api/pizza?page=2&limit=1", pizzas},
        };
    }

    [Theory]
    [MemberData(nameof(PizzaScenario))]
    public async Task GetAll_WithMultipleScenarios_ReturnsPage(string query, int totalItems, int totalPages,
        int currentPage, string next, string previous, IEnumerable<Pizza> pizzas)
    {
        // Arrange
        _mockPizzaRepository.Setup(repository => repository.GetAll(It.IsAny<Pageable>()))
            .ReturnsAsync(pizzas);
        _mockPizzaRepository.Setup(repository => repository.Count())
            .ReturnsAsync(totalItems);

        // Act
        var response = await _client.GetAsync($"/api/pizza{query}");
        var content = await response.Content.ReadAsStringAsync();
        var pageDto = JsonSerializer.Deserialize<PageDTO<PizzaDTO>>(content);

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

        Assert.Equal(totalItems, pageDto.TotalItems);
        Assert.Equal(totalPages, pageDto.TotalPages);
        Assert.Equal(currentPage, pageDto.CurrentPage);
        Assert.Equal(previous, pageDto.Previous);
        Assert.Equal(next, pageDto.Next);
        Assert.NotNull(pageDto.Items);

        _mockPizzaRepository.Verify(repository => repository.GetAll(It.IsAny<Pageable>()), Times.Once);
        _mockPizzaRepository.Verify(repository => repository.Count(), Times.Once);
    }

    [Fact]
    public async Task Get_WhenPizzaNotFound_ReturnsErrorResponse()
    {
        // Arrange
        _mockPizzaRepository.Setup(repository => repository.Get(1))
            .Returns(null);

        // Act
        var response = await _client.GetAsync("/api/pizza/1");
        var content = await response.Content.ReadAsStringAsync();
        var responseDto = JsonSerializer.Deserialize<ResponseDTO>(content);

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

        Assert.Equal("Error", responseDto.Status);
        Assert.Equal("Pizza with ID [1] was not found.", responseDto.Message);
        _mockPizzaRepository.Verify(repository => repository.Get(1), Times.Once);
    }

    [Fact]
    public async Task Get_WhenPizzaExist_ReturnsDTO()
    {
        // Arrange
        var pizza = new Pizza
        {
            Id = 1,
            Name = "Hawaiian",
            Price = 12.95m,
            Size = "L",
            CreatedDate = new DateTime(2021, 7, 7, 0, 0, 0, DateTimeKind.Utc),
            Toppings = new[] { new Topping { Id = 1 }, new Topping { Id = 2 } }
        };
        _mockPizzaRepository.Setup(repository => repository.Get(1))
            .ReturnsAsync(pizza);

        // Act
        var response = await _client.GetAsync("/api/pizza/1");
        var content = await response.Content.ReadAsStringAsync();
        var pizzaDto = JsonSerializer.Deserialize<PizzaDTO>(content);

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

        Assert.Equal(1, pizzaDto.Id);
        Assert.Equal("Hawaiian", pizzaDto.Name);
        Assert.Equal(12.95m, pizzaDto.Price);
        Assert.Equal("L", pizzaDto.Size);
        Assert.Equal("2021-07-07T00:00:00.000Z", pizzaDto.CreatedDate);
        Assert.Equal("1,2", string.Join(",", pizzaDto.Toppings.Select(topping => topping.Id)));
        _mockPizzaRepository.Verify(repository => repository.Get(1), Times.Once);
    }

    [Fact]
    public async Task Post_WhenPizzaDoesNotExist_ReturnsCreatedResponse()
    {
        // Arrange
        var payload = "{\"name\":\"Hawaiian\",\"size\":\"L\",\"price\":12.95}";
        var body = new StringContent(payload, Encoding.UTF8, "application/json");
        _mockPizzaRepository.Setup(repository => repository.GetWhere(It.IsAny<Expression<Func<Pizza, bool>>>()))
            .Returns(null);
        _mockPizzaRepository.Setup(repository => repository.Add(It.IsAny<Pizza>()))
            .Callback((Pizza pizza) => pizza.Id = 1)
            .Returns(Task.CompletedTask);

        // Act
        var response = await _client.PostAsync("/api/pizza", body);
        var content = await response.Content.ReadAsStringAsync();
        var responseDto = JsonSerializer.Deserialize<ResponseDTO>(content);

        // Assert
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

        Assert.Equal("Success", responseDto.Status);
        Assert.Equal("http://localhost/api/pizza/1", responseDto.Message);
        _mockPizzaRepository.Verify(repository => repository.GetWhere(It.IsAny<Expression<Func<Pizza, bool>>>()),
            Times.Once);
        _mockPizzaRepository.Verify(repository => repository.Add(It.IsAny<Pizza>()), Times.Once);
    }

    [Fact]
    public async Task Post_WhenPizzaAlreadyExist_ReturnsErrorResponse()
    {
        // Arrange
        var payload = "{\"name\":\"Hawaiian\",\"size\":\"L\",\"price\":12.95}";
        var body = new StringContent(payload, Encoding.UTF8, "application/json");
        _mockPizzaRepository.Setup(repository => repository.GetWhere(It.IsAny<Expression<Func<Pizza, bool>>>()))
            .ReturnsAsync(new Pizza { Id = 1 });

        // Act
        var response = await _client.PostAsync("/api/pizza", body);
        var content = await response.Content.ReadAsStringAsync();
        var responseDto = JsonSerializer.Deserialize<ResponseDTO>(content);

        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

        Assert.Equal("Error", responseDto.Status);
        Assert.Equal("Pizza with name [Hawaiian] already exist.", responseDto.Message);
        _mockPizzaRepository.Verify(repository => repository.GetWhere(It.IsAny<Expression<Func<Pizza, bool>>>()),
            Times.Once);
        _mockPizzaRepository.Verify(repository => repository.Add(It.IsAny<Pizza>()), Times.Never);
    }

    [Fact]
    public async Task Put_WhenPizzaDoesNotExist_ReturnsErrorResponse()
    {
        // Arrange
        var payload = "{\"name\":\"Hawaiian\",\"size\":\"L\",\"price\":12.95}";
        var body = new StringContent(payload, Encoding.UTF8, "application/json");
        _mockPizzaRepository.Setup(repository => repository.Get(1))
            .Returns(null);

        // Act
        var response = await _client.PutAsync("/api/pizza/1", body);
        var content = await response.Content.ReadAsStringAsync();
        var responseDto = JsonSerializer.Deserialize<ResponseDTO>(content);

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

        Assert.Equal("Error", responseDto.Status);
        Assert.Equal("Pizza with ID [1] was not found.", responseDto.Message);
        _mockPizzaRepository.Verify(repository => repository.Get(1), Times.Once);
        _mockPizzaRepository.Verify(repository => repository.Update(It.IsAny<Pizza>()), Times.Never);
    }

    [Fact]
    public async Task Put_WhenPizzaExist_ReturnsUpdatedResponse()
    {
        // Arrange
        var payload = "{\"name\":\"Hawaiian\",\"size\":\"L\",\"price\":12.95}";
        var body = new StringContent(payload, Encoding.UTF8, "application/json");
        _mockPizzaRepository.Setup(repository => repository.Get(1))
            .ReturnsAsync(new Pizza { Id = 1 });
        _mockPizzaRepository.Setup(repository => repository.Update(It.IsAny<Pizza>()))
            .Returns(Task.CompletedTask);

        // Act
        var response = await _client.PutAsync("/api/pizza/1", body);
        var content = await response.Content.ReadAsStringAsync();
        var responseDto = JsonSerializer.Deserialize<ResponseDTO>(content);

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

        Assert.Equal("Success", responseDto.Status);
        Assert.Equal("Pizza with ID [1] was successfully updated.", responseDto.Message);
        _mockPizzaRepository.Verify(repository => repository.Get(1), Times.Once);
        _mockPizzaRepository.Verify(repository => repository.Update(It.IsAny<Pizza>()), Times.Once);
    }

    [Fact]
    public async Task Delete_WhenPizzaDoesNotExist_ReturnsDeletedResponse()
    {
        // Arrange
        _mockPizzaRepository.Setup(repository => repository.Get(1))
            .Returns(null);

        // Act
        var response = await _client.DeleteAsync("/api/pizza/1");
        var content = await response.Content.ReadAsStringAsync();
        var responseDto = JsonSerializer.Deserialize<ResponseDTO>(content);

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

        Assert.Equal("Success", responseDto.Status);
        Assert.Equal("Pizza with ID [1] was successfully removed.", responseDto.Message);
        _mockPizzaRepository.Verify(repository => repository.Get(1), Times.Once);
        _mockPizzaRepository.Verify(repository => repository.Remove(It.IsAny<Pizza>()), Times.Never);
    }

    [Fact]
    public async Task Delete_WhenPizzaExist_ReturnsDeletedResponse()
    {
        // Arrange
        _mockPizzaRepository.Setup(repository => repository.Get(1))
            .ReturnsAsync(new Pizza { Id = 1 });
        _mockPizzaRepository.Setup(repository => repository.Remove(It.IsAny<Pizza>()))
            .Returns(Task.CompletedTask);

        // Act
        var response = await _client.DeleteAsync("/api/pizza/1");
        var content = await response.Content.ReadAsStringAsync();
        var responseDto = JsonSerializer.Deserialize<ResponseDTO>(content);

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

        Assert.Equal("Success", responseDto.Status);
        Assert.Equal("Pizza with ID [1] was successfully removed.", responseDto.Message);
        _mockPizzaRepository.Verify(repository => repository.Get(1), Times.Once);
        _mockPizzaRepository.Verify(repository => repository.Remove(It.IsAny<Pizza>()), Times.Once);
    }

    [Fact]
    public async Task Post_AssignToppingWhenPizzaDoesNotExist_ReturnsErrorResponse()
    {
        // Arrange
        var body = new StringContent("{\"ids\":[3]}", Encoding.UTF8, "application/json");
        _mockPizzaRepository.Setup(repository => repository.Get(1)).Returns(null);

        // Act
        var response = await _client.PostAsync("/api/pizza/1/topping/assign", body);
        var content = await response.Content.ReadAsStringAsync();
        var responseDto = JsonSerializer.Deserialize<ResponseDTO>(content);

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

        Assert.Equal("Error", responseDto.Status);
        Assert.Equal("Pizza with ID [1] was not found.", responseDto.Message);
        _mockPizzaRepository.Verify(repository => repository.Get(1), Times.Once);
        _mockToppingRepository.Verify(repository => repository.Get(3), Times.Never);
        _mockPizzaRepository.Verify(repository => repository.Update(It.IsAny<Pizza>()), Times.Never);
    }

    [Fact]
    public async Task Post_AssignNotFoundTopping_ReturnsErrorResponse()
    {
        // Arrange
        var body = new StringContent("{\"ids\":[3,7]}", Encoding.UTF8, "application/json");
        _mockPizzaRepository.Setup(repository => repository.Get(1))
            .ReturnsAsync(new Pizza { Id = 1, Toppings = new List<Topping>() });
        _mockToppingRepository.Setup(repository => repository.GetAllWhere(It.IsAny<Expression<Func<Topping, bool>>>(), null))
            .ReturnsAsync(new Topping[] { new Topping { Id = 3 } });

        // Act
        var response = await _client.PostAsync("/api/pizza/1/topping/assign", body);
        var content = await response.Content.ReadAsStringAsync();
        var responseDto = JsonSerializer.Deserialize<ResponseDTO>(content);

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

        Assert.Equal("Error", responseDto.Status);
        Assert.Equal("Toppings with IDs [7] were not found.", responseDto.Message);
        _mockPizzaRepository.Verify(repository => repository.Get(1), Times.Once);
        _mockToppingRepository.Verify(repository => repository.GetAllWhere(It.IsAny<Expression<Func<Topping, bool>>>(), null), Times.Once);
        _mockPizzaRepository.Verify(repository => repository.Update(It.IsAny<Pizza>()), Times.Never);
    }

    [Fact]
    public async Task Post_AssignToppingWhenPizzaExist_ReturnsAssignedResponse()
    {
        // Arrange
        var body = new StringContent("{\"ids\":[3,7]}", Encoding.UTF8, "application/json");
        _mockPizzaRepository.Setup(repository => repository.Get(1))
            .ReturnsAsync(new Pizza { Id = 1, Toppings = new List<Topping>() });
        _mockToppingRepository.Setup(repository => repository.GetAllWhere(It.IsAny<Expression<Func<Topping, bool>>>(), null))
            .ReturnsAsync(new Topping[] { new Topping { Id = 3 }, new Topping { Id = 7 } });

        // Act
        var response = await _client.PostAsync("/api/pizza/1/topping/assign", body);
        var content = await response.Content.ReadAsStringAsync();
        var responseDto = JsonSerializer.Deserialize<ResponseDTO>(content);

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

        Assert.Equal("Success", responseDto.Status);
        Assert.Equal("Toppings with IDs [3,7] were successfully assigned.", responseDto.Message);
        _mockPizzaRepository.Verify(repository => repository.Get(1), Times.Once);
        _mockToppingRepository.Verify(repository => repository.GetAllWhere(It.IsAny<Expression<Func<Topping, bool>>>(), null), Times.Once);
        _mockPizzaRepository.Verify(repository => repository.Update(It.IsAny<Pizza>()), Times.Once);
    }
}
