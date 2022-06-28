using GreatPizza.Domain.Entities;
using GreatPizza.Domain.Interfaces;
using GreatPizza.Core.Interfaces;

namespace GreatPizza.Core.Services;

public class ToppingService : FoodService<Topping>, IToppingService
{
    public ToppingService(IToppingRepository toppingRepository) : base(toppingRepository)
    {
    }

    protected override void Update(Topping topping, Topping newTopping)
    {
        topping.Name = newTopping.Name;
        topping.Type = newTopping.Type;
        topping.Price = newTopping.Price;
    }
}
