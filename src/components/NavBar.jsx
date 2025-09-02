import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navItems = [
    { text: 'Home', path: '/' },
    { text: 'About', path: '/about' },
    { text: 'Channel', path: '/channel' },
    { text: 'Login', path: '/login' },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={3}
      sx={{
        backgroundColor: '#ffffff', // White navbar background
        color: 'black',             // Black text
        ...( !isMobile && {
          marginTop: '10px',
          borderRadius: '12px',
          maxWidth: '1100px',
          mx: 'auto',
        })
      }}
    >
      <Toolbar>
        {/* Logo + Text */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img
            src="/medicare_logo.png" // <-- fixed path
            alt=""
            style={{ height: '50px', objectFit: 'contain', marginRight: '10px' }}
          />
      
        </Box>

        {isMobile ? (
          <>
            <IconButton
              edge="end"
              onClick={toggleDrawer(true)}
              sx={{ color: 'black' }}
            >
              <MenuIcon />
            </IconButton>

            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
            >
              <Box
                sx={{ width: 200 }}
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
              >
                <List>
                  {navItems.map((item) => (
                    <ListItem
                      button
                      key={item.text}
                      component={Link}
                      to={item.path}
                    >
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          sx: {
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            color: 'black',
                          }
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Drawer>
          </>
        ) : (
          <Box>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                to={item.path}
                sx={{
                  fontWeight: 'bold',
                  fontSize: '1.1rem',
                  color: 'black',
                  mx: 1,
                }}
              >
                {item.text}
              </Button>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
