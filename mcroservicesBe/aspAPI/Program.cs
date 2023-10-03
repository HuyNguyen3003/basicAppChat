using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Microsoft.Extensions.DependencyInjection;



var builder = WebApplication.CreateBuilder(args);

//1
builder.Configuration.SetBasePath(builder.Environment.ContentRootPath)
.AddJsonFile("ocelot.json", optional: false, reloadOnChange: true);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(builder =>
    {
        builder.WithOrigins("http://localhost:3000") // Thay đổi URL nguồn tùy theo máy chủ nguồn của bạn.
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});


//2
builder.Services.AddOcelot();
var app = builder.Build();

//cors
app.UseCors();
app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

//3
app.UseOcelot().Wait();
app.Run();
