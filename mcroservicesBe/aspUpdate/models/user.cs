using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace UserApi.Models;

public class User
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    
    public string username { get; set; } = null!;

    public string password { get; set; } = null!;


    public string email { get; set; } = null!;

    public string codeRoom { get; set; } = null!;
}