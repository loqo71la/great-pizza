namespace GreatPizza.Domain.Entities;

public class Pizza : Food
{
    public string? Size { get; set; }
    public ICollection<Topping>? Toppings { get; set; }
}
