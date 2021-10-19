using GreatPizza.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace GreatPizza.Infrastructure.Migration
{
    class Program
    {
        static void Main(string[] args)
        {
            IDesignTimeDbContextFactory<GPContext> factory = new GPDbContextFactory();
            var context = factory.CreateDbContext(args);
            context.Database.Migrate();
            context.Dispose();
        }
    }
}
