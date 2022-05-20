import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import CPUIntensivePods from '../components/CriticalPods/CPUIntensivePods';
import MemoryIntensivePods from '../components/CriticalPods/MemoryIntensivePods';
import ProblematicPods from '../components/CriticalPods/ProblematicPods';

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
    <Grid container spacing={1}>
      <Grid item sm={6} lg={4}>
        <ProblematicPods />
      </Grid>
      <Grid item sm={6} lg={4}>
        {renderCpuGraph()}
      </Grid>
      <Grid item sm={6} lg={4}>
        {renderMemory()}
      </Grid>
    </Grid>
  );
};

export default CriticalPodsContainer;

// localhost:9090/api/v1/query_range?query=avg((sum (rate (container_cpu_usage_seconds_total[5m])) by (namespace , pod, container ) / on (container , pod , namespace) ((kube_pod_container_resource_limits_cpu_cores >0)*300))*100)&start=2022-05-11T12:37:55.435Z&end=2022-05-11T16:37:55.435Z&step=5m
