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

const UserNavBar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isTabletOrMobile = useMediaQuery(theme.breakpoints.down("md"));

  const toggleDrawer = (open) => () => {
    setDrawerOpen(open);
  };

  const navItems = [
    { text: "Home", path: "/" },
    { text: "Registration", path: "/registration-form" },
    { text: "Appointment", path: "/appointment-booking" },
    { text: "Medical", path: "/medical" },
  ];

  return (
    <>
      <style>
        {`
          /* Underline animation */
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

          /* Gradient animation (for drawer background) */
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }
        `}
      </style>

      <AppBar
        position="sticky"
        elevation={4}
        sx={{
          backgroundColor: "#ffffff",
          color: "black",
          borderRadius: { md: "16px" },
          mx: { md: "auto" },
          mt: { md: 1 },
          maxWidth: { md: "1150px" },
          transition: "all 0.3s ease",
        }}
      >
        <Toolbar>
          {/* Logo */}
          <Box sx={{ display: "flex", alignItems: "center", flexGrow: 1 }}>
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

          {/* Mobile Drawer */}
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
                    background:
                      "linear-gradient(to bottom right, #f5f5f5, #e0f2f1, #f5f5f5)",
                    backgroundSize: "200% 200%",
                    animation: "gradientMove 8s ease infinite",
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
            /*  Desktop Nav Buttons */
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

export default UserNavBar;
