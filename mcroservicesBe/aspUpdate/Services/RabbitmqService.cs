using RabbitMQ.Client;
using RabbitMQ.Client.Events;
using System.Text;
using UserApi.Models;
using Newtonsoft.Json.Linq;
using UsersApi.Models;
using Microsoft.Extensions.Options;
using MongoDB.Bson;
using System.Linq;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.IO;


namespace UserApi.Services;
public class RabbitMQReceiver
{
    private readonly UserRabbitmqSettings _rabbitmqSettings;
    private readonly UsersService _userService;
    private readonly MessageService _messageService;


    public RabbitMQReceiver(IOptions<UserRabbitmqSettings> rabbitmqSettings, UsersService userService, MessageService messageService)
    {
        _rabbitmqSettings = rabbitmqSettings.Value;
        _userService = userService;
        _messageService = messageService;

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
            if (type == "addmsg" || type == "deletemsg")
            {
                string users = jsonObject["msg"]["users"].ToString();
                string senderId = jsonObject["msg"]["senderId"].ToString();
                string messages = jsonObject["msg"]["message"].ToString();
                string nameChat = jsonObject["msg"]["nameChat"].ToString();
                string id = jsonObject["msg"]["_id"].ToString();
                if (type == "addmsg")
                {
                    var _id = ObjectId.GenerateNewId().ToString();
                    var time = DateTime.UtcNow;
                    Message newMessage = new Message
                    {
                        Id = _id,
                        users = users,
                        senderId = senderId,
                        message = messages,
                        nameChat = nameChat,
                        CreatedAt = time
                    };
                    await _messageService.CreateAsync(newMessage);
                    using (var client = new HttpClient())
                    {
                        var request = new HttpRequestMessage(HttpMethod.Put, $"http://127.0.0.1:9200/messages/_doc/{_id}");
                        string jsonBody = $"{{\"users\":\"{users}\",\"messages\":\"{messages}\",\"senderId\":\"{senderId}\",,\"nameChat\":\"{nameChat}\",\"CreatedAt\":\"{time}\"}}";
                        request.Content = new StringContent(jsonBody, null, "application/json");
                        var response = await client.SendAsync(request);
                        response.EnsureSuccessStatusCode();
                    }
                    Console.WriteLine("add Msg");
                }
                else
                {
                    await _messageService.RemoveAsync(id);
                    using (var client = new HttpClient())
                    {
                        var request = new HttpRequestMessage(HttpMethod.Delete, $"http://127.0.0.1:9200/messages/_doc/{id}");
                        var response = await client.SendAsync(request);
                        response.EnsureSuccessStatusCode();
                    }
                    Console.WriteLine("delete Msg");
                }



            }
            else
            {
                string username = jsonObject["msg"]["username"].ToString();
                string password = jsonObject["msg"]["password"].ToString();
                string email = jsonObject["msg"]["email"].ToString();
                string avatar = jsonObject["msg"]["avatar"].ToString();
                string id = jsonObject["msg"]["_id"].ToString();




                if (type == "create")
                {


                    var _id = ObjectId.GenerateNewId().ToString();

                    User newUser = new User
                    {
                        Id = _id,
                        username = username,
                        password = password,
                        email = email,
                        avatar = avatar
                    };
                    await _userService.CreateAsync(newUser);
                    using (var client = new HttpClient())
                    {
                        var request = new HttpRequestMessage(HttpMethod.Put, $"http://127.0.0.1:9200/users/_doc/{_id}");
                        string jsonBody = $"{{\"username\":\"{username}\",\"password\":\"{password}\",\"email\":\"{email}\",\"avatar\":\"{avatar}\"}}";
                        request.Content = new StringContent(jsonBody, null, "application/json");
                        var response = await client.SendAsync(request);
                        response.EnsureSuccessStatusCode();
                    }
                    Console.WriteLine("create User");
                }
                if (type == "update")
                {
                    User newUser = new User
                    {
                        Id = id,
                        username = username,
                        password = password,
                        email = email,
                        avatar = avatar
                    };
                    await _userService.UpdateAsync(id, newUser);
                    using (var client = new HttpClient())
                    {
                        var request = new HttpRequestMessage(HttpMethod.Put, $"http://127.0.0.1:9200/users/_doc/{id}");
                        string jsonBody = $"{{\"username\":\"{username}\",\"password\":\"{password}\",\"email\":\"{email}\",\"avatar\":\"{avatar}\"}}";
                        request.Content = new StringContent(jsonBody, null, "application/json");
                        var response = await client.SendAsync(request);
                        response.EnsureSuccessStatusCode();
                    }
                    Console.WriteLine("update User");
                }
                if (type == "delete")
                {
                    await _userService.RemoveAsync(id);
                    using (var client = new HttpClient())
                    {
                        var request = new HttpRequestMessage(HttpMethod.Delete, $"http://127.0.0.1:9200/users/_doc/{id}");
                        var response = await client.SendAsync(request);
                        response.EnsureSuccessStatusCode();
                    }
                    Console.WriteLine("delete User");
                }
            }
        };


        channel.BasicConsume(queue: _rabbitmqSettings.QueueName,
                             autoAck: true,
                             consumer: consumer);

        Console.WriteLine("Press [enter] to exit.");
        Console.ReadLine();
    }
}