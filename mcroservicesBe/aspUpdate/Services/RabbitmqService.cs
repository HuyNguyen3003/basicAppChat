using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System;
using System.Text;
using UserApi.Models;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
public class RabbitMQReceiver
{
    private readonly string _hostName;
    private readonly string _queueName;

    public RabbitMQReceiver(string hostName, string queueName)
    {
        _hostName = hostName;
        _queueName = queueName;
    }

    public void StartListening()
    {
        var factory = new ConnectionFactory
        {
            HostName = _hostName,
            UserName = "guest",     // Thay đổi tên đăng nhập và mật khẩu nếu cần
            Password = "guest"
        };

        using var connection = factory.CreateConnection();
        using var channel = connection.CreateModel();

        channel.QueueDeclare(queue: _queueName,
                            durable: false,
                            exclusive: false,
                            autoDelete: true,
                            arguments: null);

        var consumer = new EventingBasicConsumer(channel);
        consumer.Received += (model, ea) =>
        {
            var body = ea.Body.ToArray();
            var message = Encoding.UTF8.GetString(body);
            JObject jsonObject = JObject.Parse(message);
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

           
            Console.WriteLine(newUser.username);
        };

        channel.BasicConsume(queue: _queueName,
                             autoAck: true,
                             consumer: consumer);

        Console.WriteLine("Press [enter] to exit.");
        Console.ReadLine();
    }
}