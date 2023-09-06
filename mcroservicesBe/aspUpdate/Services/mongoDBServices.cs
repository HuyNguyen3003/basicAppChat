using MongoExample.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MongoDB.Bson;

namespace MongoExample.Services
{
    public class MongoDBServices
    {
        private readonly IMongoCollection<Users> _userCollection;

        public MongoDBServices(IOptions<mongoDBSetting> mongoDBSetting)
        {
            MongoClient client = new MongoClient(mongoDBSetting.Value.ConnectionURI);
            IMongoDatabase database = client.GetDatabase(mongoDBSetting.Value.DatabaseName);
            _userCollection = database.GetCollection<Users>(mongoDBSetting.Value.CollectionseName);
        }

        public async Task CreateAsync(Users users){
            await _userCollection.InsertOneAsync(users);
            return;
        }

         public async Task<List<Users>> GetAllAsync(){
          return  await _userCollection.Find(new BsonDocument()).ToListAsync();
            
        }

           public async Task AddToUserAsync(string id, string userId){
            FilterDefinition<Users> filter = Builders<Users>.Filter.Eq("Id",id);
            UpdateDefinition<Users> update = Builders<Users>.Update.AddToSet<string>("userId", userId);
            await _userCollection.UpdateOneAsync(filter, update);
            return;
            
        }

             public async Task DeleteUser(string id ){
            FilterDefinition<Users> filter = Builders<Users>.Filter.Eq("Id",id);
            await _userCollection.DeleteOneAsync(filter);
            return;

            
        }
    }
}
