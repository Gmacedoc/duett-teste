import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Button,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";

type Usuario = {
  id: string;
  nome: string;
  email: string;
  cpf: string;
  perfil: string;
};

const ListaUsuarios: React.FC = () => {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const stored = localStorage.getItem("user");
  const token = stored ? JSON.parse(stored).token : "";
  const emailLogado = stored ? JSON.parse(stored).email : "";

  const fetchUsuarios = () => {
    setLoading(true);
    fetch(`${import.meta.env.VITE_APP_API}/Users`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) throw new Error("Erro ao buscar usuários");
        const data: Usuario[] = await res.json();
        const filtrados = data.filter((u) => u.email !== emailLogado);
        setUsuarios(filtrados);
      })
      .finally(() => setLoading(false));
  };

  const excluirUsuario = (id: string) => {
    fetch(`${import.meta.env.VITE_APP_API}/Users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao excluir usuário");
        fetchUsuarios();
      })
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const columns: GridColDef[] = [
    { field: "nome", headerName: "Nome", flex: 1 },
    { field: "email", headerName: "Email", flex: 1.5 },
    { field: "cpf", headerName: "CPF", flex: 1 },
    { field: "perfil", headerName: "Perfil", flex: 1 },
    {
      field: "actions",
      headerName: "Ações",
      renderCell: (params) => (
        <IconButton onClick={() => excluirUsuario(params.row.id)} color="error">
          <DeleteIcon />
        </IconButton>
      ),
      width: 100,
    },
  ];

  return (
    <Box p={4}>
      <Typography variant="h4" gutterBottom>
        Lista de Usuários
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : (
        <Box sx={{ height: 500, width: 700 }}>
          <DataGrid
            rows={usuarios}
            columns={columns}
            getRowId={(row) => row.id}
            disableRowSelectionOnClick
            sx={{
              '& .MuiDataGrid-columnHeaders': {
                backgroundColor: '#1976d2',
              },
              '& .MuiDataGrid-cell': {
                fontSize: '14px',
              },
              '& .MuiDataGrid-footerContainer': {
                backgroundColor: '#f5f5f5',
              },
            }}
          />
        </Box>
      )}
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
    </Box>
  );
};

export default ListaUsuarios;
