import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import Beers from './Beers';
import Bars from './Bars';
import Events from './Events';
import SearchUsers from './Users';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/beers" element={<Beers />} />
        <Route path="/bars" element={<Bars />} />
        <Route path="/bars/:id/events" element={<Events />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}

export default App;