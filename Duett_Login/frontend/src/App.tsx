import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import Login from './pages/Login';
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import ListaUsuarios from "./pages/ListaUsuarios";
import Register from "./pages/Register";
import ChangePassword from "./pages/ChangePassword";

function App() {

  return (
    <Router>
      <Routes>

      <Route
        path="/home"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Login />} />

      <Route path="/register" element={<Register />} />

      <Route path="/changePassword" 
        element={
          <ProtectedRoute >
              <ChangePassword />
          </ProtectedRoute>
        } 
      />
      
      <Route
        path="/admin"
        element={
          <ProtectedRoute requiredRole="Administrador">
            <ListaUsuarios />
          </ProtectedRoute>
        }
      />
    </Routes>
    </Router>
  )
}

export default App
