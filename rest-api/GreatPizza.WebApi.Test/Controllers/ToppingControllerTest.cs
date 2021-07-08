using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using GreatPizza.Domain.Entities;
using GreatPizza.Domain.Interfaces;
using GreatPizza.WebApi.DTOs;
using Microsoft.AspNetCore.Mvc.Testing;
using Microsoft.AspNetCore.TestHost;
using Microsoft.Extensions.DependencyInjection;
using Moq;
using Xunit;

namespace GreatPizza.WebApi.Test.Controllers
{
    public class ToppingControllerTest : IClassFixture<WebApplicationFactory<Startup>>
    {
        private readonly Mock<IToppingRepository> _mockRepository;
        private readonly HttpClient _client;

        public ToppingControllerTest(WebApplicationFactory<Startup> factory)
        {
            _mockRepository = new Mock<IToppingRepository>();
            _client = factory.WithWebHostBuilder(builder =>
                {
                    builder.ConfigureTestServices(services => { services.AddScoped(_ => _mockRepository.Object); });
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
                new object[] {"?limit=2", 4, 2, 1, "https://localhost:5001/api/topping?limit=2&page=2", null, toppings},
                new object[]
                    {"?limit=2&page=2", 4, 2, 2, null, "https://localhost:5001/api/topping?limit=2&page=1", toppings},
            };
        }

        [Theory]
        [MemberData(nameof(ToppingScenario))]
        public async Task GetAll_WithMultipleScenarios_ReturnsPage(string query, int totalItems, int totalPages,
            int currentPage, string next, string previous, IEnumerable<Topping> toppings)
        {
            // Arrange
            _mockRepository.Setup(repository => repository.GetAll(It.IsAny<Pageable>()))
                .ReturnsAsync(toppings);
            _mockRepository.Setup(repository => repository.Count())
                .ReturnsAsync(totalItems);

            // Act
            var response = await _client.GetAsync($"/api/topping{query}");
            var content = await response.Content.ReadAsStringAsync();
            var pageDto = Deserialize<PageDTO<ToppingDTO>>(content);

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

            _mockRepository.Verify(repository => repository.GetAll(It.IsAny<Pageable>()), Times.Once);
            _mockRepository.Verify(repository => repository.Count(), Times.Once);
        }

        [Fact]
        public async Task Get_WhenToppingNotFound_ReturnsErrorResponse()
        {
            // Arrange
            _mockRepository.Setup(repository => repository.Get(1))
                .Returns(null);

            // Act
            var response = await _client.GetAsync("/api/topping/1");
            var content = await response.Content.ReadAsStringAsync();
            var responseDto = Deserialize<ResponseDTO>(content);

            // Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
            Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

            Assert.Equal("Error", responseDto.Status);
            Assert.Equal("Topping with ID [1] was not found.", responseDto.Message);
            _mockRepository.Verify(repository => repository.Get(1), Times.Once);
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
                CreatedDate = new DateTime(2021, 7, 7)
            };
            _mockRepository.Setup(repository => repository.Get(1))
                .ReturnsAsync(topping);

            // Act
            var response = await _client.GetAsync("/api/topping/1");
            var content = await response.Content.ReadAsStringAsync();
            var toppingDto = Deserialize<ToppingDTO>(content);

            // Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

            Assert.Equal(1, toppingDto.Id);
            Assert.Equal("Peperoni", toppingDto.Name);
            Assert.Equal(1.55m, toppingDto.Price);
            Assert.Equal("2021-07-07T00:00:00.00Z", toppingDto.CreatedDate);
            _mockRepository.Verify(repository => repository.Get(1), Times.Once);
        }

        [Fact]
        public async Task Post_WhenToppingDoesNotExist_ReturnsCreatedResponse()
        {
            // Arrange
            var payload = "{\"name\":\"Peperoni\",\"price\":1.55}";
            var body = new StringContent(payload, Encoding.UTF8, "application/json");
            _mockRepository.Setup(repository => repository.GetWhere(It.IsAny<Expression<Func<Topping, bool>>>()))
                .Returns(null);
            _mockRepository.Setup(repository => repository.Add(It.IsAny<Topping>()))
                .Callback((Topping topping) => topping.Id = 1)
                .Returns(Task.CompletedTask);

            // Act
            var response = await _client.PostAsync("/api/topping", body);
            var content = await response.Content.ReadAsStringAsync();
            var responseDto = Deserialize<ResponseDTO>(content);

            // Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.Created, response.StatusCode);
            Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

            Assert.Equal("Success", responseDto.Status);
            Assert.Equal("https://localhost:5001/api/topping/1", responseDto.Message);
            _mockRepository.Verify(repository => repository.GetWhere(It.IsAny<Expression<Func<Topping, bool>>>()),
                Times.Once);
            _mockRepository.Verify(repository => repository.Add(It.IsAny<Topping>()), Times.Once);
        }

