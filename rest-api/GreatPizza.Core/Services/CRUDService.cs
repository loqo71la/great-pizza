using GreatPizza.Core.Exceptions;
using GreatPizza.Domain.Commons;
using GreatPizza.Domain.Entities;
using GreatPizza.Domain.Interfaces;
using GreatPizza.Core.Interfaces;

namespace GreatPizza.Core.Services;

public abstract class CRUDService<T> : ICRUDService<T> where T : Entity
{
    protected readonly IRepository<T> _repository;

    protected CRUDService(IRepository<T> repository)
    {
        _repository = repository;
    }

    public virtual async ValueTask<T> Get(int id)
    {
        T entity = await _repository.Get(id);
        if (entity == null)
        {
            throw new NotFoundException(typeof(T), id);
        }
        return entity;
    }

    public virtual async Task Add(T entity)
    {
        entity.CreatedAt = DateTime.Now;
        await _repository.Add(entity);
    }

    public abstract Task Update(int id, T entity);

    public virtual async Task Remove(int id)
    {
        var entity = await _repository.Get(id);
        if (entity != null)
        {
            await _repository.Remove(entity);
        }
    }

    public virtual Task<IEnumerable<T>> GetAll(int page, int limit)
    {
        var pageable = new Pageable { Offset = (page - 1) * limit, Limit = limit };
        return _repository.GetAll(pageable);
    }

    public virtual ValueTask<int> Count()
    {
        return _repository.Count();
    }
}
