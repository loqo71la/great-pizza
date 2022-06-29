namespace GreatPizza.Domain.Entities;

public class Topping : Food
{
    public ICollection<Pizza>? Pizzas { get; set; }
}
