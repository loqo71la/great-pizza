using GreatPizza.Core.Exceptions;
using GreatPizza.Domain.Commons;
using GreatPizza.Domain.Entities;
using GreatPizza.Domain.Interfaces;
using GreatPizza.Core.Interfaces;

namespace GreatPizza.Core.Services;

public abstract class CRUDService<T> : ICRUDService<T> where T : IEntity
{
    protected readonly IRepository<T> _repository;

    protected CRUDService(IRepository<T> repository)
    {
        _repository = repository;
    }

    public virtual async ValueTask<T> Get(int id)
    {
        var entity = await _repository.Get(id);
        if (entity == null)
        {
            throw new NotFoundException(typeof(T), id);
        }
        return entity;
    }

    public virtual async Task Add(T entity)
    {
        entity.CreatedDate = DateTime.Now;
        await _repository.Add(entity);
    }

    public virtual async Task Update(int id, T entity)
    {
        var savedEntity = await _repository.Get(id);
        if (savedEntity == null)
        {
            throw new NotFoundException(typeof(T), id);
        }

        Update(savedEntity, entity);
        savedEntity.ModifiedDate = DateTime.Now;
        await _repository.Update(savedEntity);
    }

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
        var pageable = new Pageable { Offset = --page * limit, Limit = limit };
        return _repository.GetAll(pageable);
    }

    public virtual ValueTask<int> Count()
    {
        return _repository.Count();
    }

    protected abstract void Update(T entity, T newEntity);
}
