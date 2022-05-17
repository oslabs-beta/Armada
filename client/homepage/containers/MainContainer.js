import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import CountsContainer from './CountsContainer';
import StatusContainer from './StatusContainer';
import CriticalPodsContainer from './CriticalPodsContainer';
import CriticalNodesContainer from './CriticalNodesContainer';
import Refresh from '../components/Refresh';
import { Grid } from '@mui/material';
import { fetchNodesList, fetchPodsList } from '../../actions/actions';
import demoNodeList from '../../demoData/nodeList.json';
import Select from 'react-select';

const MainContainer = (props) => {
  const [mode, setMode] = useState('production');
  const [nodes, setNodes] = useState([]);
  const [deployments, setDeployments] = useState({});
  const [selectedDeployments, setSelectedDeployments] = useState(deployments);
  const [pods, setPods] = useState([]);
  const [selectedPods, setSelectedPods] = useState(pods);
  const [services, setServices] = useState({});
  const [selectedServices, setSelectedServices] = useState(services);
  const [promMetrics, setPromMetrics] = useState({});
  const [namespaces, setNamespaces] = useState([]);
  const [selectedNamespace, setSelectedNamespace] = useState('All');

  // const [selectedState, setSelectedState] = useState({
  //   pods:
  // })

  const getNodeList = () => {
    if (mode === 'demo') {
      console.log(demoNodeList.response.body.items);
      props.fetchNodesList(demoNodeList.response.body.items);
    } else {
      fetch('/api/nodesList')
        .then((data) => data.json())
        .then((data) => {
          console.log('nodes data', data);
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
    getNamespaceList();
  }, []);

  const namespaceOptions = [];
  namespaces.forEach((el) => {
    namespaceOptions.push({
      value: el,
      label: el,
    });
  });

  function handleNamespaceChange(namespace) {
    console.log('selected namespace', namespace.value);
    setSelectedNamespace(namespace.value);
    console.log('selectedNamespace', selectedNamespace);
    if (namespace.value === 'All') {
      setSelectedPods(pods);
      setSelectedDeployments(deployments);
      setSelectedServices(services);
    } else {
      const selectedPods = pods.filter(
        (pod) => pod.metadata.namespace === namespace.value
      );
      setSelectedPods(selectedPods);
      props.fetchPodsList(selectedPods);
      setSelectedDeployments(
        deployments.filter(
          (deployment) => deployment.metadata.namespace === namespace.value
        )
      );
      setSelectedServices(
        services.filter(
          (service) => service.metadata.namespace === namespace.value
        )
      );
    }
  }

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
      <Select
        className='namespaceSelect'
        value={selectedNamespace}
        options={namespaceOptions}
        onChange={handleNamespaceChange}
      />
      <Grid
        container
        item
        xs={12}
        direction='row'
        justifyContent='space-evenly'
      >
        <CountsContainer
          nodes={nodes}
          deployments={selectedDeployments}
          pods={selectedPods}
          services={selectedServices}
        />
      </Grid>
      <Grid
        container
        item
        xs={12}
        direction='row'
        justifyContent='space-evenly'
      >
        <StatusContainer pods={selectedPods} services={selectedServices} />
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
