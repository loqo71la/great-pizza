using System.Threading.Tasks;
using GreatPizza.Domain.Entities;

namespace GreatPizza.Program.Interfaces
{
    public interface IPizzaService : ICRUDService<Pizza>
    {
        Task AssignTopping(int pizzaId, int toppingId);
        Task RemoveAssignedTopping(int pizzaId, int toppingId);
    }
}