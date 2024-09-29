import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';

const Gallery = () => {
  const { id } = useParams(); // Cambia esto a "id" para que coincida con la ruta
  const [pictures, setPictures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventPictures = async () => {
      const userID = localStorage.getItem("user_id");
      const token = localStorage.getItem("token");

      try {
        const response = await axios.get(`http://localhost:3001/api/v1/events/${id}/event_pictures`, {
          headers: {
            Authorization: `Bearer ${token}`,
            'X-User-ID': userID
          },
        });
        setPictures(response.data);
      } catch (error) {
        console.error('Error fetching event pictures:', error);
        setError('Failed to load gallery. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEventPictures();
  }, [id]);

  return (
    <div>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={2}>
          {pictures.length > 0 ? (
            pictures.map((picture) => (
              <Grid item xs={12} sm={6} md={4} key={picture.id}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">{picture.description}</Typography>
                    <img src={picture.image_url} alt={picture.description} style={{ width: '100%' }} />
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" align="center">
              No pictures found.
            </Typography>
          )}
        </Grid>
      )}
    </div>
  );
};

export default Gallery;
