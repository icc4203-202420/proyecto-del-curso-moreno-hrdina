import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Beers from './components/Beers';
import Bars from './components/Bars';
import Events from './components/Events';
import SearchUsers from './components/SearchUsers';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/beers" element={<Beers />} />
        <Route path="/bars" element={<Bars />} />
        <Route path="/bars/:id/events" element={<Events />} />
        <Route path="/search-users" element={<SearchUsers />} />
      </Routes>
    </Router>
  );
}

export default App;