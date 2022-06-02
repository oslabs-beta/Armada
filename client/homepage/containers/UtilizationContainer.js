import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import CpuUtilization from '../components/Utilizations/CpuUtilization.js';
import MemoryUtilization from '../components/Utilizations/MemoryUtilization.js';
import CpuTotal from '../components/Utilizations/CpuTotal.js';
import MemoryTotal from '../components/Utilizations/MemoryTotal.js';

const UtilizationContainer = (props) => {
  const [clusterData, setClusterData] = useState([]);

  const getUtilization = () => {
    fetch('/api/prometheus/clustermetrics')
      .then((data) => data.json())
      .then((data) => {
        const obj = {};
        console.log(data);
        for (const key in data) {
          if (key == 'cpuUtilization' || key == 'memoryUtilization') {
            obj[key] = Number(data[key] * 100).toFixed(0);
          } else {
            obj[key] = data[key];
          }
        }
        setClusterData(obj);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUtilization();
  }, []);

  const renderCpuUtilization = () => {
    if (clusterData) {
      return <CpuUtilization cpu={clusterData.cpuUtilization} />;
    }
  };

  const renderMemoryUtilization = () => {
    if (clusterData) {
      return <MemoryUtilization memory={clusterData.memoryUtilization} />;
    }
  };

  const renderCpuTotal = () => {
    if (clusterData) {
      return (
        <CpuTotal
          cpu={clusterData.cpuTotal}
          cpuusage={clusterData.cpuUtilization}
        />
      );
    }
  };

  const renderMemoryTotal = () => {
    if (clusterData) {
      return (
        <MemoryTotal
          memory={clusterData.memoryTotal}
          memusage={Number(clusterData.memoryUtilization)}
        />
      );
    }
  };

  return (
    <Grid container spacing={2}>
      <Grid item sm={3}>
        {renderCpuUtilization()}
      </Grid>
      <Grid item sm={3}>
        {renderMemoryUtilization()}
      </Grid>
      <Grid item sm={3}>
        {renderCpuTotal()}
      </Grid>
      <Grid item sm={3}>
        {renderMemoryTotal()}
      </Grid>
    </Grid>
  );
};

export default UtilizationContainer;
