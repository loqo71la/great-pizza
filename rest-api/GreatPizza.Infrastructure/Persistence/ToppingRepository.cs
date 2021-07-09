using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using GreatPizza.Domain.Commons;
using GreatPizza.Domain.Entities;
using GreatPizza.Domain.Interfaces;

namespace GreatPizza.Infrastructure.Persistence
{
    public class ToppingRepository: IToppingRepository
    {
        public ValueTask<Topping> Get(int id)
        {
            throw new NotImplementedException();
        }

        public ValueTask<Topping> GetWhere(Expression<Func<Topping, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Task Add(Topping entity)
        {
            throw new NotImplementedException();
        }

        public Task Update(Topping entity)
        {
            throw new NotImplementedException();
        }

        public Task Remove(Topping entity)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Topping>> GetAll(Pageable pageable)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Topping>> GetAllWhere(Expression<Func<Topping, bool>> predicate, Pageable pageable)
        {
            throw new NotImplementedException();
        }

        public ValueTask<int> Count()
        {
            throw new NotImplementedException();
        }

        public ValueTask<int> CountWhere(Expression<Func<Topping, bool>> predicate)
        {
            throw new NotImplementedException();
        }
    }
}