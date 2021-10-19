using System.Collections.Generic;
using System.Text.Json.Serialization;
using GreatPizza.WebApi.Interfaces;

namespace GreatPizza.WebApi.DTOs
{
    public class PizzaDTO : IDTO
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("size")]
        public string Size { get; set; }

        [JsonPropertyName("price")]
        public decimal Price { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("createdDate")]
        public string CreatedDate { get; set; }

        [JsonPropertyName("modifiedDate")]
        public string ModifiedDate { get; set; }

        [JsonPropertyName("toppings")]
        public IEnumerable<ToppingDTO> Toppings { get; set; }
    }
}