import React from 'react';
import { ListItemButton, List, Typography, ListItemText } from '@mui/material';

function ProblematicItem({ name, conditions }) {
  const conditionsText = () => {
    return conditions
      .sort(
        (a, b) =>
          Date.parse(a.lastTransitionTime) - Date.parse(b.lastTransitionTime)
      )
      .map((c) => (
        <Typography ml={1} variant='body2' key={c.type}>{`${c.type}: ${
          c.status
        } at ${c.lastTransitionTime.toString()}`}</Typography>
      ));
  };

  return (
    <List component='div' disablePadding>
      <ListItemButton sx={{ pl: 4 }}>
        <ListItemText
          primary={name}
          secondary={conditions ? conditionsText() : null}
        />
      </ListItemButton>
    </List>
  );
}

export default ProblematicItem;
