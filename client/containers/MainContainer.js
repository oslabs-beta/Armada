import React, { useState, useEffect } from 'react';
import CountsContainer from './CountsContainer';
import StatusContainer from './StatusContainer';
import CriticalPodsContainer from './CriticalPodsContainer';
import CriticalNodesContainer from './CriticalNodesContainer';

const MainContainer = () => {
  const [nodes, setNodes] = useState([]);
  const [deployments, setDeployments] = useState({});
  const [pods, setPods] = useState([]);
  const [services, setServices] = useState({});
  const [promMetrics, setPromMetrics] = useState({});

  const getNodeList = () => {
    fetch('/api/nodesList')
      .then((data) => data.json())
      .then((data) => {
        setNodes(data);
      })
      .catch((error) => console.log(error));
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
    let startDateTime = '2022-05-11T17:52:43.841Z';
    let endDateTime = '2022-05-11T21:52:43.841Z';
    let step = '10m';
    fetch(
      `/api/prometheus/metrics?startDateTime=${startDateTime}&endDateTime=${endDateTime}&step=${step}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
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
    <>
      <div>MainContainer</div>
      <CountsContainer
        nodes={nodes}
        deployments={deployments}
        pods={pods}
        services={services}
      />
      {nodes.length > 0 && (
        <StatusContainer nodes={nodes} pods={pods} services={services} />
      )}
      <CriticalPodsContainer metrics={promMetrics} />
      <CriticalNodesContainer metrics={promMetrics} />
    </>
  );
};

export default MainContainer;
