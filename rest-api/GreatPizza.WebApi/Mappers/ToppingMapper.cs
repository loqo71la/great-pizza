using GreatPizza.Domain.Entities;
using GreatPizza.WebApi.DTOs;

namespace GreatPizza.WebApi.Mappers;

public class ToppingMapper : FoodMapper<ToppingDTO, Topping>
{
    public override Topping ToEntity(ToppingDTO toppingDto)
    {
        var topping = base.ToEntity(toppingDto);
        topping.Price = toppingDto.Price;
        topping.Name = toppingDto.Name;
        return topping;
    }

    public override ToppingDTO ToDTO(Topping topping)
    {
        var toppingDto = base.ToDTO(topping);
        toppingDto.Price = topping.Price;
        toppingDto.Name = topping.Name;
        return toppingDto;
    }
}
