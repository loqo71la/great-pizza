using System.Text.Json.Serialization;

namespace GreatPizza.WebApi.DTOs
{
    public class ResponseDTO
    {
        [JsonPropertyName("status")]
        public string Status { get; set; }

        [JsonPropertyName("message")]
        public string Message { get; set; }
    }
}