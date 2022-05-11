import React, { useState, useEffect } from 'react';
import NodesStatus from '../components/Statuses/NodesStatus';
import PodsStatus from '../components/Statuses/PodsStatus';
import ServicesStatus from '../components/Statuses/ServicesStatus';

const StatusContainer = (props) => {
  const { nodes, pods, services } = props;

  return (
    <div className='statusContainer'>
      <NodesStatus nodes={nodes} />
      <PodsStatus pods={pods} />
      <ServicesStatus services={services} />
    </div>
  );
};

export default StatusContainer;
