import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Grid, Card, CardContent, Typography } from '@mui/material';

function BarEvents() {
  const { id } = useParams(); 
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch(`/api/v1/bar/${id}/events`)
      .then(response => response.json())
      .then(data => setEvents(data.events)) 
      .catch(error => console.error('Error fetching events:', error));
  }, [id]);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Events in this Bar
      </Typography>
      <Grid container spacing={4}>
        {events.map((event) => (
          <Grid item xs={12} sm={6} md={4} key={event.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{event.name}</Typography>
                <Typography variant="body2">{event.description}</Typography>
                <Typography variant="body2">
                  Fecha: {new Date(event.date).toLocaleDateString()}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default BarEvents;