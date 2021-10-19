using System.Threading.Tasks;
using GreatPizza.Domain.Entities;
using GreatPizza.Domain.Interfaces;
using GreatPizza.Program.Exceptions;
using GreatPizza.Program.Interfaces;

namespace GreatPizza.Program.Services
{
    public class ToppingService : CRUDService<Topping>, IToppingService
    {
        public ToppingService(IToppingRepository toppingRepository) : base(toppingRepository)
        {
        }

        public override async Task Add(Topping newTopping)
        {
            var savedPizza = await _repository.GetWhere(pizza => pizza.Name == newTopping.Name);
            if (savedPizza != null)
            {
                throw new AlreadyExistException(typeof(Topping), newTopping.Name);
            }
            await base.Add(newTopping);
        }

        protected override void Update(Topping topping, Topping newTopping)
        {
            topping.Name = newTopping.Name;
            topping.Type = newTopping.Type;
            topping.Price = newTopping.Price;
        }
    }
}