import React from 'react';
import NodesCount from '../components/Counts/NodesCount';
import DeploymentsCount from '../components/Counts/DeploymentsCount';
import PodsCount from '../components/Counts/PodsCount';
import ServicesCount from '../components/Counts/ServicesCount';

const CountsContainer = (props) => {
  const { nodes, deployments, pods, services } = props;
  return (
    <>
      <div>CountsContainer</div>
      <NodesCount nodes={nodes} />
      <DeploymentsCount deployments={deployments} />
      <PodsCount pods={pods} />
      <ServicesCount services={services} />
    </>
  );
};

export default CountsContainer;
