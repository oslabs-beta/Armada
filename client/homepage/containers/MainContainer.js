import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CountsContainer from './CountsContainer';
import StatusContainer from './StatusContainer';
import CriticalPodsContainer from './CriticalPodsContainer';
import CriticalNodesContainer from './CriticalNodesContainer';
import UtilizationContainer from './UtilizationContainer';
import Refresh from '../components/Refresh';
import { Grid } from '@mui/material';
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
  const [mode, setMode] = useState('production');
  const [selectedState, setSelectedState] = useState({
    pods: pods,
    deployments: deployments,
    services: services,
    namespace: 'All',
  });

  const getClusterConfig = () => {
    console.log('get cluster config called');
    fetch('/api/connect')
      .then((data) => data.json())
      .then((data) => console.log(data))
      .catch((error) => console.log(error));
  };

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
        fetchPromMetrics(data);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    handleLoad();
  }, []);

  useEffect(() => {
    filterByNamespace();
  }, [namespace, pods, nodes, services, deployments, promMetrics]);

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

  function handleLoad() {
    getClusterConfig();
    getNodeList();
    getDeploymentsList();
    getPodsList();
    getServicesList();
    getPromMetrics();
    filterByNamespace();
  }

  return (
    <Grid container spacing={1}>
      <Grid
        container
        item
        xs={12}
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
        direction='row'
        justifyContent='space-evenly'
      >
        <CriticalPodsContainer namespace={namespace} />
      </Grid>
      <Grid
        container
        item
        xs={12}
        direction='row'
        justifyContent='space-evenly'
      >
        <CriticalNodesContainer promMetrics={promMetrics} nodes={nodes} />
      </Grid>
      <Grid
        container
        item
        xs={12}
        direction='row'
        justifyContent='space-evenly'
      >
        <UtilizationContainer />
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
