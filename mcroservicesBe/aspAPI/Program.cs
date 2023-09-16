using Ocelot.DependencyInjection;
using Ocelot.Middleware;
using Microsoft.Extensions.DependencyInjection;



var builder = WebApplication.CreateBuilder(args);

//1
builder.Configuration.SetBasePath(builder.Environment.ContentRootPath)
.AddJsonFile("ocelot.json",optional:false,reloadOnChange:true);

// Add services to the container.

builder.Services.AddControllers();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin", builder =>
    {
        builder
            .WithOrigins("http://localhost") // Địa chỉ gốc được phép truy cập (có thể là địa chỉ của ứng dụng web frontend của bạn)
            .AllowAnyMethod() // Cho phép tất cả các phương thức HTTP
            .AllowAnyHeader(); // Cho phép tất cả các tiêu đề HTTP
    });
});

//2
builder.Services.AddOcelot();
var app = builder.Build();


app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();
//cors
app.UseCors("AllowSpecificOrigin");
//3
app.UseOcelot().Wait();
app.Run();
