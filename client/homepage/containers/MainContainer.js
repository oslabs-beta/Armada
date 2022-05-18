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
  fetchNamespacesList,
  fetchDeploymentsList,
  fetchPromMetrics,
  setNamespace,
} from '../../actions/actions';
import demoNodeList from '../../demoData/nodeList.json';
import Select from 'react-select';

const MainContainer = (props) => {
  const { namespace } = props;
  const [mode, setMode] = useState('production');
  const [nodes, setNodes] = useState([]);
  const [deployments, setDeployments] = useState({});
  const [pods, setPods] = useState([]);
  const [services, setServices] = useState({});
  const [promMetrics, setPromMetrics] = useState({});
  const [namespaces, setNamespaces] = useState([]);
  const [selectedState, setSelectedState] = useState({
    pods: pods,
    deployments: deployments,
    services: services,
    namespace: 'All',
    didUpdate: false,
  });

  const getNodeList = () => {
    if (mode === 'demo') {
      // console.log(demoNodeList.response.body.items);
      props.fetchNodesList(demoNodeList.response.body.items);
    } else {
      fetch('/api/nodesList')
        .then((data) => data.json())
        .then((data) => {
          // console.log('nodes data', data);
          props.fetchNodesList(data);
        })
        .catch((error) => console.log(error));
    }
  };

  const getDeploymentsList = () => {
    fetch('/api/deploymentsList')
      .then((res) => res.json())
      .then((data) => {
        setDeployments(data);
        props.fetchDeploymentsList(data);
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
        props.fetchServicesList(data);
      })
      .catch((error) => console.log(error));
  };

  const getNamespaceList = () => {
    fetch('/api/namespaceList')
      .then((data) => data.json())
      .then((data) => {
        // setNamespaces(data);
        let names = ['All'];
        data.items.forEach((item) => {
          names.push(item.metadata.name);
        });
        setNamespaces(names);
        props.fetchNamespacesList(names);
      })
      .catch((error) => console.log(error));
  };

  const getPromMetrics = () => {
    let now = new Date();
    let nowCopy = new Date(now.getTime());
    nowCopy.setHours(nowCopy.getHours() - 24);
    let endDateTime = now.toISOString();
    // console.log('endDateTime', endDateTime);
    let startDateTime = nowCopy.toISOString();
    // console.log('startDateTime', startDateTime);

    // console.log('prommetrics namespace', selectedState.namespace);
    let step = '30m';
    fetch(
      `/api/prometheus/homepage?startDateTime=${startDateTime}&endDateTime=${endDateTime}&step=${step}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log('data in getPromMetrics', data.bytesTransmittedPerNode);
        // console.log('data', data);
        setPromMetrics(data);
        props.fetchPromMetrics(data);
        // console.log(data);
        // console.log('prom metrics refetched');
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getNodeList();
    getDeploymentsList();
    getPodsList();
    getServicesList();
    getPromMetrics();
    getNamespaceList();
    filterByNamespace();
  }, [namespace]);

  const namespaceOptions = [];
  namespaces.forEach((el) => {
    namespaceOptions.push({
      value: el,
      label: el,
    });
  });

  function handleNamespaceChange(namespace) {
    setSelectedState({ ...selectedState, namespace: namespace.value });
    props.setNamespace(namespace.value);
    if (namespace.value === 'All') {
      setSelectedState({
        ...selectedState,
        namespace: 'All',
        pods,
        deployments,
        services,
        didUpdate: true,
      });
      props.fetchPodsList(pods);
    } else {
      const selectedPods = pods.filter(
        (pod) => pod.metadata.namespace === namespace.value
      );
      setSelectedState({
        ...selectedState,
        namespace: namespace.value,
        pods: selectedPods,
        deployments: deployments.filter(
          (deployment) => deployment.metadata.namespace === namespace.value
        ),
        services: services.filter(
          (service) => service.metadata.namespace === namespace.value
        ),
        didUpdate: true,
      });
      props.fetchPodsList(selectedPods);
    }
  }

  function filterByNamespace() {
    if (props.namespace === 'All' || props.namespace === '') {
      setSelectedState({
        ...selectedState,
        namespace: 'All',
        pods,
        deployments,
        services,
        didUpdate: true,
      });
      console.log('filterByNamespace, all', selectedState);
    } else {
      const selectedPods = pods.filter(
        (pod) => pod.metadata.namespace === namespace.value
      );
      setSelectedState({
        ...selectedState,
        namespace: namespace.value,
        pods: selectedPods,
        deployments: deployments.filter(
          (deployment) => deployment.metadata.namespace === namespace.value
        ),
        services: services.filter(
          (service) => service.metadata.namespace === namespace.value
        ),
        didUpdate: true,
      });
      console.log('filterByNamespace other', selectedState);
    }
  }

  return (
    <Grid container spacing={1}>
      <Grid
        container
        item
        xs={12}
        justifyContent='space-between'
        alignItems='flex-end'
        mb={4}
      >
        <Grid item xs={3}>
          <Select
            name='namespace'
            defaultValue={selectedState.namespace}
            options={namespaceOptions}
            onChange={handleNamespaceChange}
            placeholder='Select a namespace'
          />
        </Grid>
        <Refresh
          getNodeList={getNodeList}
          getDeploymentsList={getDeploymentsList}
          getPodsList={getPodsList}
          getServicesList={getServicesList}
          getPromMetrics={getPromMetrics}
          getNamespaceList={getNamespaceList}
        />
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
          deployments={
            selectedState.didUpdate ? selectedState.deployments : deployments
          }
          pods={selectedState.didUpdate ? selectedState.pods : pods}
          services={selectedState.didUpdate ? selectedState.services : services}
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
          pods={selectedState.didUpdate ? selectedState.pods : pods}
          services={selectedState.didUpdate ? selectedState.services : services}
        />
      </Grid>

      <Grid
        container
        item
        xs={12}
        direction='row'
        justifyContent='space-evenly'
      >
        <CriticalPodsContainer
          metrics={promMetrics}
          namespace={selectedState.namespace}
        />
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
const mapStateToProps = ({ namespace, nodes, pods, services, deployments }) => {
  return {
    namespace: namespace.selectedNamespace,
    nodes: nodes.items,
    pods: pods.items,
    services: services.items,
    deployments: deployments.items,
  };
};

export default connect(mapStateToProps, {
  fetchNodesList,
  fetchPodsList,
  fetchDeploymentsList,
  fetchServicesList,
  fetchNamespacesList,
  fetchPromMetrics,
  setNamespace,
})(MainContainer);
