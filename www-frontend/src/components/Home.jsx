import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to BeerApp!
      </Typography>
      <Button variant="contained" color="primary" component={Link} to="/beers">
        Beers
      </Button>
      <Button variant="contained" color="secondary" component={Link} to="/bars">
        Bars
      </Button>
      <Button variant="contained" color="success" component={Link} to="/search-user">
        Search User
      </Button>
    </Container>
  );
}

export default Home;
