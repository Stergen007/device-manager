import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Tabs, 
  Tab, 
  IconButton, 
  Menu, 
  MenuItem, 
  Typography,
  Box
} from '@mui/material';
import {
  AccountCircle,
  LogoutOutlined
} from '@mui/icons-material';

const AppBarWithSignout = ({ locations, selectedLocation, onLocationChange, onLogout }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6" sx={{ mr: 4 }}>
          Device Manager
        </Typography>
        
        <Box sx={{ flexGrow: 1 }}>
          <Tabs value={selectedLocation} textColor="inherit">
            {locations.map((location) => (
              <Tab
                key={location.name}
                label={location.name}
                value={location.name}
                onClick={() => onLocationChange(location.name)}
              />
            ))}
          </Tabs>
        </Box>

        <div>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={onLogout}>
              <LogoutOutlined sx={{ mr: 1 }} />
              Sign Out
            </MenuItem>
          </Menu>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default AppBarWithSignout;