using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using GreatPizza.Domain.Commons;
using GreatPizza.Domain.Entities;

namespace GreatPizza.Domain.Interfaces
{
    public interface IRepository<T> where T : IEntity
    {
        ValueTask<T> Get(int id);
        ValueTask<T> GetWhere(Expression<Func<T, bool>> predicate);

        Task Add(T entity);
        Task Update(T entity);
        Task Remove(T entity);

        Task<IEnumerable<T>> GetAll(Pageable pageable);
        Task<IEnumerable<T>> GetAllWhere(Expression<Func<T, bool>> predicate, Pageable pageable);

        ValueTask<int> Count();
        ValueTask<int> CountWhere(Expression<Func<T, bool>> predicate);
    }
}