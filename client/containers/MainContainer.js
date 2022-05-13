import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CountsContainer from './CountsContainer';
import StatusContainer from './StatusContainer';
import CriticalPodsContainer from './CriticalPodsContainer';
import CriticalNodesContainer from './CriticalNodesContainer';
import { Grid } from '@mui/material';
import { fetchNodesList } from '../actions/actions';
// const fs = require('fs');
const demoNodeList = '../demoData.nodeList.json';

const MainContainer = (props) => {
  const [mode, setMode] = useState('production');
  const [nodes, setNodes] = useState([]);
  const [deployments, setDeployments] = useState({});
  const [pods, setPods] = useState([]);
  const [services, setServices] = useState({});
  const [promMetrics, setPromMetrics] = useState({});

  // setMode('demo');

  const getNodeList = () => {
    if (mode === 'demo') {
      const nodeList = JSON.parse(fs.readFileSync(demoNodeList));
      console.log(nodeList);
    } else {
      fetch('/api/nodesList')
        .then((data) => data.json())
        .then((data) => {
          // console.log(data);
          setNodes(data);
          props.fetchNodesList(data);
        })
        .catch((error) => console.log(error));
    }
  };

  const getDeploymentsList = () => {
    fetch('/api/deploymentsList')
      .then((data) => data.json())
      .then((data) => {
        setDeployments(data);
      })
      .catch((error) => console.log(error));
  };

  const getPodsList = () => {
    fetch('/api/podsList')
      .then((data) => data.json())
      .then((data) => {
        setPods(data);
      })
      .catch((error) => console.log(error));
  };

  const getServicesList = () => {
    fetch('/api/servicesList')
      .then((data) => data.json())
      .then((data) => {
        setServices(data);
      })
      .catch((error) => console.log(error));
  };

  const getPromMetrics = () => {
    let startDateTime = '2022-05-11T15:00:00.000Z';
    let endDateTime = '2022-05-12T15:00:00.000Z';
    let step = '30m';
    fetch(
      `/api/prometheus/metrics?startDateTime=${startDateTime}&endDateTime=${endDateTime}&step=${step}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log('data in getPromMetrics', data.bytesTransmittedPerNode);
        // console.log('data', data);
        setPromMetrics(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getNodeList();
    getDeploymentsList();
    getPodsList();
    getServicesList();
    getPromMetrics();
  }, []);

  return (
    <Grid container spacing={1}>
      <Grid item xs={12}>
        <div>MainContainer</div>
      </Grid>
      <Grid
        container
        item
        xs={12}
        direction='row'
        justifyContent='space-evenly'
      >
        <CountsContainer
          nodes={nodes}
          deployments={deployments}
          pods={pods}
          services={services}
        />
      </Grid>
      {nodes.length > 0 && (
        <Grid
          container
          item
          xs={12}
          direction='row'
          justifyContent='space-evenly'
        >
          <StatusContainer nodes={nodes} pods={pods} services={services} />
        </Grid>
      )}
      <Grid
        container
        item
        xs={12}
        direction='row'
        justifyContent='space-evenly'
      >
        <CriticalPodsContainer metrics={promMetrics} />
      </Grid>
      <Grid
        container
        item
        xs={12}
        direction='row'
        justifyContent='space-evenly'
      >
        {nodes.length > 0 && (
          <CriticalNodesContainer promMetrics={promMetrics} nodes={nodes} />
        )}
      </Grid>
    </Grid>
  );
};

export default connect(null, { fetchNodesList })(MainContainer);
