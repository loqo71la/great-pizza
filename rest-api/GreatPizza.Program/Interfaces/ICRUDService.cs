using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Threading.Tasks;
using GreatPizza.Domain.Entities;

namespace GreatPizza.Program.Interfaces
{
    public interface ICRUDService<T> where T : IEntity
    {
        ValueTask<T> Get(int id);
        Task Add(T entity);
        Task Update(int id, T entity);
        Task Remove(int id);
        Task<IEnumerable<T>> GetAll(int page, int limit);
        ValueTask<int> Count();
    }
}