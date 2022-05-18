import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';

const UtilizationContainer = (props) => {
  const [cpu, setCpu] = useState(0);

  const getCpuUtilization = () => {
    fetch('/api/prometheus/cpuUtilization')
      .then((data) => data.json())
      .then((data) => {
        let value = (Number(data.data.result[0].value[1]) * 100).toFixed(2);
        setCpu(value);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getCpuUtilization();
  }, []);
};

export default UtilizationContainer;
