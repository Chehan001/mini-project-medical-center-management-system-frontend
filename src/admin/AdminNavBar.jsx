import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, useLocation } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const AdminNavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();

  const toggleDrawer = (open) => () => setDrawerOpen(open);

  const navItems = [
    { text: "Students", path: "/admin/students" },
    { text: "Appointments", path: "/admin/appointments" },
    { text: "CheckUp ", path: "/admin/entries" }, // 
  ];

  return (
    <AppBar
      position="sticky"
      elevation={4}
      sx={{
        backgroundColor: "#ffffff",
        color: "black",
        transition: "0.3s ease-in-out",
        ...(!isMobile && {
          marginTop: "10px",
          borderRadius: "12px",
          maxWidth: "1100px",
          mx: "auto",
        }),
      }}
    >
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img
            src="/medicare_logo.png"
            alt="MediCare Logo"
            style={{
              height: "50px",
              objectFit: "contain",
              marginRight: "10px",
            }}
          />
        </Box>

        {/* Navigation for Desktop to  Drawer for Mobile */}
        {isMobile ? (
          <>
            {/* Mobile Menu Button */}
            <IconButton
              edge="end"
              onClick={toggleDrawer(true)}
              sx={{
                color: "black",
                transition: "0.3s",
                "&:hover": { color: "#1f8f7e", transform: "scale(1.1)" },
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Drawer Menu */}
            <Drawer
              anchor="right"
              open={drawerOpen}
              onClose={toggleDrawer(false)}
              PaperProps={{
                sx: {
                  borderRadius: "0 0 0 12px",
                  width: 220,
                  backgroundColor: "#fdfdfd",
                },
              }}
            >
              <Box
                role="presentation"
                onClick={toggleDrawer(false)}
                onKeyDown={toggleDrawer(false)}
                sx={{ p: 2 }}
              >
                <List>
                  {navItems.map((item) => (
                    <ListItem
                      key={item.text}
                      component={Link}
                      to={item.path}
                      button
                      sx={{
                        borderRadius: "8px",
                        mb: 1,
                        backgroundColor:
                          location.pathname === item.path
                            ? "#e0f7f1"
                            : "transparent",
                        transition: "0.3s",
                        "&:hover": { backgroundColor: "#f0f0f0" },
                      }}
                    >
                      <ListItemText
                        primary={item.text}
                        primaryTypographyProps={{
                          sx: {
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                            color: "black",
                          },
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
                <Divider sx={{ my: 1 }} />
              </Box>
            </Drawer>
          </>
        ) : (
          // Desktop Menu
          <Box>
            {navItems.map((item) => (
              <Button
                key={item.text}
                component={Link}
                to={item.path}
                sx={{
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  color:
                    location.pathname === item.path ? "#1f8f7e" : "black",
                  mx: 1,
                  borderRadius: "8px",
                  transition: "0.3s",
                  "&:hover": {
                    backgroundColor: "#f0f0f0",
                    transform: "scale(1.05)",
                  },
                  ...(location.pathname === item.path && {
                    borderBottom: "2px solid #1f8f7e",
                  }),
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
