namespace GreatPizza.Domain.Entities;

public abstract class Food : Entity
{
    public string? Type { get; set; }
    public string? Name { get; set; }
    public decimal Price { get; set; }
}
