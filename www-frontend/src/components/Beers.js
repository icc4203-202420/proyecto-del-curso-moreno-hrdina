import React, { useState, useEffect } from 'react';
import { Container, Grid, Card, CardContent, Typography, TextField } from '@mui/material';
import axios from 'axios';

const initialState = { loading: true, error: null, reviews: [] };

function reviewsReducer(state, action) {
  switch (action.type) {
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, reviews: action.payload };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
}

const BeerReviews = ({ beerId }) => {
  const [state, dispatch] = useReducer(reviewsReducer, initialState);

  useEffect(() => {
    axios.get(`/api/v1/beers/${beerId}/reviews`)
      .then((response) => {
        dispatch({ type: 'FETCH_SUCCESS', payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: 'FETCH_ERROR', payload: error });
      });
  }, [beerId]);

  if (state.loading) return <p>Loading...</p>;
  if (state.error) return <p>Error loading Reviews</p>;

  return (
    <div>
      <h3>Reviews</h3>
      {state.reviews.map((review) => (
        <div key={review.id}>
          <p>Rating: {review.rating}</p>
          <p>{review.text}</p>
        </div>
      ))}
    </div>
  );
};

function Beers() {
  const [beers, setBeers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/v1/beers')
      .then(response => response.json())
      .then(data => setBeers(data.beers)) 
      .catch(error => console.error('Error fetching beers:', error));
  }, []);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBeers = beers.filter(beer => 
    beer.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Container>
      <TextField
        label="Beer Search"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={handleSearch}
        sx={{ marginBottom: 4 }}
      />
      <Grid container spacing={4}>
        {filteredBeers.map((beer) => (
          <Grid item xs={12} sm={6} md={4} key={beer.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{beer.name}</Typography>
                <Typography variant="body2">{beer.description}</Typography>
                <Typography variant="body2">Rating: {beer.rating}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default Beers;