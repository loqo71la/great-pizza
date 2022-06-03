using GreatPizza.Infrastructure;
using GreatPizza.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

IDesignTimeDbContextFactory<GPContext> factory = new GPDbContextFactory();
var context = factory.CreateDbContext(args);
context.Database.Migrate();
context.Dispose();
