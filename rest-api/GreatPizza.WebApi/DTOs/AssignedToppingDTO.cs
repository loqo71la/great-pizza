using System.Text.Json.Serialization;

namespace GreatPizza.WebApi.DTOs;

public class AssignedToppingDTO
{
    [JsonPropertyName("ids")]
    public IEnumerable<int>? Ids { get; set; }
}
