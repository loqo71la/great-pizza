using GreatPizza.Domain.Entities;

namespace GreatPizza.Core.Interfaces;

public interface ICRUDService<T> where T : Entity
{
    ValueTask<T> Get(int id);
    Task Add(T entity);
    Task Update(int id, T entity);
    Task Remove(int id);
    Task<IEnumerable<T>> GetAll(int page, int limit);
    ValueTask<int> Count();
}
