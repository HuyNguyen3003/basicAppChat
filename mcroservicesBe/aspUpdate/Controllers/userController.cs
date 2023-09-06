using System;
using Microsoft.AspNetCore.Mvc;
using MongoExample.Services;
using MongoExample.Models;
using MongoDB.Driver;


namespace MongoExample.Controllers;


[Controller]
[Route("api/[controller]")]
public class UsersController: Controller{
    private readonly MongoDBServices _mongoService;
    public UsersController(MongoDBServices mongoService){
        _mongoService = mongoService;
    }

    [HttpGet]
    public async Task<List<Users>> GetUser(){
        return await _mongoService.GetAllAsync();
    }   

    [HttpPost]
     public async Task<IActionResult> CreateUser([FromBody]Users users){
  

        await _mongoService.CreateAsync(users);
        return CreatedAtAction(nameof(GetUser),new {id = users.Id},users);
        
    }  

    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateIdUser(string id, [FromBody]string idUser){
      await _mongoService.AddToUserAsync(id,idUser);
      return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(string id){
        await _mongoService.DeleteUser(id);
        return NoContent();
    }

}