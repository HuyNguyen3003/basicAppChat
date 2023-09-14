using Microsoft.Extensions.Options;
using MongoDB.Driver;
using UserApi.Models;
using UsersApi.Models;

namespace UserApi.Services;

public class MessageService
{
    private readonly IMongoCollection<Message> _messageCollection;

    public MessageService(
        IOptions<MessageDatabaseSettings> MessageDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            MessageDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            MessageDatabaseSettings.Value.DatabaseName);

        _messageCollection = mongoDatabase.GetCollection<Message>(
            MessageDatabaseSettings.Value.MessageCollectionName);
    }

    public async Task<List<Message>> GetAsync() =>
        await _messageCollection.Find(_ => true).ToListAsync();

 
    public async Task CreateAsync(Message newMessage) =>
        await _messageCollection.InsertOneAsync(newMessage);

         public async Task RemoveAsync(string id) =>
        await _messageCollection.DeleteOneAsync(x => x.Id == id);

   
}