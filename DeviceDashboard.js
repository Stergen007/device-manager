import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Alert } from '@mui/material';
import AppBarWithSignout from './AppBarWithSignout';
import RoomDrawer from './RoomDrawer';
import DeviceCard from './DeviceCard';
import Grid from '@mui/material/Grid2';

const DeviceDashboard = ({ token, setToken }) => {
  const navigate = useNavigate();
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');

  // Group devices by location and room
  const groupedLocations = devices.reduce((acc, device) => {
    const location = acc.find(l => l.name === device.locationName);
    if (location) {
      location.rooms[device.roomName] = location.rooms[device.roomName] || [];
      location.rooms[device.roomName].push(device);
    } else {
      acc.push({
        name: device.locationName,
        rooms: { [device.roomName]: [device] }
      });
    }
    return acc;
  }, []);

  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await fetch('/api/devices', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) {
          if (response.status === 401) handleSignOut();
          throw new Error('Failed to fetch devices');
        }

        const data = await response.json();
        setDevices(data);
        
        // Set initial location and room
        if (data.length > 0) {
          setSelectedLocation(data[0].locationName);
          setSelectedRoom(data[0].roomName);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    token && fetchDevices();
  }, [token]);

  const handleSignOut = () => {
    localStorage.removeItem('authToken');
    setToken(null);
    navigate('/login');
  };

  const handleImageUpdate = async (deviceId, newImage) => {
    try {
      await fetch(`http://localhost:8080/device/${deviceId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image: newImage }),
      });

      setDevices(prev => prev.map(device => 
        device.id === deviceId ? { ...device, imageUrl: newImage } : device
      ));
    } catch (err) {
      throw new Error('Image update failed');
    }
  };
  
  const currentLocation = groupedLocations.find(l => l.name === selectedLocation);
  const rooms = currentLocation ? Object.entries(currentLocation.rooms) : [];

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBarWithSignout
        locations={groupedLocations}
        selectedLocation={selectedLocation}
        onLocationChange={(newLocation) => {
          setSelectedLocation(newLocation);
          setSelectedRoom('');
        }}
        onLogout={handleSignOut}
      />

      <RoomDrawer
        rooms={rooms}
        selectedRoom={selectedRoom}
        onRoomSelect={setSelectedRoom}
      />

      <Box component="main" sx={{ 
        flexGrow: 1,
        p: 3,
        marginLeft: '240px',
        marginTop: '64px'
      }}>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Alert severity="error">{error}</Alert>
        ) : (
          <Grid container spacing={3}>
            {rooms.map(([roomName, roomDevices]) => (
              roomName === selectedRoom && roomDevices.map((device) => (
                <Grid item xs={12} sm={6} md={4} key={device.id}>
                  <DeviceCard 
                    device={device}
                    onUpdate={handleImageUpdate}
                  />
                </Grid>
              ))
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default DeviceDashboard;