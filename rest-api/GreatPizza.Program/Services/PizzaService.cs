using System.Collections.Generic;
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

        public PizzaService(IPizzaRepository pizzaRepository, IToppingRepository toppingRepository) :
            base(pizzaRepository)
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

        public async Task AssignTopping(int pizzaId, IEnumerable<int> toppingIds)
        {
            var pizza = await _repository.Get(pizzaId);
            if (pizza == null)
            {
                throw new NotFoundException(typeof(Pizza), pizzaId);
            }
            var savedToppings = await _toppingRepository.GetAllWhere(topping => toppingIds.Contains(topping.Id));
            var notFoundToppings = toppingIds.Except(savedToppings.Select(topping => topping.Id));
            if (notFoundToppings.Any())
            {
                throw new NotFoundException(typeof(Topping), string.Join(",", notFoundToppings));
            }

            pizza.Toppings.ToList().ForEach(topping =>
            {
                if (!savedToppings.Any(target => target.Id == topping.Id))
                {
                    pizza.Toppings.Remove(topping);
                }
            });

            savedToppings.ToList().ForEach(target =>
            {
                if (!pizza.Toppings.Any(topping => topping.Id == target.Id))
                {
                    pizza.Toppings.Add(target);
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
}