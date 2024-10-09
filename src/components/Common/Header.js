import { Menu as MenuIcon } from "@mui/icons-material";
import { AppBar, Button, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";

export default function Header() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={handleMenuOpen}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component={RouterLink} to="/" sx={{ flexGrow: 1, textDecoration: "none", color: "inherit" }}>
          Book System
        </Typography>
        <Button color="inherit" component={RouterLink} to="/">
          Best seller
        </Button>
        <Button color="inherit" component={RouterLink} to="/create-book">
          Create Book
        </Button>
        <Button color="inherit" component={RouterLink} to="/show-book">
          Show Book
        </Button>
      </Toolbar>

      {/* Mobile Menu */}
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        keepMounted
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem component={RouterLink} to="/" onClick={handleMenuClose}>
          Best seller
        </MenuItem>
        <MenuItem component={RouterLink} to="/create-book" onClick={handleMenuClose}>
          Create Book
        </MenuItem>
        <MenuItem component={RouterLink} to="/show-book" onClick={handleMenuClose}>
          Show Book
        </MenuItem>
      </Menu>
    </AppBar>
  );
}
