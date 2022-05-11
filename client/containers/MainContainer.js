import React, { useState, useEffect } from 'react';
import CountsContainer from './CountsContainer';
import StatusContainer from './StatusContainer';
import CriticalPodsContainer from './CriticalNodesContainer';
import CriticalNodesContainer from './CriticalPodsContainer';

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
    let startDateTime = '19:00';
    let endDateTime = '21:00';
    let step = 2;
    fetch(`/api/prometheus/metrics/${startDateTime}/${endDateTime}/${step}`)
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
