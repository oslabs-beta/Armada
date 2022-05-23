import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import CpuUtilization from '../components/Utilizations/CpuUtilization.js';
import MemoryUtilization from '../components/Utilizations/MemoryUtilization.js';

const UtilizationContainer = (props) => {
  const [clusterData, setClusterData] = useState([]);

  const getUtilization = () => {
    fetch('/api/prometheus/clustermetrics')
      .then((data) => data.json())
      .then((data) => {
        const obj = {};
        for (const key in data) {
          if (key == 'cpuUtilization' || key == 'memoryUtilization') {
            obj[key] = Number(data[key] * 100).toFixed(2);
          }
        }
        setClusterData(obj);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getUtilization();
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item sm={3}>
        <CpuUtilization cpu={clusterData.cpuUtilization} />
      </Grid>
      <Grid item sm={3}>
        <MemoryUtilization memory={clusterData.memoryUtilization} />
      </Grid>
    </Grid>
  );
};

export default UtilizationContainer;
