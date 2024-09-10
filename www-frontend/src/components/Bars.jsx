import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

const BarList = () => {
  const [bars, setBars] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBars, setFilteredBars] = useState([]);

  useEffect(() => {
    // Función para obtener la lista de bares desde la API
    const fetchBars = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/v1/bars');
        setBars(response.data);
        setFilteredBars(response.data); // Inicialmente, mostrar todos los bares
      } catch (error) {
        console.error('Error fetching bars:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBars();
  }, []);

  // Función para manejar la búsqueda
  const handleSearch = () => {
    console.log('Search Term:', searchTerm);
    const filtered = bars.filter((bar) =>
      bar.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    console.log('Filtered Bars:', filtered);
    setFilteredBars(filtered);
  };
  

  return (
    <div>
      <h2>Bar List</h2>

      <div style={{ marginBottom: '20px' }}>
        <TextField
          label="Search Bars"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="contained" color="primary" onClick={handleSearch} style={{ marginLeft: '10px' }}>
          Search
        </Button>
      </div>

      {loading ? (
        <CircularProgress />
      ) : (
        <List>
          {filteredBars.length > 0 ? (
            filteredBars.map((bar) => (
              <ListItem key={bar.id}>
                <ListItemText primary={bar.name} secondary={`Location: ${bar.location}`} />
              </ListItem>
            ))
          ) : (
            <p>No bars found.</p>
          )}
        </List>
      )}
    </div>
  );
};

export default BarList;
