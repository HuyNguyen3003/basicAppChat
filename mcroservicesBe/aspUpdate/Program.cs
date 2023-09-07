using Microsoft.Extensions.Options;
using UserApi.Services;
using UsersApi.Models;
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.Configure<UserDatabaseSettings>(builder.Configuration.GetSection("MongoDB"));
builder.Services.AddSingleton<UsersService>();







var app = builder.Build();


//mesqueue
var rabbitMQReceiver = new RabbitMQReceiver("localhost", "nodejsSend");
rabbitMQReceiver.StartListening();
//


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
