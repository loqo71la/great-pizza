using GreatPizza.Domain.Interfaces;
using GreatPizza.Infrastructure.Persistence;
using GreatPizza.Program.Interfaces;
using GreatPizza.Program.Services;
using Microsoft.Extensions.DependencyInjection;

namespace GreatPizza.Infrastructure
{
    public static class IoC
    {
        public static void AddServices(this IServiceCollection services)
        {
            services.AddScoped<IPizzaRepository, PizzaRepository>();
            services.AddScoped<IToppingRepository, ToppingRepository>();
            
            services.AddScoped<IPizzaService, PizzaService>();
            services.AddScoped<IToppingService, ToppingService>();
        }
    }
}