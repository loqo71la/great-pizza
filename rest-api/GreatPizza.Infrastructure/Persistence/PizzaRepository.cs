using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using GreatPizza.Domain.Commons;
using GreatPizza.Domain.Entities;
using GreatPizza.Domain.Interfaces;

namespace GreatPizza.Infrastructure.Persistence
{
    public class PizzaRepository: IPizzaRepository
    {
        public ValueTask<Pizza> Get(int id)
        {
            throw new NotImplementedException();
        }

        public ValueTask<Pizza> GetWhere(Expression<Func<Pizza, bool>> predicate)
        {
            throw new NotImplementedException();
        }

        public Task Add(Pizza entity)
        {
            throw new NotImplementedException();
        }

        public Task Update(Pizza entity)
        {
            throw new NotImplementedException();
        }

        public Task Remove(Pizza entity)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Pizza>> GetAll(Pageable pageable)
        {
            throw new NotImplementedException();
        }

        public Task<IEnumerable<Pizza>> GetAllWhere(Expression<Func<Pizza, bool>> predicate, Pageable pageable)
        {
            throw new NotImplementedException();
        }

        public ValueTask<int> Count()
        {
            throw new NotImplementedException();
        }

        public ValueTask<int> CountWhere(Expression<Func<Pizza, bool>> predicate)
        {
            throw new NotImplementedException();
        }
    }
}