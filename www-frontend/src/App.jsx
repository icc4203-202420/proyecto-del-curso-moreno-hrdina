import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItem, ListItemText, ListItemIcon, BottomNavigation, BottomNavigationAction, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import LocalDrinkIcon from '@mui/icons-material/LocalDrink';
import SearchIcon from '@mui/icons-material/Search';
import Home from './components/Home';
import Beers from './components/Beers';
import BeersDetails from './components/BeersDetails';
import Bars from './components/Bars';
import Events from './components/Events';
import SearchUser from './components/Users';
import LoginForm from './components/Login';   // Archivos a crear
import Signup from './components/Signup';     // Archivos a crear

function App() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Router>
      <AppBar position="fixed">
        <Toolbar
          sx={{ 
            backgroundColor: '#F59A23', // Cambia el color de fondo aquí
            color: 'white', // Cambia el color del texto aquí
            display: 'flex',
            justifyContent: 'space-between' // Espacia los elementos
          }}
        >
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            BeerApp
          </Typography>
          <Button
            color="inherit"
            component={Link}
            to="/login"
          >
            Log In
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={drawerOpen}
        onClose={toggleDrawer}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        <List>
          <ListItem button component={Link} to="/" onClick={toggleDrawer}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem button component={Link} to="/beers" onClick={toggleDrawer}>
            <ListItemIcon>
              <LocalDrinkIcon />
            </ListItemIcon>
            <ListItemText primary="Beers" />
          </ListItem>
          <ListItem button component={Link} to="/bars" onClick={toggleDrawer}>
            <ListItemIcon>
              <LocalBarIcon />
            </ListItemIcon>
            <ListItemText primary="Bars" />
          </ListItem>
          <ListItem button component={Link} to="/search-user" onClick={toggleDrawer}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search User" />
          </ListItem>
        </List>
      </Drawer>
      <Toolbar /> {/* This empty toolbar is necessary to offset the content below the AppBar */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/beers" element={<Beers />} />
        <Route path="/beers/:id" element={<BeersDetails />} />
        <Route path="/bars" element={<Bars />} />
        <Route path="/events" element={<Events />} />
        <Route path="/search-user" element={<SearchUser />} />
        <Route path="/login" element={<LoginForm />} /> {/* Ruta para Login */}
        <Route path="/signup" element={<Signup />} /> {/* Ruta para Signup */}
      </Routes>
      <BottomNavigation
        sx={{ width: '100%', position: 'fixed', bottom: 0, backgroundColor: '#F59A23' }}
        showLabels
      >
        <BottomNavigationAction
          component={Link}
          to="/beers"
          label="Beers"
          icon={<LocalDrinkIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/bars"
          label="Bars"
          icon={<LocalBarIcon />}
        />
        <BottomNavigationAction
          component={Link}
          to="/events"
          label="Events"
          icon={<SearchIcon />}
        />
      </BottomNavigation>
    </Router>
  );
}

export default App;
