using System.Linq;
using GreatPizza.Domain.Entities;
using GreatPizza.WebApi.DTOs;

namespace GreatPizza.WebApi.Mappers;

public class PizzaMapper : Mapper<PizzaDTO, Pizza>
{
    private readonly ToppingMapper _toppingMapper;

    public PizzaMapper(ToppingMapper toppingMapper)
    {
        _toppingMapper = toppingMapper;
    }

    public override Pizza ToEntity(PizzaDTO pizzaDto)
    {
        var pizza = base.ToEntity(pizzaDto);
        pizza.Price = pizzaDto.Price;
        pizza.Name = pizzaDto.Name;
        pizza.Size = pizzaDto.Size;
        return pizza;
    }

    public override PizzaDTO ToDTO(Pizza pizza)
    {
        var pizzaDto = base.ToDTO(pizza);
        pizzaDto.Price = pizza.Price;
        pizzaDto.Name = pizza.Name;
        pizzaDto.Size = pizza.Size;
        if (pizza.Toppings != null)
        {
            pizzaDto.Toppings = pizza.Toppings.Select(_toppingMapper.ToDTO);
        }
        return pizzaDto;
    }
}
