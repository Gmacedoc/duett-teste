namespace Duett_Login.DTOs
{
    public class ChangePasswordDto
    {
        public string Email { get; set; }
        public string SenhaAtual { get; set; }
        public string NovaSenha { get; set; }
    }
}
