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
    [Authorize]
    public class AccountController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly PasswordHasher<User> _hasher = new();

        public AccountController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPut("trocar-senha")]
        public IActionResult TrocaSenhaLogado(ChangePasswordDto dto)
        {
            var userId = User.FindFirst("UserId")?.Value;

            if (userId == null)
                return Unauthorized();

            var user = _context.Users.FirstOrDefault(u => u.Id.ToString() == userId);

            if (user == null)
                return NotFound("Usuário não encontrado.");

            var result = _hasher.VerifyHashedPassword(user, user.PasswordHash, dto.SenhaAtual);
            if (result != PasswordVerificationResult.Success)
                return BadRequest("Senha atual incorreta.");

            user.PasswordHash = _hasher.HashPassword(user, dto.NovaSenha);
            _context.SaveChanges();

            return Ok("Senha alterada com sucesso.");
        }
    }
}
