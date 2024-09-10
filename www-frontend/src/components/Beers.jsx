import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Button, List, ListItem, ListItemText, CircularProgress } from '@mui/material';

const BeerList = () => {
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBeers, setFilteredBeers] = useState([]);

  useEffect(() => {
    // Función para obtener la lista de cervezas desde la API
    const fetchBeers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('api/v1/beers');
        setBeers(response.data);
        setFilteredBeers(response.data); // Inicialmente, mostrar todas las cervezas
      } catch (error) {
        console.error('Error fetching beers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBeers();
  }, []);

  // Función para manejar la búsqueda
  const handleSearch = () => {
    const filtered = beers.filter((beer) =>
      beer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBeers(filtered);
  };

  return (
    <div>
      <h2>Beer List</h2>

      <div style={{ marginBottom: '20px' }}>
        <TextField
          label="Search Beers"
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
          {filteredBeers.length > 0 ? (
            filteredBeers.map((beer) => (
              <ListItem key={beer.id}>
                <ListItemText primary={beer.name} secondary={`Brewery: ${beer.brewery}`} />
              </ListItem>
            ))
          ) : (
            <p>No beers found.</p>
          )}
        </List>
      )}
    </div>
  );
};

export default BeerList;
