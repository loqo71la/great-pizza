using GreatPizza.Domain.Entities;
using GreatPizza.Domain.Interfaces;
using GreatPizza.Core.Exceptions;
using GreatPizza.Core.Interfaces;

namespace GreatPizza.Core.Services;

public class PizzaService : FoodService<Pizza>, IPizzaService
{
    private readonly IToppingRepository _toppingRepository;

    public PizzaService(IPizzaRepository pizzaRepository, IToppingRepository toppingRepository) :
        base(pizzaRepository)
    {
        _toppingRepository = toppingRepository;
    }

    public async Task AssignTopping(int pizzaId, IEnumerable<int>? toppingIds)
    {
        if (toppingIds == null)
        {
            return;
        }

        var pizza = await base.Get(pizzaId);
        var savedToppings = await _toppingRepository.GetAllWhere(topping => toppingIds.Contains(topping.Id));
        var notFoundToppings = toppingIds.Except(savedToppings.Select(topping => topping.Id));
        if (notFoundToppings.Any())
        {
            throw new NotFoundException(typeof(Topping), string.Join(",", notFoundToppings));
        }

        pizza.Toppings!.ToList().ForEach(topping =>
        {
            if (!savedToppings.Any(target => target.Id == topping.Id))
            {
                pizza.Toppings!.Remove(topping);
            }
        });

        savedToppings.ToList().ForEach(target =>
        {
            if (!pizza.Toppings!.Any(topping => topping.Id == target.Id))
            {
                pizza.Toppings!.Add(target);
            }
        });
        await _repository.Update(pizza);
    }

    protected override void Update(Pizza pizza, Pizza newPizza)
    {
        pizza.Name = newPizza.Name;
        pizza.Type = newPizza.Type;
        pizza.Size = newPizza.Size;
        pizza.Price = newPizza.Price;
    }
}
