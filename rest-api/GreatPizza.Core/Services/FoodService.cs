using GreatPizza.Core.Exceptions;
using GreatPizza.Domain.Entities;
using GreatPizza.Domain.Interfaces;

namespace GreatPizza.Core.Services;

public abstract class FoodService<T> : CRUDService<T> where T : Food
{
    protected FoodService(IRepository<T> repository) : base(repository)
    {
    }

    public override async Task Add(T food)
    {
        await CheckIfAlreadyExists(food);
        await base.Add(food);
    }

    public override async Task Update(int id, T food)
    {
        T savedFood = await Get(id);
        await CheckIfAlreadyExists(food, savedFood);

        Update(savedFood, food);
        savedFood.UpdatedAt = DateTime.Now;
        await base._repository.Update(savedFood);
    }

    protected abstract void Update(T food, T newFood);

    private async Task CheckIfAlreadyExists(T newFood, T? savedFood = null)
    {
        T currentFood = await base._repository.GetWhere(food => food.Name == newFood.Name);
        if (currentFood == null)
        {
            return;
        }
        if (savedFood != null && savedFood.Name == newFood.Name)
        {
            return;
        }
        throw new AlreadyExistException(typeof(T), newFood.Name ?? "");
    }
}