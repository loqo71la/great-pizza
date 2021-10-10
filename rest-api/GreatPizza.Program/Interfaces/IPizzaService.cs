using System.Collections.Generic;
using System.Threading.Tasks;
using GreatPizza.Domain.Entities;

namespace GreatPizza.Program.Interfaces
{
    public interface IPizzaService : ICRUDService<Pizza>
    {
        Task AssignTopping(int pizzaId, IEnumerable<int> toppingIds);
    }
}