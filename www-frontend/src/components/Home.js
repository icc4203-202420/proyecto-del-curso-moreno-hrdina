import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Container } from '@mui/material';

function Home() {
  return (
    <Container>
      <h1>Weolcome to BeerApp!</h1>
      <Button variant="contained" color="primary" component={Link} to="/beers">
        Beers
      </Button>
      <Button variant="contained" color="secondary" component={Link} to="/bars">
        Bars
      </Button>
      <Button variant="contained" component={Link} to="/search-user">
        User Search
      </Button>
    </Container>
  );
}

export default Home;