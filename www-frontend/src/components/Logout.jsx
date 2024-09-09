import React from 'react';
import { Button } from '@mui/material';
import useAxios from 'axios-hooks';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const [{ loading }, executePost] = useAxios(
    {
      url: 'http://localhost:3001/api/v1/logout',
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    },
    { manual: true } // No ejecutar automáticamente, lo haremos manualmente al hacer clic en el botón
  );
  
  const navigate = useNavigate(); // Hook para manejar la navegación

  const handleLogout = async () => {
    try {
      await executePost();
      navigate('/login'); // Redirige a la página de login después de cerrar sesión
    } catch (err) {
      console.error('Error al cerrar sesión:', err);
    }
  };

  return (
    <Button
      variant="contained"
      color="secondary"
      onClick={handleLogout}
      disabled={loading}
    >
      {loading ? 'Cerrando...' : 'Cerrar Sesión'}
    </Button>
  );
};

export default LogoutButton;
