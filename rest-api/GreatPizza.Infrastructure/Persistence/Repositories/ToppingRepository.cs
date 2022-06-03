using System.Linq.Expressions;
using GreatPizza.Domain.Commons;
using GreatPizza.Domain.Entities;
using GreatPizza.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GreatPizza.Infrastructure.Persistence.Repositories;

public class ToppingRepository : IToppingRepository
{
    private readonly GPContext _gpContext;

    public ToppingRepository(GPContext gpContext)
    {
        _gpContext = gpContext;
    }

    public ValueTask<Topping> Get(int id)
    {
        return GetWhere(topping => topping.Id == id);
    }

    public async ValueTask<Topping> GetWhere(Expression<Func<Topping, bool>> predicate)
    {
        return await _gpContext.Toppings.FirstOrDefaultAsync(predicate);
    }

    public async Task Add(Topping topping)
    {
        await _gpContext.Toppings.AddAsync(topping);
        await _gpContext.SaveChangesAsync();
    }

    public async Task Update(Topping topping)
    {
        _gpContext.Toppings.Update(topping);
        await _gpContext.SaveChangesAsync();
    }

    public async Task Remove(Topping topping)
    {
        _gpContext.Toppings.Remove(topping);
        await _gpContext.SaveChangesAsync();
    }

    public Task<IEnumerable<Topping>> GetAll(Pageable pageable = null)
    {
        return GetAllWhere(topping => true, pageable);
    }

    public async Task<IEnumerable<Topping>> GetAllWhere(Expression<Func<Topping, bool>> predicate,
        Pageable pageable = null)
    {
        IQueryable<Topping> queryable = _gpContext.Toppings
            .Where(predicate)
            .OrderByDescending(topping => topping.CreatedDate);
        if (pageable != null)
        {
            queryable = queryable
                .Skip(pageable.Offset)
                .Take(pageable.Limit);
        }
        return await queryable.ToListAsync();
    }

    public ValueTask<int> Count()
    {
        return CountWhere(topping => true);
    }

    public async ValueTask<int> CountWhere(Expression<Func<Topping, bool>> predicate)
    {
        return await _gpContext.Toppings.Where(predicate).CountAsync();
    }
}
