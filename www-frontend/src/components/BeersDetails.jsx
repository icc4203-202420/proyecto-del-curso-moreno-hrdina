import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CircularProgress, Typography, Card, CardContent, Grid } from '@mui/material';

const BeerDetails = () => {
  const { id } = useParams(); // Obtener el ID de la URL
  const [beer, setBeer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

    fetchBeerDetails();
  }, [id]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Card style={{ backgroundColor: '#F59A23', margin: '20px' }}>
      <CardContent>
        <Typography variant="h4" style={{ color: '#FFF' }}>
          {beer.name}
        </Typography>
        <Typography variant="h6" style={{ color: '#FFF' }}>
          Brand: {beer.brand.name}
        </Typography>
        <Typography variant="h6" style={{ color: '#FFF' }}>
          Brewery: {beer.brand.brewery.name} {/* Mostrar la cervecería a través de la marca */}
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
      </CardContent>
    </Card>
  );
};

export default BeerDetails;
