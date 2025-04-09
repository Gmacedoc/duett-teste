using Duett_Login.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace Duett_Login.Data
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            var hasher = new PasswordHasher<User>();

            var admin = new User
            {
                Id = Guid.NewGuid(),
                Nome = "Admin",
                Email = "admin@admin.com",
                CPF = "00000000000",
                Perfil = "Administrador"
            };
            admin.PasswordHash = hasher.HashPassword(admin, "0000");

            var user = new User
            {
                Id = Guid.NewGuid(),
                Nome = "Usuario",
                Email = "user@user.com",
                CPF = "11111111111",
                Perfil = "Usuario"
            };
            user.PasswordHash = hasher.HashPassword(user, "1111");

            modelBuilder.Entity<User>().HasData(admin, user);
        }
    }
}
