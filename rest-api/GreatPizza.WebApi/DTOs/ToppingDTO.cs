using System.Text.Json.Serialization;
using GreatPizza.WebApi.Interfaces;

namespace GreatPizza.WebApi.DTOs
{
    public class ToppingDTO : IDTO
    {
        [JsonPropertyName("id")]
        public int Id { get; set; }

        [JsonPropertyName("name")]
        public string Name { get; set; }

        [JsonPropertyName("price")]
        public decimal Price { get; set; }

        [JsonPropertyName("type")]
        public string Type { get; set; }

        [JsonPropertyName("createdDate")]
        public string CreatedDate { get; set; }

        [JsonPropertyName("modifiedDate")]
        public string ModifiedDate { get; set; }
    }
}