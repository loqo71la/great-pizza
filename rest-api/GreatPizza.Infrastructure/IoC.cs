using GreatPizza.Domain.Interfaces;
using GreatPizza.Infrastructure.Persistence;
using GreatPizza.Infrastructure.Persistence.Repositories;
using GreatPizza.Core.Interfaces;
using GreatPizza.Core.Services;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace GreatPizza.Infrastructure;

public static class IoC
{
    public static void AddServices(this IServiceCollection services)
    {
        services.AddScoped<IPizzaRepository, PizzaRepository>();
        services.AddScoped<IToppingRepository, ToppingRepository>();

        services.AddScoped<IPizzaService, PizzaService>();
        services.AddScoped<IToppingService, ToppingService>();

        var settings = GPDbContextFactory.LoadSettings();
        services.AddDbContext<GPContext>(options =>
            options.UseNpgsql(settings.GetConnectionString("DefaultConnection")));
    }
}
