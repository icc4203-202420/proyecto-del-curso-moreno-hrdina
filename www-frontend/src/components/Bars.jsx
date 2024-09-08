import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, TextField } from '@mui/material';

function Bars() {
  const [bars, setBars] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/v1/bars')
      .then(response => response.json())
      .then(data => setBars(data.bars)) 
      .catch(error => console.error('Error fetching bars:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBars = bars.filter(bar => 
    bar.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <TextField
        label="Search Bars"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        sx={{ marginBottom: 4 }}
      />
      <Grid container spacing={4}>
        {filteredBars.map((bar) => (
          <Grid item xs={12} sm={6} md={4} key={bar.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{bar.name}</Typography>
                <Typography variant="body2">{bar.address}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Bars;
