import React, { useState, useEffect } from 'react';
import { Box, CircularProgress, Alert } from '@mui/material';
import DeviceCard from './DeviceCard';
import LocationTabs from './LocationsTabs';
import RoomDrawer from './RoomDrawer';
import Grid from '@mui/material/Grid2';

const DeviceDashboard = () => {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [selectedRoom, setSelectedRoom] = useState('');

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
        const response = await fetch('http://localhost:8080/devices');
        const data = await response.json();
        setDevices(data);
        
        if (data.length > 0) {
          setSelectedLocation(data[0].locationName);
          setSelectedRoom(data[0].roomName);
        }
      } catch (err) {
        setError('Failed to fetch devices');
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  const handleLocationChange = (newLocation) => {
    setSelectedLocation(newLocation);
    const firstRoom = groupedLocations
      .find(l => l.name === newLocation)
      ?.rooms[0]?.[0]?.roomName;
    setSelectedRoom(firstRoom || '');
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

  if (loading) return <CircularProgress sx={{ mt: 4 }} />;
  if (error) return <Alert severity="error">{error}</Alert>;

  const currentLocation = groupedLocations.find(l => l.name === selectedLocation);
  const rooms = currentLocation ? Object.entries(currentLocation.rooms) : [];

  return (
    <Box sx={{ display: 'flex' }}>
      <LocationTabs
        locations={groupedLocations}
        selectedLocation={selectedLocation}
        onLocationChange={handleLocationChange}
      />

      <RoomDrawer
        rooms={rooms}
        selectedRoom={selectedRoom}
        onRoomSelect={setSelectedRoom}
      />

      <Box sx={{ 
        flexGrow: 1,
        p: 3,
        marginLeft: '240px',
        marginTop: '64px'
      }}>
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
      </Box>
    </Box>
  );
};

export default DeviceDashboard;