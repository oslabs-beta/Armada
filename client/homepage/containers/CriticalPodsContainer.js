import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import CPUIntensivePods from '../components/CriticalPods/CPUIntensivePods';
import MemoryIntensivePods from '../components/CriticalPods/MemoryIntensivePods';

const CriticalPodsContainer = (props) => {
  const { namespace } = props;

  const [cpu, setCpu] = useState([]);
  const [memory, setMemory] = useState([]);
  const fetchCpuByPod = () => {
    fetch(`/api/prometheus/cpubypod?namespace=${namespace}`)
      .then((res) => res.json())
      .then((data) => setCpu(data))
      .catch((err) => console.log(err));
  };

  const fetchMemoryByPod = () => {
    fetch(`/api/prometheus/memorybypod?namespace=${namespace}`)
      .then((res) => res.json())
      .then((data) => {
        setMemory(data);
        console.log(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchCpuByPod();
    fetchMemoryByPod();
  }, [namespace]);

  const renderCpuGraph = () => {
    if (cpu) {
      return <CPUIntensivePods pods={cpu} />;
    }
  };

  const renderMemory = () => {
    if (memory) {
      return <MemoryIntensivePods pods={memory} />;
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={6}>
        {renderCpuGraph()}
      </Grid>
      <Grid item xs={12} sm={6}>
        {renderMemory()}
      </Grid>
    </Grid>
  );
};

export default CriticalPodsContainer;
