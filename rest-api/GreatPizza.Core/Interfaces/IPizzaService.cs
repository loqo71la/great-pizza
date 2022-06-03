using GreatPizza.Domain.Entities;

namespace GreatPizza.Core.Interfaces;

public interface IPizzaService : ICRUDService<Pizza>
{
    Task AssignTopping(int pizzaId, IEnumerable<int> toppingIds);
}
