import React, { useState, useEffect } from 'react';
import CPUIntensiveNodes from '../components/CriticalNodes/CPUIntensiveNodes';
import MemoryIntensiveNodes from '../components/CriticalNodes/MemoryIntensiveNodes';
import ProblematicNodes from '../components/CriticalNodes/ProblematicNodes';
import ReceivedBytesIntensiveNodes from '../components/CriticalNodes/ReceivedBytesIntensiveNodes';
import TransactionBytesIntensiveNodes from '../components/CriticalNodes/TransactionBytesIntensiveNodes';

const CriticalNodesContainer = () => {
  const [nodesCpu, setNodesCpu] = useState([]);
  useEffect(() => {});

  return;
  <>
    <ProblematicNodes />
    <CPUIntensiveNodes />
    <MemoryIntensiveNodes />
    <ReceivedBytesIntensiveNodes />
    <TransactionBytesIntensiveNodes />
  </>;
};

export default CriticalNodesContainer;
