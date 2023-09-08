using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using UserApi.Models;
using Newtonsoft.Json.Linq;
using UsersApi.Models;
using Microsoft.Extensions.Options;


namespace UserApi.Services;
public class RabbitMQReceiver
{
   private readonly UserRabbitmqSettings _rabbitmqSettings;
    private readonly  UsersService _userService;

    public RabbitMQReceiver( IOptions<UserRabbitmqSettings> rabbitmqSettings, UsersService userService)
    {
        _rabbitmqSettings = rabbitmqSettings.Value;
        _userService = userService;
    }

    public void StartListening()
    {
        
        var factory = new ConnectionFactory
        {
            HostName = _rabbitmqSettings.HostName,
            UserName = "guest",     // Thay đổi tên đăng nhập và mật khẩu nếu cần
            Password = "guest"
        };

        using var connection = factory.CreateConnection();
        using var channel = connection.CreateModel();

        channel.QueueDeclare(queue: _rabbitmqSettings.QueueName,
                            durable: false,
                            exclusive: false,
                            autoDelete: true,
                            arguments: null);

        var consumer = new EventingBasicConsumer(channel);
        consumer.Received += async (model, ea) =>
        {
            var body = ea.Body.ToArray();
            var message = Encoding.UTF8.GetString(body);
            JObject jsonObject = JObject.Parse(message);
            string type = jsonObject["type"].ToString();
            string username = jsonObject["msg"]["username"].ToString();
            string password = jsonObject["msg"]["password"].ToString();
            string email = jsonObject["msg"]["email"].ToString();
            string codeRoom = jsonObject["msg"]["codeRoom"].ToString();

            User newUser = new User
                    {
                        username = username,
                        password = password,
                        email = email,
                        codeRoom = codeRoom
                    };

       if(type == "creat")  await _userService.CreateAsync(newUser);
           
            Console.WriteLine(type);
        };

        channel.BasicConsume(queue: _rabbitmqSettings.QueueName,
                             autoAck: true,
                             consumer: consumer);

        Console.WriteLine("Press [enter] to exit.");
        Console.ReadLine();
    }
}