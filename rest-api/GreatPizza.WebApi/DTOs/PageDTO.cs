using System.Collections.Generic;
using System.Text.Json.Serialization;
using GreatPizza.WebApi.Interfaces;

namespace GreatPizza.WebApi.DTOs
{
    public class PageDTO<T> where T : IDTO
    {
        [JsonPropertyName("currentPage")]
        public int CurrentPage { get; set; }

        [JsonPropertyName("totalPages")]
        public int TotalPages { get; set; }

        [JsonPropertyName("totalItems")]
        public int TotalItems { get; set; }

        [JsonPropertyName("next")]
        public string Next { get; set; }

        [JsonPropertyName("previous")]
        public string Previous { get; set; }

        [JsonPropertyName("items")]
        public IEnumerable<T> Items { get; set; }
    }
}