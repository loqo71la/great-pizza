using System;
using GreatPizza.Domain.Interfaces;
using GreatPizza.Infrastructure.Persistence;
using GreatPizza.Infrastructure.Persistence.Repositories;
using GreatPizza.Program.Interfaces;
using GreatPizza.Program.Services;
using Microsoft.EntityFrameworkCore;
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

            var version = new MySqlServerVersion(new Version(8, 0, 25));
            services.AddDbContext<GPContext>(options =>
                options.UseMySql($"server=localhost;user id=root;password=mariadb;database=GP", version));
        }
    }
}