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
    { text: "CheckUp", path: "/admin/entries" },
  ];

  return (
    <>
      <style>
        {`
          /* Underline animation for desktop buttons */
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
            background-color: #1f8f7e;
            transition: width 0.3s ease;
          }

          .navButton:hover::after {
            width: 100%;
          }

          .navButton:hover {
            color: #1f8f7e;
          }

          /* Gradient background animation for drawer */
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
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          {/*  Logo */}
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

          {/* Mobile Drawer */}
          {isMobile ? (
            <>
              <IconButton
                edge="end"
                onClick={toggleDrawer(true)}
                sx={{
                  color: "#004d40",
                  "&:hover": { color: "#1f8f7e", transform: "scale(1.1)" },
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
                      "linear-gradient(to bottom right, #ffffff, #e0f2f1, #ffffff)",
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
                        key={item.text}
                        component={Link}
                        to={item.path}
                        button
                        sx={{
                          borderRadius: "10px",
                          mb: 1,
                          backgroundColor:
                            location.pathname === item.path
                              ? "rgba(31, 143, 126, 0.1)"
                              : "transparent",
                          transition: "all 0.3s ease",
                          "&:hover": {
                            backgroundColor: "rgba(0, 0, 0, 0.05)",
                            transform: "scale(1.03)",
                          },
                        }}
                      >
                        <ListItemText
                          primary={item.text}
                          primaryTypographyProps={{
                            sx: {
                              fontWeight: "bold",
                              fontSize: "1.1rem",
                              color:
                                location.pathname === item.path
                                  ? "#1f8f7e"
                                  : "#004d40",
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                  <Divider sx={{ my: 1, backgroundColor: "#ddd" }} />
                </Box>
              </Drawer>
            </>
          ) : (
            /* Desktop Navigation */
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
                    color:
                      location.pathname === item.path ? "#1f8f7e" : "#004d40",
                    mx: 1.5,
                    textTransform: "none",
                    borderRadius: "8px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-2px)",
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
    </>
  );
};

export default AdminNavBar;
