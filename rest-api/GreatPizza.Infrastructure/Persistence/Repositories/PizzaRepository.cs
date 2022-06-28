using System.Linq.Expressions;
using GreatPizza.Domain.Commons;
using GreatPizza.Domain.Entities;
using GreatPizza.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace GreatPizza.Infrastructure.Persistence.Repositories;

public class PizzaRepository : IPizzaRepository
{
    private readonly GPContext _gpContext;

    public PizzaRepository(GPContext gpContext)
    {
        _gpContext = gpContext;
    }

    public ValueTask<Pizza> Get(int id)
    {
        return GetWhere(pizza => pizza.Id == id);
    }

    public async ValueTask<Pizza> GetWhere(Expression<Func<Pizza, bool>> predicate)
    {
        return await _gpContext.Pizzas
            .Include(pizza => pizza.Toppings)
            .FirstOrDefaultAsync(predicate);
    }

    public async Task Add(Pizza pizza)
    {
        await _gpContext.Pizzas.AddAsync(pizza);
        await _gpContext.SaveChangesAsync();
    }

    public async Task Update(Pizza pizza)
    {
        _gpContext.Pizzas.Update(pizza);
        await _gpContext.SaveChangesAsync();
    }

    public async Task Remove(Pizza pizza)
    {
        _gpContext.Pizzas.Remove(pizza);
        await _gpContext.SaveChangesAsync();
    }

    public Task<IEnumerable<Pizza>> GetAll(Pageable? pageable = null)
    {
        return GetAllWhere(pizza => true, pageable);
    }

    public async Task<IEnumerable<Pizza>> GetAllWhere(Expression<Func<Pizza, bool>> predicate, Pageable? pageable = null)
    {
        IQueryable<Pizza> queryable = _gpContext.Pizzas
            .Include(pizza => pizza.Toppings)
            .Where(predicate)
            .OrderByDescending(pizza => pizza.CreatedAt);
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
        return CountWhere(pizza => true);
    }

    public async ValueTask<int> CountWhere(Expression<Func<Pizza, bool>> predicate)
    {
        return await _gpContext.Pizzas.Where(predicate).CountAsync();
    }
}
