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
            modelBuilder.Entity<Pizza>().Property(pizza => pizza.CreatedBy).HasColumnType("varchar").HasMaxLength(20);
            modelBuilder.Entity<Pizza>().Property(pizza => pizza.Name).HasColumnType("varchar").HasMaxLength(50);
            modelBuilder.Entity<Pizza>().Property(pizza => pizza.Type).HasColumnType("varchar").HasMaxLength(4);
            modelBuilder.Entity<Pizza>().Property(pizza => pizza.Size).HasColumnType("varchar").HasMaxLength(4);
            modelBuilder.Entity<Pizza>().Property(pizza => pizza.Price).HasPrecision(8, 2);

            modelBuilder.Entity<Topping>().Property(topping => topping.CreatedBy).HasColumnType("varchar").HasMaxLength(20);
            modelBuilder.Entity<Topping>().Property(topping => topping.Name).HasColumnType("varchar").HasMaxLength(50);
            modelBuilder.Entity<Topping>().Property(topping => topping.Type).HasColumnType("varchar").HasMaxLength(4);
            modelBuilder.Entity<Topping>().Property(topping => topping.Price).HasPrecision(8, 2);
        }
    }
}