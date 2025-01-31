import React from 'react';
import { Drawer, List, ListItem, ListItemText } from '@mui/material';

const RoomDrawer = ({ rooms, selectedRoom, onRoomSelect }) => (
  <Drawer
    variant="permanent"
    sx={{
      width: 240,
      flexShrink: 0,
      '& .MuiDrawer-paper': {
        width: 240,
        boxSizing: 'border-box',
        top: '64px'
      }
    }}
  >
    <List>
      {rooms.map(([roomName, devices]) => (
        <ListItem
          button
          key={roomName}
          selected={roomName === selectedRoom}
          onClick={() => onRoomSelect(roomName)}
        >
          <ListItemText 
            primary={roomName} 
            secondary={`${devices.length} devices`}
          />
        </ListItem>
      ))}
    </List>
  </Drawer>
);

export default RoomDrawer;