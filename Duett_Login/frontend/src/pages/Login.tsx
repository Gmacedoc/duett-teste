import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
  Paper,
} from "@mui/material";

const apiUrl = import.meta.env.VITE_APP_API;

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const response = await fetch(`${apiUrl}/Auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || "Erro ao fazer login");
      }

      const token = await response.text();
      login(token);
      navigate("/home");
    } catch (err: any) {
      setError(err.message || "Erro inesperado.");
    }
  };

  return (
    <Box
      component={Paper}
      elevation={3}
      maxWidth={400}
      mx="auto"
      mt={10}
      p={4}
      borderRadius={2}
    >
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Senha"
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        {error && (
          <Alert severity="error" sx={{ mt: 1 }}>
            {error}
          </Alert>
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 2 }}
        >
          Entrar
        </Button>
        <Box mt={2} textAlign="center">
          <Link to="/register" style={{ textDecoration: "none", color: "#1976d2" }}>
            Cadastrar-se
          </Link>
        </Box>
      </form>
    </Box>
  );
};

export default Login;
