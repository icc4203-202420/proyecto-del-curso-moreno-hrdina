import React, { useState } from 'react';
import { TextField, Button, List, ListItem } from '@mui/material';
import axios from 'axios';

const UserSearch = () => {
  const [handle, setHandle] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const response = await axios.get(`/api/v1/friendships/search`, {
      params: { handle }
    });
    setResults(response.data);
  };

  return (
    <div>
      <TextField
        label="Search by Handle"
        value={handle}
        onChange={(e) => setHandle(e.target.value)}
      />
      <Button onClick={handleSearch}>Search</Button>

      <List>
        {results.map(user => (
          <ListItem key={user.id}>
            {user.handle}
            <Button onClick={() => {/* Logic to send friendship request */}}>Add Friend</Button>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default UserSearch;
