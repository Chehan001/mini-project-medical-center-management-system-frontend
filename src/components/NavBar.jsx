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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const NavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navItems = [
    { text: "Home", path: "/" },
    { text: "About", path: "/about" },
    { text: "Channel", path: "/channel" },
    { text: "Login", path: "/login" },
  ];

  return (
    <>
      <style>
        {`
          /*  Underline animation */
          .navButton {
            position: relative;
            overflow: hidden;
            transition: color 0.3s ease;
          }

          .navButton::after {
            content: "";
            position: absolute;
            left: 0;
            bottom: 0;
            width: 0%;
            height: 2px;
            background-color: #00796b;
            transition: width 0.3s ease;
          }

          .navButton:hover::after {
            width: 100%;
          }

          .navButton:hover {
            color: #00796b;
          }
        `}
      </style>

      <AppBar
        position="sticky"
        elevation={3}
        sx={{
          backgroundColor: "#ffffff", 
          color: "black",
          backdropFilter: "blur(8px)",
          borderRadius: { md: "16px" },
          mx: { md: "auto" },
          mt: { md: 1 },
          maxWidth: { md: "1150px" },
          transition: "all 0.3s ease",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.08)", 
        }}
      >
        <Toolbar>
          {/*  Logo only (removed MediCare text) */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
            <img
              src="/medicare_logo.png"
              alt="MediCare Logo"
              style={{
                height: "50px",
                objectFit: "contain",
              }}
            />
          </Box>

          {/*  Mobile Drawer */}
          {isTabletOrMobile ? (
            <>
              <IconButton
                edge="end"
                onClick={toggleDrawer(true)}
                sx={{
                  color: "#004d40",
                  "&:hover": { color: "#00796b", transform: "scale(1.1)" },
                  transition: "all 0.3s ease",
                }}
              >
                <MenuIcon />
              </IconButton>

              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                <Box
                  sx={{
                    width: 220,
                    height: "100%",
                    backgroundColor: "#ffffff",
                    p: 2,
                  }}
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
                        sx={{
                          borderRadius: "10px",
                          "&:hover": {
                            backgroundColor: "rgba(0,0,0,0.05)",
                            transform: "scale(1.02)",
                            transition: "all 0.3s ease",
                          },
                        }}
                      >
                        <ListItemText
                          primary={item.text}
                          primaryTypographyProps={{
                            sx: {
                              fontWeight: "bold",
                              fontSize: "1.1rem",
                              color: "#004d40",
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
            /* Desktop Nav Buttons */
            <Box>
              {navItems.map((item) => (
                <Button
                  key={item.text}
                  component={Link}
                  to={item.path}
                  className="navButton"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1.1rem",
                    color: "#004d40",
                    mx: 1.5,
                    textTransform: "none",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
                    },
                  }}
                >
                  {item.text}
                </Button>
              ))}
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
