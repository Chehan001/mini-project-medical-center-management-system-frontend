import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
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

const UserNavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  
  // Changed breakpoint to 'md' to include tablets
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down('md'));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navItems = [
    { text: 'Home', path: '/' },
    { text: 'Registration', path: '/registration-form' },
    { text: 'Channel', path: '/channel' },
    { text: 'Medical', path: '/medical' },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={3}
      sx={{
        backgroundColor: '#ffffff',
        color: 'black',
        ...( !isTabletOrMobile && {
          marginTop: '10px',
          borderRadius: '12px',
          maxWidth: '1100px',
          mx: 'auto',
        })
      }}
    >
      <Toolbar>
        {/* Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img
            src="/medicare_logo.png"
            alt="MediCare Logo"
            style={{ height: '50px', objectFit: 'contain', marginRight: '10px' }}
          />
        </Box>

        {isTabletOrMobile ? (
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
                sx={{ width: 220 }}
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

export default UserNavBar;
