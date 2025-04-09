import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";
import { Box, Button, Typography } from "@mui/material";

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: "#f3f4f6",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        pt: 8,
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 400,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 2,
          pb: 2,
        }}
      >
        <Typography variant="h5" fontWeight="bold" color="text.primary">
          Duett Login
        </Typography>
        <Button
          onClick={handleLogout}
          variant="text"
          color="error"
          sx={{ fontWeight: "medium" }}
        >
          Sair
        </Button>
      </Box>
  
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 2,
          textAlign: "center",
          mb: 4,
        }}
      >
        <Typography variant="h4" fontWeight="bold" color="text.primary">
          Hola Mundo, {user?.nome || "usuário"}!
        </Typography>
  
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2, marginTop: '100px' }}>
          {user?.role === "Administrador" && (
            <Button
              onClick={() => navigate("/admin")}
              variant="text"
              color="primary"
              sx={{ fontWeight: "medium" }}
            >
              Lista de Usuários
            </Button>
          )}

          <Button
            onClick={() => navigate("/changePassword")}
            variant="text"
            color="primary"
            sx={{ fontWeight: "medium" }}
          >
            Trocar senha
          </Button>
        </Box>
      </Box>
    </Box>
  );
  
};

export default Home;
