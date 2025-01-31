import React from 'react';
import { AppBar, Tabs, Tab } from '@mui/material';

const LocationTabs = ({ locations, selectedLocation, onLocationChange }) => (
  <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
    <Tabs value={selectedLocation}>
      {locations.map((location) => (
        <Tab 
          key={location.name}
          label={location.name}
          value={location.name}
          onClick={() => onLocationChange(location.name)}
        />
      ))}
    </Tabs>
  </AppBar>
);

export default LocationTabs;