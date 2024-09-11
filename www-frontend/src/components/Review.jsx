import React, { useReducer, useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Card, CardContent, Grid, Slider, CircularProgress, Rating } from '@mui/material';

const initialState = {
  text: '',
  rating: 1,
  loading: false,
  error: null,
  success: false,
  beerName: ''
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_TEXT':
      return { ...state, text: action.payload };
    case 'SET_RATING':
      return { ...state, rating: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    case 'SET_SUCCESS':
      return { ...state, success: action.payload };
    case 'SET_BEER_NAME':
      return { ...state, beerName: action.payload };
    default:
      return state;
  }
};

const ReviewForm = () => {
  const { id } = useParams(); // ID de la cerveza
  const navigate = useNavigate(); // Para redirigir
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchBeerName = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/beers/${id}`);
        dispatch({ type: 'SET_BEER_NAME', payload: response.data.name });
      } catch (error) {
        dispatch({ type: 'SET_ERROR', payload: 'Failed to fetch beer details.' });
      }
    };
    fetchBeerName();
  }, [id]);

  const handleTextChange = (event) => {
    dispatch({ type: 'SET_TEXT', payload: event.target.value });
  };

  const handleRatingChange = (event, newValue) => {
    dispatch({ type: 'SET_RATING', payload: newValue });
  };

  const handleCancel = () => {
    navigate(-1); // Para volver a la página anterior
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    dispatch({ type: 'SET_LOADING', payload: true });
    dispatch({ type: 'SET_ERROR', payload: null });
    dispatch({ type: 'SET_SUCCESS', payload: false });

    try {
      await axios.post(`http://localhost:3001/api/v1/beers/${id}/reviews`, {
        review: {
          text: state.text,
          rating: state.rating
        }
      });
      dispatch({ type: 'SET_SUCCESS', payload: true });
      navigate(`/beers/${id}`);
    } catch (error) {
      dispatch({ type: 'SET_ERROR', payload: 'Failed to submit review.' });
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  return (
    <Card style={{ backgroundColor: '#A36717', margin: '20px' }}>
      <CardContent>
        <Typography variant="h4" style={{ color: '#FFF', marginBottom: '20px' }}>
          {state.beerName || 'Beer Name'}
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={6} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="subtitle1" style={{ color: '#FFF', marginBottom: '10px' }}>
              Your Rating
            </Typography>
            <Slider
              value={state.rating}
              onChange={handleRatingChange}
              min={1}
              max={5}
              step={1}
              marks
              style={{ color: '#FFF', width: '100%', maxWidth: '300px' }}
              aria-labelledby="rating-slider"
            />
            <Rating
              name="read-only"
              value={state.rating}
              readOnly
              precision={0.1}
              style={{ marginTop: '10px', color: '#FFF' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Review Text"
              multiline
              rows={4}
              variant="outlined"
              fullWidth
              value={state.text}
              onChange={handleTextChange}
              style={{ backgroundColor: '#704A10', color: '#FFF' }}
              InputLabelProps={{ style: { color: '#FFF' } }}
              InputProps={{ style: { color: '#FFF' } }}
            />
          </Grid>
          {state.loading && (
            <Grid item xs={12} container justifyContent="center">
              <CircularProgress />
            </Grid>
          )}
          {state.error && (
            <Grid item xs={12}>
              <Typography color="error">{state.error}</Typography>
            </Grid>
          )}
          {state.success && (
            <Grid item xs={12}>
              <Typography color="success">Review submitted successfully!</Typography>
            </Grid>
          )}
        </Grid>
        <Grid container spacing={2} style={{ marginTop: '20px' }}>
          <Grid item xs={6} container justifyContent="flex-start">
            <Button variant="outlined" style={{ color: '#FFF', borderColor: '#000' }} onClick={handleCancel}>
              Cancel
            </Button>
          </Grid>
          <Grid item xs={6} container justifyContent="flex-end">
            <Button variant="contained" style={{ backgroundColor: '#000', color: '#FFF' }} onClick={handleSubmit}>
              Post
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default ReviewForm;
