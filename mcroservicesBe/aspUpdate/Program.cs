
using Elasticsearch.Net;
using MongoDB.Driver.Core.Configuration;
using UserApi.Services;
using UsersApi.Models;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.Configure<UserDatabaseSettings>(builder.Configuration.GetSection("USERMongoDB"));
builder.Services.Configure<MessageDatabaseSettings>(builder.Configuration.GetSection("MSGMongoDB"));
builder.Services.Configure<UserRabbitmqSettings>(builder.Configuration.GetSection("RabbitMQ"));





builder.Services.AddSingleton<UsersService>();
builder.Services.AddSingleton<MessageService>();
builder.Services.AddSingleton<RabbitMQReceiver>();





var app = builder.Build();


//mesqueue
var rabbitServices = app.Services.GetRequiredService<RabbitMQReceiver>();
rabbitServices.StartListening();







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
