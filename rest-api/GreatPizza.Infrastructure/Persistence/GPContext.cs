using GreatPizza.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace GreatPizza.Infrastructure.Persistence
{
    public class GPContext : DbContext
    {
        public DbSet<Pizza> Pizzas { get; set; }
        public DbSet<Topping> Toppings { get; set; }

        public GPContext(DbContextOptions<GPContext> options) : base(options)
        {
        }
        
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Pizza>().Property(pizza => pizza.Name).HasColumnType("varchar").HasMaxLength(50);
            modelBuilder.Entity<Pizza>().Property(pizza => pizza.Type).HasColumnType("varchar").HasMaxLength(30);
            modelBuilder.Entity<Pizza>().Property(pizza => pizza.Size).HasColumnType("varchar").HasMaxLength(3);
            modelBuilder.Entity<Pizza>().Property(pizza => pizza.Price).HasPrecision(10, 2);

            modelBuilder.Entity<Topping>().Property(topping => topping.Name).HasColumnType("varchar").HasMaxLength(50);
            modelBuilder.Entity<Topping>().Property(topping => topping.Type).HasColumnType("varchar").HasMaxLength(30);
            modelBuilder.Entity<Topping>().Property(topping => topping.Price).HasPrecision(10, 2);
        }
    }
}