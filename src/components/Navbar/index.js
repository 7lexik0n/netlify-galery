import React from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import LandscapeIcon from "@mui/icons-material/Landscape";

const Navbar = () => (
  <Box sx={{ flexGrow: 1 }}>
    <AppBar position="static">
      <Toolbar>
        <LandscapeIcon fontSize="large" sx={{ mr: 2 }} />
        <Typography variant="h5" component="h1">
          React Galery
        </Typography>
      </Toolbar>
    </AppBar>
  </Box>
);

export default Navbar;
