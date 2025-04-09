import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import {
  Box,
  TextField,
  Button,
  Typography,
  Alert,
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
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: 2,
      }}
    >
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 400,
          bgcolor: "white",
          p: 4,
          borderRadius: 2,
          boxShadow: 3,
        }}
      >
        <Typography variant="h5" fontWeight="bold" gutterBottom textAlign="center">
          Login
        </Typography>
        
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
        
        <Button
          type="button"
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate("/register")}
        >
          Cadastrar-se
        </Button>
      </Box>
    </Box>
  );
  
};

export default Login;
