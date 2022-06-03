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

public class ToppingControllerTest
{
    private readonly Mock<IToppingRepository> _mockToppingRepository;
    private readonly Mock<IPizzaRepository> _mockPizzaRepository;
    private readonly HttpClient _client;

    public ToppingControllerTest()
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

    public static IEnumerable<object[]> ToppingScenario()
    {
        var toppings = new[]
            {new Topping {Id = 1}, new Topping {Id = 2}, new Topping {Id = 3}, new Topping {Id = 4}};
        var emptyToppings = Array.Empty<Topping>();
        return new List<object[]>
        {
            new object[] {"", 0, 1, 1, null, null, emptyToppings},
            new object[] {"?limit=10&page=1", 0, 1, 1, null, null, emptyToppings},
            new object[] {"", 4, 1, 1, null, null, toppings},
            new object[] {"?limit=2", 4, 2, 1, "http://localhost/api/topping?page=2&limit=2", null, toppings},
            new object[]
                {"?page=2&limit=2", 4, 2, 2, null, "http://localhost/api/topping?page=1&limit=2", toppings},
        };
    }

    [Theory]
    [MemberData(nameof(ToppingScenario))]
    public async Task GetAll_WithMultipleScenarios_ReturnsPage(string query, int totalItems, int totalPages,
        int currentPage, string next, string previous, IEnumerable<Topping> toppings)
    {
        // Arrange
        _mockToppingRepository.Setup(repository => repository.GetAll(It.IsAny<Pageable>()))
            .ReturnsAsync(toppings);
        _mockToppingRepository.Setup(repository => repository.Count())
            .ReturnsAsync(totalItems);

        // Act
        var response = await _client.GetAsync($"/api/topping{query}");
        var content = await response.Content.ReadAsStringAsync();
        var pageDto = JsonSerializer.Deserialize<PageDTO<ToppingDTO>>(content);

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

        _mockToppingRepository.Verify(repository => repository.GetAll(It.IsAny<Pageable>()), Times.Once);
        _mockToppingRepository.Verify(repository => repository.Count(), Times.Once);
    }

    [Fact]
    public async Task Get_WhenToppingNotFound_ReturnsErrorResponse()
    {
        // Arrange
        _mockToppingRepository.Setup(repository => repository.Get(1))
            .Returns(null);

        // Act
        var response = await _client.GetAsync("/api/topping/1");
        var content = await response.Content.ReadAsStringAsync();
        var responseDto = JsonSerializer.Deserialize<ResponseDTO>(content);

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

        Assert.Equal("Error", responseDto.Status);
        Assert.Equal("Topping with ID [1] was not found.", responseDto.Message);
        _mockToppingRepository.Verify(repository => repository.Get(1), Times.Once);
    }

    [Fact]
    public async Task Get_WhenToppingExist_ReturnsDTO()
    {
        // Arrange
        var topping = new Topping
        {
            Id = 1,
            Name = "Peperoni",
            Price = 1.55m,
            CreatedDate = new DateTime(2021, 7, 7, 0, 0, 0, DateTimeKind.Utc)
        };
        _mockToppingRepository.Setup(repository => repository.Get(1))
            .ReturnsAsync(topping);

        // Act
        var response = await _client.GetAsync("/api/topping/1");
        var content = await response.Content.ReadAsStringAsync();
        var toppingDto = JsonSerializer.Deserialize<ToppingDTO>(content);

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

        Assert.Equal(1, toppingDto.Id);
        Assert.Equal("Peperoni", toppingDto.Name);
        Assert.Equal(1.55m, toppingDto.Price);
        Assert.Equal("2021-07-07T00:00:00.000Z", toppingDto.CreatedDate);
        _mockToppingRepository.Verify(repository => repository.Get(1), Times.Once);
    }

    [Fact]
    public async Task Post_WhenToppingDoesNotExist_ReturnsCreatedResponse()
    {
        // Arrange
        var payload = "{\"name\":\"Peperoni\",\"price\":1.55}";
        var body = new StringContent(payload, Encoding.UTF8, "application/json");
        _mockToppingRepository.Setup(repository => repository.GetWhere(It.IsAny<Expression<Func<Topping, bool>>>()))
            .Returns(null);
        _mockToppingRepository.Setup(repository => repository.Add(It.IsAny<Topping>()))
            .Callback((Topping topping) => topping.Id = 1)
            .Returns(Task.CompletedTask);

        // Act
        var response = await _client.PostAsync("/api/topping", body);
        var content = await response.Content.ReadAsStringAsync();
        var responseDto = JsonSerializer.Deserialize<ResponseDTO>(content);

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.Created, response.StatusCode);
        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

