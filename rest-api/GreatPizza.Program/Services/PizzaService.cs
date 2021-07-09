using System.Linq;
using System.Threading.Tasks;
using GreatPizza.Domain.Entities;
using GreatPizza.Domain.Interfaces;
using GreatPizza.Program.Exceptions;
using GreatPizza.Program.Interfaces;

namespace GreatPizza.Program.Services
{
    public class PizzaService : CRUDService<Pizza>, IPizzaService
    {
        private readonly IToppingRepository _toppingRepository;

        public PizzaService(IPizzaRepository pizzaRepository, IToppingRepository toppingRepository) : base(
            pizzaRepository)
        {
            _toppingRepository = toppingRepository;
        }

        public override async Task Add(Pizza newPizza)
        {
            var savedPizza = await _repository.GetWhere(pizza => pizza.Name == newPizza.Name);
            if (savedPizza != null)
            {
                throw new AlreadyExistException(typeof(Pizza), newPizza.Name);
            }
            await base.Add(newPizza);
        }

        public async Task AssignTopping(int pizzaId, int toppingId)
        {
            var pizza = await _repository.Get(pizzaId);
            if (pizza == null)
            {
                throw new NotFoundException(typeof(Pizza), pizzaId);
            }
            var topping = await _toppingRepository.Get(toppingId);
            if (topping == null)
            {
                throw new NotFoundException(typeof(Topping), toppingId);
            }
            if (pizza.Toppings.All(assignedTopping => assignedTopping.Id != toppingId))
            {
                var toppings = pizza.Toppings.ToList();
                toppings.Add(topping);
                pizza.Toppings = toppings;
                await _repository.Update(pizza);
            }
        }

        public async Task RemoveAssignedTopping(int pizzaId, int toppingId)
        {
            var pizza = await _repository.Get(pizzaId);
            if (pizza == null)
            {
                throw new NotFoundException(typeof(Pizza), pizzaId);
            }
            pizza.Toppings.ToList().RemoveAll(topping => topping.Id == toppingId);
            await _repository.Update(pizza);
        }
    }
}