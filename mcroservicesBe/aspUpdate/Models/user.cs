using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;
using System.Text.Json.Serialization;

namespace MongoExample.Models;

public class Users{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id{ get; set; }
    public string? username{ get; set; }
    public string? password{ get; set; }

}