        [Fact]
        public async Task Post_WhenToppingAlreadyExist_ReturnsErrorResponse()
        {
            // Arrange
            var payload = "{\"name\":\"Peperoni\",\"price\":1.55}";
            var body = new StringContent(payload, Encoding.UTF8, "application/json");
            _mockRepository.Setup(repository => repository.GetWhere(It.IsAny<Expression<Func<Topping, bool>>>()))
                .ReturnsAsync(new Topping {Id = 1});

            // Act
            var response = await _client.PostAsync("/api/topping", body);
            var content = await response.Content.ReadAsStringAsync();
            var responseDto = Deserialize<ResponseDTO>(content);

            // Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.BadRequest, response.StatusCode);
            Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

            Assert.Equal("Error", responseDto.Status);
            Assert.Equal("Topping with name [Peperoni] already exist.", responseDto.Message);
            _mockRepository.Verify(repository => repository.GetWhere(It.IsAny<Expression<Func<Topping, bool>>>()),
                Times.Once);
            _mockRepository.Verify(repository => repository.Add(It.IsAny<Topping>()), Times.Never);
        }

        [Fact]
        public async Task Put_WhenToppingDoesNotExist_ReturnsErrorResponse()
        {
            // Arrange
            var payload = "{\"name\":\"Peperoni\",\"price\":1.55}";
            var body = new StringContent(payload, Encoding.UTF8, "application/json");
            _mockRepository.Setup(repository => repository.Get(1))
                .Returns(null);

            // Act
            var response = await _client.PutAsync("/api/topping/1", body);
            var content = await response.Content.ReadAsStringAsync();
            var responseDto = Deserialize<ResponseDTO>(content);

            // Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.NotFound, response.StatusCode);
            Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

            Assert.Equal("Error", responseDto.Status);
            Assert.Equal("Topping with ID [1] was not found.", responseDto.Message);
            _mockRepository.Verify(repository => repository.Get(1), Times.Once);
            _mockRepository.Verify(repository => repository.Update(It.IsAny<Topping>()), Times.Never);
        }

        [Fact]
        public async Task Put_WhenToppingExist_ReturnsUpdatedResponse()
        {
            // Arrange
            var payload = "{\"name\":\"Peperoni\",\"price\":1.55}";
            var body = new StringContent(payload, Encoding.UTF8, "application/json");
            _mockRepository.Setup(repository => repository.Get(1))
                .ReturnsAsync(new Topping {Id = 1});
            _mockRepository.Setup(repository => repository.Update(It.IsAny<Topping>()))
                .Returns(Task.CompletedTask);

            // Act
            var response = await _client.PutAsync("/api/topping/1", body);
            var content = await response.Content.ReadAsStringAsync();
            var responseDto = Deserialize<ResponseDTO>(content);

            // Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

            Assert.Equal("Success", responseDto.Status);
            Assert.Equal("Topping with ID [1] was successfully updated.", responseDto.Message);
            _mockRepository.Verify(repository => repository.Get(1), Times.Once);
            _mockRepository.Verify(repository => repository.Update(It.IsAny<Topping>()), Times.Once);
        }

        [Fact]
        public async Task Delete_WhenToppingDoesNotExist_ReturnsDeletedResponse()
        {
            // Arrange
            _mockRepository.Setup(repository => repository.Get(1))
                .Returns(null);

            // Act
            var response = await _client.DeleteAsync("/api/topping/1");
            var content = await response.Content.ReadAsStringAsync();
            var responseDto = Deserialize<ResponseDTO>(content);

            // Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

            Assert.Equal("Success", responseDto.Status);
            Assert.Equal("Topping with ID [1] was successfully removed.", responseDto.Message);
            _mockRepository.Verify(repository => repository.Get(1), Times.Once);
            _mockRepository.Verify(repository => repository.Remove(It.IsAny<Topping>()), Times.Never);
        }

        [Fact]
        public async Task Delete_WhenToppingExist_ReturnsDeletedResponse()
        {
            // Arrange
            _mockRepository.Setup(repository => repository.Get(1))
                .ReturnsAsync(new Topping {Id = 1});
            _mockRepository.Setup(repository => repository.Remove(It.IsAny<Topping>()))
                .Returns(Task.CompletedTask);

            // Act
            var response = await _client.DeleteAsync("/api/topping/1");
            var content = await response.Content.ReadAsStringAsync();
            var responseDto = Deserialize<ResponseDTO>(content);

            // Assert
            response.EnsureSuccessStatusCode();
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            Assert.Equal("application/json", response.Content.Headers.ContentType?.MediaType);

            Assert.Equal("Success", responseDto.Status);
            Assert.Equal("Topping with ID [1] was successfully removed.", responseDto.Message);
            _mockRepository.Verify(repository => repository.Get(1), Times.Once);
            _mockRepository.Verify(repository => repository.Remove(It.IsAny<Topping>()), Times.Once);
        }

        private static T Deserialize<T>(string content)
        {
            var jsonOptions = new JsonSerializerOptions {PropertyNamingPolicy = JsonNamingPolicy.CamelCase};
            return JsonSerializer.Deserialize<T>(content, jsonOptions);
        }
    }
}