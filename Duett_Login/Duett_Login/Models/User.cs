namespace Duett_Login.Models
{
    public class User
    {
        public Guid Id { get; set; } = Guid.NewGuid();
        public string Nome { get; set; }
        public string Email { get; set; }
        public string CPF { get; set; }
        public string PasswordHash { get; set; }
        public string Perfil { get; set; }
    }
}
