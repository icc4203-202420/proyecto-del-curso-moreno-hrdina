import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Grid, Card, CardContent, Typography, CircularProgress, Alert } from '@mui/material';

const Events = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      setError(null); // Reset error state
      try {
        const response = await axios.get('http://localhost:3001/api/v1/events'); // Ajusta la URL si es necesario
        setEvents(response.data);
      } catch (error) {
        console.error('Error fetching events:', error);
        setError('Failed to load events. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        All Events
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Grid container spacing={2}>
          {events.length > 0 ? (
            events.map((event) => (
              <Grid item xs={12} sm={6} md={4} key={event.id}>
                <Card style={{ backgroundColor: '#A36717' }}>
                  <CardContent>
                    <Typography variant="h6" style={{ color: '#FFF' }}>
                      {event.name}
                    </Typography>
                    <Typography color="textSecondary" style={{ color: '#FFF' }}>
                      Date: {event.date}
                    </Typography>
                    <Typography color="textSecondary" style={{ color: '#FFF' }}>
                      Bar: {event.bar.name}
                    </Typography>
                    <Typography color="textSecondary" style={{ color: '#FFF' }}>
                      Location: {event.location} {/* Suponiendo que 'location' esté en la respuesta del evento */}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography variant="body1" align="center">No events found.</Typography>
          )}
        </Grid>
      )}
    </div>
  );
};

export default Events;
