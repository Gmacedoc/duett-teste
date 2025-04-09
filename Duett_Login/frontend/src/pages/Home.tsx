import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/auth-context";

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-20">
      <header className="top-0 left-0 p-4" style={{}}>
        <div className="container mx-auto flexitems-center" style={{display:'flex', alignItems: 'center', flexDirection: 'column'}}>
          <h1 className="text-xl font-bold text-gray-800">Duett Login</h1>
            <button
             onClick={handleLogout}
             style={{marginLeft: '20px'}}
             className="text-red-500 hover:underline font-medium">
                 Sair
            </button>
        </div>
      </header>

      

      <main style={{flexDirection: 'column'}} className="flex items-center justify-center h-[calc(50vh-80px)]">
      
        <h1 className="text-4xl font-bold text-gray-800">
          Bem-vindo, {user?.nome || "usuário"}!
        </h1>

        <nav style={{flexDirection: 'column'}} className="flex items-center gap-6">
            <Link to="/home" style={{cursor: 'pointer'}} className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>

            {user?.role === "Administrador" && (
              <Link
                style={{cursor: 'pointer'}}
                to="/admin"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Lista de Usuários
              </Link>
            )}
            
            <Link
                style={{cursor: 'pointer'}}
                to="/changePassword"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                Trocar senha
              </Link>
           
          </nav>
      </main>
    </div>
  );
};

export default Home;
