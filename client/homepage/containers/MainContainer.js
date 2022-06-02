import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CountsContainer from './CountsContainer';
import StatusContainer from './StatusContainer';
import ProblematicContainer from './ProblematicContainer';
import CriticalPodsContainer from './CriticalPodsContainer';
import CriticalNodesContainer from './CriticalNodesContainer';
import UtilizationContainer from './UtilizationContainer';
import Refresh from '../components/Refresh';
import { Grid } from '@mui/material';
import { Alert, AlertTitle } from '@mui/material';
import {
  fetchNodesList,
  fetchPodsList,
  fetchServicesList,
  fetchDeploymentsList,
  fetchPromMetrics,
  setNamespace,
} from '../../actions/actions';
import demoNodeList from '../../demoData/nodeList.json';

const MainContainer = (props) => {
  const {
    namespace,
    pods,
    deployments,
    services,
    promMetrics,
    nodes,
    fetchNodesList,
    fetchPodsList,
    fetchServicesList,
    fetchDeploymentsList,
    fetchPromMetrics,
    lastUpdated,
  } = props;
  const [promConnect, setPromConnect] = useState(false);
  const [mode, setMode] = useState('production');
  const [selectedState, setSelectedState] = useState({
    pods: pods,
    deployments: deployments,
    services: services,
    namespace: 'All',
  });

  const getNodeList = () => {
    if (mode === 'demo') {
      fetchNodesList(demoNodeList.response.body.items);
    } else {
      fetch('/api/nodesList')
        .then((data) => data.json())
        .then((data) => {
          fetchNodesList(data);
        })
        .catch((error) => console.log(error));
    }
  };

  const getDeploymentsList = () => {
    fetch('/api/deploymentsList')
      .then((res) => res.json())
      .then((data) => {
        fetchDeploymentsList(data);
      })
      .catch((error) => console.log(error));
  };

  const getPodsList = () => {
    fetch('/api/podsList')
      .then((data) => data.json())
      .then((data) => {
        fetchPodsList(data);
      })
      .catch((error) => console.log(error));
  };

  const getServicesList = () => {
    fetch('/api/servicesList')
      .then((data) => data.json())
      .then((data) => {
        fetchServicesList(data);
      })
      .catch((error) => console.log(error));
  };

  const checkProm = () => {
    fetch(`/api/prometheus/up`)
      .then((res) => res.json())
      .then((data) => {
        if (!data.hasOwnProperty('err')) {
          setPromConnect(true);
        }
      })
      .catch((err) => setPromConnect(false));
  };
  const getPromMetrics = () => {
    let now = new Date();
    let nowCopy = new Date(now.getTime());
    nowCopy.setHours(nowCopy.getHours() - 24);
    let endDateTime = now.toISOString();
    let startDateTime = nowCopy.toISOString();

    let step = '30m';
    fetch(
      `/api/prometheus/homepage?startDateTime=${startDateTime}&endDateTime=${endDateTime}&step=${step}`
    )
      .then((res) => res.json())
      .then((data) => {
        if (!data.hasOwnProperty(err)) {
          // setPromConnect(true);
          fetchPromMetrics(data);
        }
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    checkProm();
    handleLoad();
  }, []);

  useEffect(() => {
    filterByNamespace();
  }, [namespace, pods, nodes, services, deployments, promMetrics]);

  // Filters homepage by namesapce
  function filterByNamespace() {
    if (namespace === 'All' || namespace === '') {
      setSelectedState({
        ...selectedState,
        namespace: 'All',
        pods: pods,
        deployments: deployments,
        services: services,
      });
    } else {
      setSelectedState({
        ...selectedState,
        namespace: namespace,
        pods: pods.filter((pod) => pod.metadata.namespace === namespace),
        deployments: deployments.filter(
          (deployment) => deployment.metadata.namespace === namespace
        ),
        services: services.filter(
          (service) => service.metadata.namespace === namespace
        ),
      });
    }
  }

  // Separated to pass down to Refresh component
  function handleLoad() {
    getNodeList();
    getDeploymentsList();
    getPodsList();
    getServicesList();
    getPromMetrics();
    filterByNamespace();
  }
  console.log('promConnect', promConnect);
  return (
    <Grid container spacing={2}>
      {!promConnect && (
        <Alert severity='error'>
          <AlertTitle>Error</AlertTitle>
          Prometheus connection failed.
        </Alert>
      )}
      <Grid
        container
        item
        xs={12}
        sm={12}
        md={12}
        justifyContent='flex-end'
        alignItems='flex-end'
        mb={4}
      >
        <Refresh handleRefresh={handleLoad} lastUpdated={lastUpdated} />
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={12}
        md={12}
        direction='row'
        justifyContent='center'
      >
        {promConnect && <UtilizationContainer />}
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={12}
        md={12}
        direction='row'
        justifyContent='space-evenly'
      >
        <CountsContainer
          nodes={nodes}
          deployments={selectedState.deployments}
          pods={selectedState.pods}
          services={selectedState.services}
        />
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={12}
        md={12}
        direction='row'
        justifyContent='space-evenly'
      >
        <StatusContainer
          pods={selectedState.pods}
          services={selectedState.services}
        />
      </Grid>

      <Grid
        container
        item
        xs={12}
        sm={12}
        md={12}
        direction='row'
        justifyContent='space-evenly'
      >
        <ProblematicContainer />
      </Grid>

      <Grid
        container
        item
        xs={12}
        sm={12}
        md={12}
        direction='row'
        justifyContent='space-evenly'
      >
        {promConnect && <CriticalPodsContainer namespace={namespace} />}
      </Grid>
      <Grid
        container
        item
        xs={12}
        sm={12}
        md={12}
        direction='row'
        justifyContent='space-evenly'
      >
        {promConnect && (
          <CriticalNodesContainer promMetrics={promMetrics} nodes={nodes} />
        )}
      </Grid>
    </Grid>
  );
};

const mapStateToProps = ({
  namespace,
  nodes,
  pods,
  services,
  deployments,
  promMetrics,
}) => {
  return {
    namespace: namespace.selectedNamespace,
    nodes: nodes.items,
    pods: pods.items,
    services: services.items,
    deployments: deployments.items,
    promMetrics: promMetrics.items,
    lastUpdated: pods.lastUpdated,
  };
};

export default connect(mapStateToProps, {
  fetchNodesList,
  fetchPodsList,
  fetchDeploymentsList,
  fetchServicesList,
  fetchPromMetrics,
  setNamespace,
})(MainContainer);
