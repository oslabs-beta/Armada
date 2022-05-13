import React from 'react';
import { Grid } from '@mui/material';
import NodesCount from '../components/Counts/NodesCount';
import DeploymentsCount from '../components/Counts/DeploymentsCount';
import PodsCount from '../components/Counts/PodsCount';
import ServicesCount from '../components/Counts/ServicesCount';

const CountsContainer = (props) => {
  const { nodes, deployments, pods, services } = props;
  return (
    <Grid container spacing={2}>
      <Grid item sm={3}>
        <NodesCount nodes={nodes} />
      </Grid>
      <Grid item sm={3}>
        <DeploymentsCount deployments={deployments} />
      </Grid>
      <Grid item sm={3}>
        <PodsCount pods={pods} />
      </Grid>
      <Grid item sm={3}>
        <ServicesCount services={services} />
      </Grid>
    </Grid>
  );
};

export default CountsContainer;
