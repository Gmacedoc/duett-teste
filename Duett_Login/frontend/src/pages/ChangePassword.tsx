import React, { useState } from "react";
import { Box, Button, TextField, Typography, Alert } from "@mui/material";
import { useAuth } from "../contexts/auth-context";
import { useNavigate } from "react-router-dom";



const TrocarSenha = () => {
  const { user } = useAuth();
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);


  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (novaSenha !== confirmacao) {
      setMensagem("A nova senha e a confirmação não coincidem.");
      setErro(true);
      return;
    }

    try {
      const userEmail = user?.email;
      const res = await fetch(`${import.meta.env.VITE_APP_API}/Account/trocar-senha`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
        },
        body: JSON.stringify({ Email: userEmail, senhaAtual, novaSenha }),
      });

      const texto = await res.text();
      setMensagem(texto);
      setErro(!res.ok);
    } catch {
      setMensagem("Erro na requisição.");
      setErro(true);
    }
  };

  return (
    <Box maxWidth={400} mx="auto" mt={6} p={4} bgcolor="white" boxShadow={3} borderRadius={2}>
      <Typography variant="h5" gutterBottom textAlign="center">
        Trocar Senha
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Senha atual"
          type="password"
          value={senhaAtual}
          onChange={(e) => setSenhaAtual(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Nova senha"
          type="password"
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Confirmar nova senha"
          type="password"
          value={confirmacao}
          onChange={(e) => setConfirmacao(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Alterar Senha
        </Button>
        <Button
          type="button" 
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate("/home")} 
        >
          Voltar
        </Button>
        {mensagem && (
          <Alert severity={erro ? "error" : "success"} sx={{ mt: 2 }}>
            {mensagem}
          </Alert>
        )}
      </form>
    </Box>
  );
};

export default TrocarSenha;
