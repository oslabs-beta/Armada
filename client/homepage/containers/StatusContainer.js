import React, { useState, useEffect } from 'react';
import { Grid, Box } from '@mui/material';
import NodesStatus from '../components/Statuses/NodesStatus';
import PodsStatus from '../components/Statuses/PodsStatus';
import ServicesStatus from '../components/Statuses/ServicesStatus';

const StatusContainer = (props) => {
  const { nodes, pods, services } = props;

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        <NodesStatus nodes={nodes} />
      </Grid>
      <Grid item xs={12} sm={6}>
        <PodsStatus pods={pods} />
      </Grid>
    </Grid>
  );
};

export default StatusContainer;
