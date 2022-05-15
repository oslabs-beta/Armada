import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CountsContainer from './CountsContainer';
import StatusContainer from './StatusContainer';
import CriticalPodsContainer from './CriticalPodsContainer';
import CriticalNodesContainer from './CriticalNodesContainer';
import { Grid } from '@mui/material';
import { fetchNodesList, fetchPodsList } from '../../actions/actions';
import demoNodeList from '../../demoData/nodeList.json';

const MainContainer = (props) => {
  const [mode, setMode] = useState('production');
  const [nodes, setNodes] = useState([]);
  const [deployments, setDeployments] = useState({});
  const [pods, setPods] = useState([]);
  const [services, setServices] = useState({});
  const [promMetrics, setPromMetrics] = useState({});

  const getNodeList = () => {
    if (mode === 'demo') {
      console.log(demoNodeList.response.body.items);
      props.fetchNodesList(demoNodeList.response.body.items);
    } else {
      fetch('/api/nodesList')
        .then((data) => data.json())
        .then((data) => {
          console.log(data);
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
        // console.log('deployment list refetched');
      })
      .catch((error) => console.log(error));
  };

  const getPodsList = () => {
    fetch('/api/podsList')
      .then((data) => data.json())
      .then((data) => {
        setPods(data);
        props.fetchPodsList(data);
        // console.log('pod list refetched');
      })
      .catch((error) => console.log(error));
  };

  const getServicesList = () => {
    fetch('/api/servicesList')
      .then((data) => data.json())
      .then((data) => {
        setServices(data);
        console.log('services list refetched');
      })
      .catch((error) => console.log(error));
  };

  const getPromMetrics = () => {
    let now = new Date();
    let nowCopy = new Date(now.getTime());
    nowCopy.setHours(nowCopy.getHours() - 24);
    let endDateTime = now.toISOString();
    console.log('endDateTime', endDateTime);
    let startDateTime = nowCopy.toISOString();
    console.log('startDateTime', startDateTime);

    let step = '30m';
    fetch(
      `/api/prometheus/homepage?startDateTime=${startDateTime}&endDateTime=${endDateTime}&step=${step}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log('data in getPromMetrics', data.bytesTransmittedPerNode);
        // console.log('data', data);
        setPromMetrics(data);
        console.log('prom metrics refetched');
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

  const Refresh = (props) => {
    const [timestamp, setTimestamp] = useState(new Date().toString());

    function setTime() {
      console.log('set time called');
      let time = new Date();
      time = time.toString();
      getNodeList();
      getDeploymentsList();
      getPodsList();
      getServicesList();
      getPromMetrics();
      setTimestamp(time);
    }

    return (
      <span>
        <p className='timestamp'>
          Last updated at {timestamp}{' '}
          <button className='refreshButton' onClick={setTime}>
            <span className='material-icons'>refresh</span>
          </button>
        </p>
      </span>
    );
  };

  return (
    <Grid container spacing={1}>
      <Grid
        container
        item
        xs={12}
        direction='row'
        justifyContent='space-evenly'
      >
        <div>MainContainer</div>
        <Refresh></Refresh>
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
      <Grid
        container
        item
        xs={12}
        direction='row'
        justifyContent='space-evenly'
      >
        <StatusContainer pods={pods} services={services} />
      </Grid>

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
        {/* {nodes.length > 0 && ( */}
        <CriticalNodesContainer promMetrics={promMetrics} nodes={nodes} />
        {/* )} */}
      </Grid>
    </Grid>
  );
};

export default connect(null, { fetchNodesList, fetchPodsList })(MainContainer);
