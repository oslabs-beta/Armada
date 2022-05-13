import React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
function ProblematicItem({ item }) {
  return (
    <List component='div' disablePadding>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemText primary={item} />
      </ListItemButton>
    </List>
  );
}

export default ProblematicItem;
