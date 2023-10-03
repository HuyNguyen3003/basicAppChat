using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace UserApi.Models;

public class Message
{
    [BsonId]
    [BsonRepresentation(BsonType.ObjectId)]
    public string? Id { get; set; }

    public string? message { get; set; } = null!;
    public string? users { get; set; } = null!;

    public string? senderId { get; set; } = null!;

    public string? nameChat { get; set; } = null!;



    public DateTime? CreatedAt { get; set; } = null!;


}