        Assert.Equal("Success", responseDto.Status);
        Assert.Equal("http://localhost/api/topping/1", responseDto.Message);
        _mockToppingRepository.Verify(
            repository => repository.GetWhere(It.IsAny<Expression<Func<Topping, bool>>>()),
            Times.Once);
        _mockToppingRepository.Verify(repository => repository.Add(It.IsAny<Topping>()), Times.Once);
    }

    [Fact]
    public async Task Post_WhenToppingAlreadyExist_ReturnsErrorResponse()
    {
        // Arrange
        var payload = "{\"name\":\"Peperoni\",\"price\":1.55}";
        var body = new StringContent(payload, Encoding.UTF8, "application/json");
        _mockToppingRepository.Setup(repository => repository.GetWhere(It.IsAny<Expression<Func<Topping, bool>>>()))
            .ReturnsAsync(new Topping { Id = 1 });

        // Act
        var response = await _client.PostAsync("/api/topping", body);
        var content = await response.Content.ReadAsStringAsync();
        var responseDto = JsonSerializer.Deserialize<ResponseDTO>(content);

        // Assert
        Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

        Assert.Equal("Error", responseDto.Status);
        Assert.Equal("Topping with name [Peperoni] already exist.", responseDto.Message);
        _mockToppingRepository.Verify(
            repository => repository.GetWhere(It.IsAny<Expression<Func<Topping, bool>>>()),
            Times.Once);
        _mockToppingRepository.Verify(repository => repository.Add(It.IsAny<Topping>()), Times.Never);
    }

    [Fact]
    public async Task Put_WhenToppingDoesNotExist_ReturnsErrorResponse()
    {
        // Arrange
        var payload = "{\"name\":\"Peperoni\",\"price\":1.55}";
        var body = new StringContent(payload, Encoding.UTF8, "application/json");
        _mockToppingRepository.Setup(repository => repository.Get(1))
            .Returns(null);

        // Act
        var response = await _client.PutAsync("/api/topping/1", body);
        var content = await response.Content.ReadAsStringAsync();
        var responseDto = JsonSerializer.Deserialize<ResponseDTO>(content);

        // Assert
        Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

        Assert.Equal("Error", responseDto.Status);
        Assert.Equal("Topping with ID [1] was not found.", responseDto.Message);
        _mockToppingRepository.Verify(repository => repository.Get(1), Times.Once);
        _mockToppingRepository.Verify(repository => repository.Update(It.IsAny<Topping>()), Times.Never);
    }

    [Fact]
    public async Task Put_WhenToppingExist_ReturnsUpdatedResponse()
    {
        // Arrange
        var payload = "{\"name\":\"Peperoni\",\"price\":1.55}";
        var body = new StringContent(payload, Encoding.UTF8, "application/json");
        _mockToppingRepository.Setup(repository => repository.Get(1))
            .ReturnsAsync(new Topping { Id = 1 });
        _mockToppingRepository.Setup(repository => repository.Update(It.IsAny<Topping>()))
            .Returns(Task.CompletedTask);

        // Act
        var response = await _client.PutAsync("/api/topping/1", body);
        var content = await response.Content.ReadAsStringAsync();
        var responseDto = JsonSerializer.Deserialize<ResponseDTO>(content);

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

        Assert.Equal("Success", responseDto.Status);
        Assert.Equal("Topping with ID [1] was successfully updated.", responseDto.Message);
        _mockToppingRepository.Verify(repository => repository.Get(1), Times.Once);
        _mockToppingRepository.Verify(repository => repository.Update(It.IsAny<Topping>()), Times.Once);
    }

    [Fact]
    public async Task Delete_WhenToppingDoesNotExist_ReturnsDeletedResponse()
    {
        // Arrange
        _mockToppingRepository.Setup(repository => repository.Get(1))
            .Returns(null);

        // Act
        var response = await _client.DeleteAsync("/api/topping/1");
        var content = await response.Content.ReadAsStringAsync();
        var responseDto = JsonSerializer.Deserialize<ResponseDTO>(content);

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

        Assert.Equal("Success", responseDto.Status);
        Assert.Equal("Topping with ID [1] was successfully removed.", responseDto.Message);
        _mockToppingRepository.Verify(repository => repository.Get(1), Times.Once);
        _mockToppingRepository.Verify(repository => repository.Remove(It.IsAny<Topping>()), Times.Never);
    }

    [Fact]
    public async Task Delete_WhenToppingExist_ReturnsDeletedResponse()
    {
        // Arrange
        _mockToppingRepository.Setup(repository => repository.Get(1))
            .ReturnsAsync(new Topping { Id = 1 });
        _mockToppingRepository.Setup(repository => repository.Remove(It.IsAny<Topping>()))
            .Returns(Task.CompletedTask);

        // Act
        var response = await _client.DeleteAsync("/api/topping/1");
        var content = await response.Content.ReadAsStringAsync();
        var responseDto = JsonSerializer.Deserialize<ResponseDTO>(content);

        // Assert
        response.EnsureSuccessStatusCode();
        Assert.Equal(HttpStatusCode.OK, response.StatusCode);
        Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

        Assert.Equal("Success", responseDto.Status);
        Assert.Equal("Topping with ID [1] was successfully removed.", responseDto.Message);
        _mockToppingRepository.Verify(repository => repository.Get(1), Times.Once);
        _mockToppingRepository.Verify(repository => repository.Remove(It.IsAny<Topping>()), Times.Once);
    }
}
