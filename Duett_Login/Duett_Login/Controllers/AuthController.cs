using Duett_Login.Data;
using Duett_Login.DTOs;
using Duett_Login.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Duett_Login.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IConfiguration _config;
        private readonly PasswordHasher<User> _hasher = new();

        public AuthController(AppDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        [HttpPost("register")]
        public IActionResult Register(RegisterUserDto dto)
        {
            if (_context.Users.Any(u => u.Email == dto.Email || u.CPF == dto.CPF))
                return BadRequest("E-mail ou CPF já cadastrado.");

            var user = new User
            {
                Nome = dto.Nome,
                Email = dto.Email,
                CPF = dto.CPF,
                Perfil = dto.Perfil
            };

            user.PasswordHash = _hasher.HashPassword(user, dto.Senha);

            _context.Users.Add(user);
            _context.SaveChanges();

            return Ok("Usuário registrado com sucesso!");
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto dto)
        {
            var user = _context.Users.FirstOrDefault(u => u.Email == dto.Email);
            if (user == null)
                return Unauthorized("Credenciais inválidas.");

            var result = _hasher.VerifyHashedPassword(user, user.PasswordHash, dto.Senha);
            if (result != PasswordVerificationResult.Success)
                return Unauthorized("Credenciais inválidas.");

            var token = GenerateToken(user);
            return Ok(new { token });
        }

        [HttpPut("redefinir-senha")]
        public IActionResult RedefinirSenha(ForgotPasswordDto dto)
        {
            var user = _context.Users.FirstOrDefault(u =>
                u.Email == dto.Email && u.CPF == dto.CPF);

            if (user == null)
                return NotFound("Usuário não encontrado com os dados fornecidos.");

            user.PasswordHash = _hasher.HashPassword(user, dto.NovaSenha);
            _context.SaveChanges();

            return Ok("Senha redefinida com sucesso.");
        }

        private string GenerateToken(User user)
        {
            var key = Encoding.ASCII.GetBytes(_config["Jwt:Key"]);

            var claims = new[]
            {
                new Claim("nome", user.Nome),
                new Claim("email", user.Email),
                new Claim(ClaimTypes.Role, user.Perfil),
                new Claim("UserId", user.Id.ToString())
            };

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddHours(2),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var handler = new JwtSecurityTokenHandler();
            var token = handler.CreateToken(tokenDescriptor);
            return handler.WriteToken(token);
        }
    }
}

