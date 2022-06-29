using Microsoft.Extensions.Configuration;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;
using GreatPizza.Infrastructure.Persistence;

namespace GreatPizza.Infrastructure;

public class GPDbContextFactory : IDesignTimeDbContextFactory<GPContext>
{
    private static readonly string INFRASTRUCTURE = "GreatPizza.Infrastructure";
    private static readonly string APP_SETTING = "appsettings.json";
    private static readonly string CONNECTION = "DefaultConnection";
    private static readonly string WEB_API = "GreatPizza.WebApi";
    private static readonly string REST_API = "rest-api";
    private static readonly string BACK = "..";

    public static IConfigurationRoot LoadSettings()
    {
        var basePath = Directory.GetCurrentDirectory();
        if (basePath.EndsWith(REST_API))
        {
            basePath = Path.Join(basePath, INFRASTRUCTURE);
        }
        if (basePath.EndsWith(WEB_API))
        {
            basePath = Path.Join(basePath, BACK, INFRASTRUCTURE);
        }
        return new ConfigurationBuilder()
            .SetBasePath(basePath)
            .AddJsonFile(APP_SETTING)
            .Build();
    }

    public GPContext CreateDbContext(string[] args)
    {
        var settings = LoadSettings();
        var builder = new DbContextOptionsBuilder<GPContext>();
        builder.UseNpgsql(settings.GetConnectionString(CONNECTION));
        return new GPContext(builder.Options);
    }
}
