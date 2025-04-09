import React, { useState } from "react";
import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  InputLabel,
  FormControl,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatCpf } from "../Utils/Utils";


const apiUrl = import.meta.env.VITE_APP_API;

const Register: React.FC = () => {
  const navigate = useNavigate();
  const [mensagem, setMensagem] = useState("");
  const [erro, setErro] = useState(false);

  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    cpf: "",
    senha: "",
    perfil: "usuario",
  });

  const [cpf, setCpf] = useState('');

  

  const handleBlur = () => {
    setCpf(formatCpf(cpf));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Enviando dados:", formData);
    try {
        const bodyJson = JSON.stringify({ Nome: formData.nome, Email: formData.email, CPF: cpf, Senha: formData.senha, Perfil: formData.perfil});
        const response = await fetch(`${apiUrl}/Auth/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: bodyJson,
        });
        debugger
        if (!response.ok) {
          const text = await response.text();
          setMensagem(text || "Erro ao fazer login");
          setErro(true)
          return
        }
    
        navigate("/home"); 
      } catch (err: any) {

      }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
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
          Cadastro
        </Typography>

        <TextField
          label="Nome"
          variant="outlined"
          name="nome"
          value={formData.nome}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, nome: e.target.value }))
          }
          required
          fullWidth
          margin="normal"
        />

       
        <TextField
          label="Email"
          variant="outlined"
          name="email"
          type="email"
          value={formData.email}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, email: e.target.value }))
          }
          required
          fullWidth
          margin="normal"
        />
    
        <TextField
        label="CPF"
        variant="outlined"
        name="cpf"
        value={cpf}
        onBlur={handleBlur}
        onChange={(e) => setCpf(e.target.value)}
        required
        fullWidth
        margin="normal"
        />

        <TextField
          label="Senha"
          variant="outlined"
          name="senha"
          type="password"
          value={formData.senha}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, senha: e.target.value }))
          }
          required
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
          <InputLabel id="perfil-label">Perfil</InputLabel>
          <Select
            labelId="perfil-label"
            name="perfil"
            value={formData.perfil}
            label="Perfil"
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, perfil: e.target.value }))
            }
            required
          >
            <MenuItem value="Usuario">Usuário</MenuItem>
            <MenuItem value="Administrador">Administrador</MenuItem>
          </Select>
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ mt: 3 }}
        >
          Cadastrar
        </Button>
        <Button
          type="button" 
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate("/")} 
        >
          Voltar
        </Button>
        {mensagem && (
          <Alert severity={erro ? "error" : "success"} sx={{ mt: 2 }}>
            {mensagem}
          </Alert>
        )}
      </Box>
    </Box>
  );
};

export default Register;
