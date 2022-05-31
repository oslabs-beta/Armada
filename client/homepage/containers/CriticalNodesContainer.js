import React, { useState, useEffect } from 'react';
import CPUIntensiveNodes from '../components/CriticalNodes/CPUIntensiveNodes';
import MemoryIntensiveNodes from '../components/CriticalNodes/MemoryIntensiveNodes';
import BytesTransmittedPerNode from '../components/CriticalNodes/BytesTransmittedPerNode';
import BytesReceivedPerNode from '../components/CriticalNodes/BytesReceivedPerNode';
import { Grid } from '@mui/material';

const CriticalNodesContainer = ({ promMetrics }) => {
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

  const renderNetworkTransmitGraph = () => {
    if (promMetrics.bytesTransmittedPerNode) {
      return <BytesTransmittedPerNode promMetrics={promMetrics} />;
    }
  };

  const renderNetworkReceivedGraph = () => {
    if (promMetrics.bytesReceivedPerNode) {
      return <BytesReceivedPerNode promMetrics={promMetrics} />;
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        {renderCpuGraph()}
      </Grid>
      <Grid item xs={12} sm={6}>
        {renderMemoryGraph()}
      </Grid>

      <Grid item xs={12} sm={6}>
        {renderNetworkTransmitGraph()}
      </Grid>
      <Grid item xs={12} sm={6}>
        {renderNetworkReceivedGraph()}
      </Grid>
    </Grid>
  );
};

export default CriticalNodesContainer;
