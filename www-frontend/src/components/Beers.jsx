import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { TextField, Grid, IconButton, List, ListItem, ListItemText, CircularProgress, Card, CardContent, Typography, CardActions, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

const BeerList = () => {
  const [beers, setBeers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredBeers, setFilteredBeers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBeers = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://localhost:3001/api/v1/beers');
        setBeers(response.data.beers);
        setFilteredBeers(response.data.beers);
      } catch (error) {
        console.error('Error fetching beers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBeers();
  }, []);

  const handleSearch = () => {
    const filtered = beers.filter((beer) =>
      beer.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredBeers(filtered);
  };

  const handleViewDetails = (id) => {
    navigate(`/beers/${id}`);
  };

  const handleRateBeer = (id) => {
    navigate(`/beers/${id}/review`);
  };  

  return (
    <div>
      <Grid container justifyContent="center">
        <h2>Beer List</h2>
      </Grid>


      <Grid container justifyContent="center" alignItems="center" style={{ marginBottom: '20px' }}>
        <TextField
          label="Search Beers"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginRight: '10px' }}
        />
        <IconButton onClick={handleSearch}>
          <SearchIcon style={{ color: 'black' }} />
        </IconButton>
      </Grid>

      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {filteredBeers.length > 0 ? (
            filteredBeers.map((beer) => (
              <Grid item xs={12} sm={6} md={4} key={beer.id}>
                <Card style={{ backgroundColor: '#A36717' }}>
                  <CardContent>
                    <Typography variant="h6" style={{ color: '#FFF' }}>
                      {beer.name}
                    </Typography>
                    <Typography color="textSecondary" style={{ color: '#FFF' }}>
                      Brewery: {beer.brewery}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      style={{ backgroundColor: '#F59A23', color: '#FFF' }}
                      onClick={() => handleViewDetails(beer.id)}
                    >
                      View Details
                    </Button>
                    <Button
                      size="small"
                      style={{ backgroundColor: '#F59A23', color: '#FFF', marginLeft: '10px' }}
                      onClick={() => handleRateBeer(beer.id)}
                    >
                      Rate
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <p>No beers found.</p>
          )}
        </Grid>
      )}
    </div>
  );
};

export default BeerList;
