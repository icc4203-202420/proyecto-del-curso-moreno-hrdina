import { useState } from 'react';
import { Slider, TextField, Button } from '@mui/material';
import useAxios from 'axios-hooks';

const submitReview = (beerId, reviewData) => {
  const [{ loading, error }, execute] = useAxios(
    {
      url: `/api/v1/beers/${beerId}/reviews`,
      method: 'POST',
      data: reviewData,
    },
    { manual: true }
  );
  return execute();
};

const ReviewForm = ({ beerId, onSubmit }) => {
  const [rating, setRating] = useState(3);
  const [text, setText] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = () => {
    if (text.split(' ').length < 15) {
      setError('Your comment is too short!');
      return;
    }
    onSubmit({ rating, text });
  };

  return (
    <div>
      <h3>Review Beer</h3>
      <Slider value={rating} min={1} max={5} step={0.1} onChange={(e, newValue) => setRating(newValue)} />
      <TextField label="Comment" value={text} onChange={(e) => setText(e.target.value)} multiline rows={4} />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button onClick={handleSubmit}>Send Review</Button>
    </div>
  );
};
