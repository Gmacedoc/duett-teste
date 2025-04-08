using Duett_Login.Data;
using Duett_Login.DTOs;
using Duett_Login.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace Duett_Login.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize(Roles = "Administrador")]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetAll()
        {
            var usuarios = _context.Users
                .Select(u => new
                {
                    u.Id,
                    u.Nome,
                    u.Email,
                    u.CPF,
                    u.Perfil
                })
                .ToList();

            return Ok(usuarios);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(Guid id)
        {
            var user = _context.Users.Find(id);
            if (user == null)
                return NotFound("Usuário não encontrado.");

            _context.Users.Remove(user);
            _context.SaveChanges();

            return Ok("Usuário excluído com sucesso.");
        }
    }
}
