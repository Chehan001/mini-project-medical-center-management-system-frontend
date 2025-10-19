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

const AdminNavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  //  Updated path to match your App.jsx route (/admin/students)
  const navItems = [
    { text: 'Student', path: '/admin/students' },
  ];

  return (
    <AppBar
      position="sticky"
      elevation={3}
      sx={{
        backgroundColor: '#ffffff',
        color: 'black',
        ...(!isMobile && {
          marginTop: '10px',
          borderRadius: '12px',
          maxWidth: '1100px',
          mx: 'auto',
        }),
      }}
    >
      <Toolbar>
        {/*  Logo */}
        <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
          <img
            src="/medicare_logo.png"
            alt="MediCare Logo"
            style={{ height: '50px', objectFit: 'contain', marginRight: '10px' }}
          />
        </Box>

        {/* Responsive Menu */}
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
                      key={item.text}
                      component={Link}
                      to={item.path}
                      button="true"
                    >
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          sx: {
                            fontWeight: 'bold',
                            fontSize: '1.2rem',
                            color: 'black',
                          },
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

export default AdminNavBar;
