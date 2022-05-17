import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import NodesStatus from '../components/Statuses/NodesStatus';
import PodsStatus from '../components/Statuses/PodsStatus';
import ServicesStatus from '../components/Statuses/ServicesStatus';

const StatusContainer = (props) => {
  const { nodes, pods, services } = props;

  return (
    // <div className='statusContainer'>
    <Grid container spacing={1}>
      <Grid item sm={4}>
        <NodesStatus nodes={nodes} />
      </Grid>
      <Grid item sm={4}>
        <PodsStatus pods={pods} />
      </Grid>
      <Grid item sm={4}>
        <ServicesStatus services={services} />
      </Grid>
    </Grid>
    // </div>
  );
};

export default StatusContainer;