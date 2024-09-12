import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { CircularProgress, Typography, Card, CardContent, Grid, Button } from '@mui/material';
import ReviewForm from './Review'; // Asegúrate de que el formulario de evaluación esté importado correctamente

const BeerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Hook para navegación
  const [beer, setBeer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null); // Estado para almacenar el usuario autenticado

  useEffect(() => {
    const fetchBeerDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/v1/beers/${id}`);
        setBeer(response.data);
      } catch (error) {
        console.error('Error fetching beer details:', error);
        setError('Failed to load beer details.');
      } finally {
        setLoading(false);
      }
    };

    const fetchUser = async () => {
      // Ejemplo de cómo podrías obtener el usuario autenticado
      try {
        const response = await axios.get('http://localhost:3001/api/v1/users/current');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    fetchBeerDetails();
    fetchUser();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Card style={{ backgroundColor: '#F59A23', margin: '20px' }}>
      <CardContent>
        <Typography variant="body1" style={{ color: '#FFF' }}>
          <img src={beer.image_url} alt={beer.name} style={{ width: '100px', height: 'auto' }} />
        </Typography>
        <Typography variant="h4" style={{ color: '#FFF' }}>
          {beer.name}
        </Typography>
        <Typography variant="h6" style={{ color: '#FFF' }}>
          Brand: {beer.brand.name}
        </Typography>
        <Typography variant="h6" style={{ color: '#FFF' }}>
          Brewery: {beer.brand.brewery.name}
        </Typography>
        <Typography variant="body1" style={{ color: '#FFF' }}>
          Style: {beer.style}
        </Typography>
        <Typography variant="body1" style={{ color: '#FFF' }}>
          Hop: {beer.hop}
        </Typography>
        <Typography variant="body1" style={{ color: '#FFF' }}>
          Yeast: {beer.yeast}
        </Typography>
        <Typography variant="body1" style={{ color: '#FFF' }}>
          Malts: {beer.malts}
        </Typography>
        <Typography variant="body1" style={{ color: '#FFF' }}>
          IBU: {beer.ibu}
        </Typography>
        <Typography variant="body1" style={{ color: '#FFF' }}>
          Alcohol: {beer.alcohol}%
        </Typography>
        <Typography variant="body1" style={{ color: '#FFF' }}>
          BLG: {beer.blg}
        </Typography>
        <Typography variant="body1" style={{ color: '#FFF' }}>
          Average Rating: {beer.avg_rating}
        </Typography>
        <Typography variant="h6" style={{ color: '#FFF', marginTop: '20px' }}>
          Bars Serving this Beer:
        </Typography>
        {beer.bars.length > 0 ? (
          <Grid container spacing={2}>
            {beer.bars.map((bar) => (
              <Grid item key={bar.id}>
                <Typography style={{ color: '#FFF' }}>{bar.name}</Typography>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No bars currently serving this beer.</Typography>
        )}
        <Button
          size="small"
          style={{ backgroundColor: '#F59A23', color: '#FFF', marginTop: '10px' }}
          onClick={() => navigate(`/beers/${id}/review`)}
        >
          Write a Review
        </Button>

        <Typography variant="h6" style={{ color: '#FFF', marginTop: '20px' }}>
          Reviews:
        </Typography>
        {beer.reviews.length > 0 ? (
          <Grid container spacing={2}>
            {beer.reviews.sort((a, b) => (a.user.id === user?.id ? -1 : 1)).map((review) => (
              <Grid item key={review.id}>
                <Card style={{ backgroundColor: '#FFF', padding: '10px', borderRadius: '5px' }}>
                  <CardContent>
                    <Typography variant="h6">{review.user.name}</Typography>
                    <Typography variant="body1">Rating: {review.rating}</Typography>
                    <Typography variant="body1">{review.text}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography>No reviews yet.</Typography>
        )}
        <ReviewForm beerId={id} /> {/* Mostrar el formulario de evaluación */}
      </CardContent>
    </Card>
  );
};

export default BeerDetails;
