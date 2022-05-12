import React, { useState, useEffect } from 'react';
import CPUIntensiveNodes from '../components/CriticalNodes/CPUIntensiveNodes';
import MemoryIntensiveNodes from '../components/CriticalNodes/MemoryIntensiveNodes';
import ProblematicNodes from '../components/CriticalNodes/ProblematicNodes';
import ReceivedBytesIntensiveNodes from '../components/CriticalNodes/ReceivedBytesIntensiveNodes';
import TransactionBytesIntensiveNodes from '../components/CriticalNodes/TransactionBytesIntensiveNodes';

const CriticalNodesContainer = () => {
  const [cpu, setCpu] = useState([]);
  const [memory, setMemory] = useState([]);
  const getCpuByNode = () => {
    fetch('api/prometheus/cpubynode')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setCpu(data);
      })
      .catch((err) => console.log('error with nodebycpu', err));
  };

  const getMemoryByNode = () => {
    fetch('/api/prometheus/memorybynode')
      .then((res) => res.json())
      .then((data) => setMemory(data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getCpuByNode();
    getMemoryByNode();
  }, []);

  const renderCpuGraph = () => {
    if (cpu.length > 0) {
      return <CPUIntensiveNodes nodes={cpu} />;
    }
  };
  const renderMemoryGraph = () => {
    if (memory.length > 0) {
      return <MemoryIntensiveNodes nodes={memory} />;
    }
  };
  return (
    <>
      <ProblematicNodes />
      {renderCpuGraph()}
      {renderMemoryGraph()}

      <ReceivedBytesIntensiveNodes />
      <TransactionBytesIntensiveNodes />
    </>
  );
};

export default CriticalNodesContainer;
