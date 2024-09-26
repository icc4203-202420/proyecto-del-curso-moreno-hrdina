import React from 'react';
import { Box, Typography, Button } from '@mui/material';

function Gallery({ images, onDelete }) {
  return (
    <Box sx={{ padding: '16px' }}>
      <Typography variant="h6" gutterBottom>
        Event Gallery
      </Typography>
      <Box
        sx={{
          display: 'flex',
          overflowX: 'auto',
          padding: '8px',
          scrollbarWidth: 'thin',
          '&::-webkit-scrollbar': {
            height: '8px',
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#ccc',
            borderRadius: '4px',
          },
        }}
      >
        {images.map((image) => (
          <Box
            key={image.id}
            sx={{
              minWidth: '200px',
              minHeight: '200px',
              marginRight: '8px',
              borderRadius: '8px',
              overflow: 'hidden',
              boxShadow: 2,
              position: 'relative',
            }}
          >
            <img
              src={image.url} // Asegúrate de que tu API devuelve la URL de la imagen
              alt={`Event Picture ${image.id}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
              }}
            />
            <Typography
              variant="caption"
              sx={{
                position: 'absolute',
                bottom: '8px',
                left: '8px',
                color: '#fff',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
                borderRadius: '4px',
                padding: '2px 4px',
              }}
            >
              Uploaded by User ID: {image.user_id}
            </Typography>
            <Button
              variant="contained"
              color="error"
              sx={{ position: 'absolute', top: '8px', right: '8px' }}
              onClick={() => onDelete(image.id)}
            >
              Delete
            </Button>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default Gallery;
