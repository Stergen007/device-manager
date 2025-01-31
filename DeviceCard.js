import React, { useState, useRef } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  IconButton,
  Typography,
  LinearProgress,
  Snackbar
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const DeviceCard = ({ device, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const fileInputRef = useRef(null);

  const handleEditClick = () => fileInputRef.current.click();

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setLoading(true);
      const base64 = await convertToBase64(file);
      await onUpdate(device.id, base64);
    } catch (err) {
      setError('Failed to update image');
    } finally {
      setLoading(false);
      fileInputRef.current.value = '';
    }
  };

  const convertToBase64 = (file) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  return (
    <Card sx={{ position: 'relative' }}>
      {loading && <LinearProgress sx={{ position: 'absolute', top: 0, width: '100%' }} />}
      
      <div style={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="200"
          image={device.imageUrl}
          alt={device.deviceName}
          sx={{ opacity: loading ? 0.5 : 1 }}
        />
        
        <IconButton
          sx={{ position: 'absolute', top: 8, right: 8, bgcolor: 'background.paper' }}
          onClick={handleEditClick}
          disabled={loading}
        >
          <EditIcon />
        </IconButton>
      </div>

      <input
        type="file"
        hidden
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileChange}
      />

      <CardContent>
        <Typography variant="h6">{device.deviceName}</Typography>
        <Typography color="textSecondary">{device.roomName}</Typography>
      </CardContent>

      <Snackbar
        open={!!error}
        autoHideDuration={6000}
        onClose={() => setError('')}
        message={error}
      />
    </Card>
  );
};

export default DeviceCard;