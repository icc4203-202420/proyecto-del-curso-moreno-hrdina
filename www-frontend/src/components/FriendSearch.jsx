import React, { useState } from 'react';
import { TextField, Button, List, ListItem } from '@mui/material';
import axios from 'axios';

const UserSearch = () => {
  const [handle, setHandle] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setLoading(true);
    setError(null); // Limpiar errores anteriores
    try {
      const response = await axios.get(`http://localhost:3001/api/v1/friendships/search`, {
        params: { handle }
      });
      setResults(response.data);
    } catch (error) {
      console.error('Error searching for users:', error);
      setError('Failed to fetch users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddFriend = async (userId) => {
    const token = localStorage.getItem('token'); 
    if (!token) {
      alert('You need to be logged in to add friends.');
      return;
    }

    try {
      await axios.post(`http://localhost:3001/api/v1/users/${userId}/add_friend`, { friend_id: userId }, {
        headers: {
          Authorization: `Bearer ${token}` // Agregar el token en el encabezado
        }
      });
      alert('Friend request sent successfully!');
      // Opcionalmente, puedes actualizar el estado de results o hacer otra acción
    } catch (error) {
      console.error('Error sending friend request:', error);
      alert('Failed to send friend request. Please try again.');
    }
  };

  return (
    <div>
      <TextField
        label="Search by Handle"
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
      />
      <Button onClick={handleSearch} disabled={loading}>
        {loading ? 'Searching...' : 'Search'}
      </Button>

      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <List>
        {results.map(user => (
          <ListItem key={user.id}>
            {user.handle}
            <Button onClick={() => handleAddFriend(user.id)}>Add Friend</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UserSearch;
