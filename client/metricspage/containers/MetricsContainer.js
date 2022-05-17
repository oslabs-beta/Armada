import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import BytesReceivedByNode from '../components/BytesReceivedByNode';
import CPUUsageByNode from '../components/CPUUsageByNode.js';
import FreeMemoryByNode from '../components/FreeMemoryByNode.js';

const MetricsContainer = () => {
  const [timeSeriesMetrics, setTimeSeriesMetrics] = useState([]);

  const getTimeSeriesMetrics = () => {
    let now = new Date();
    let nowCopy = new Date(now.getTime());
    nowCopy.setHours(nowCopy.getHours() - 24);
    let endDateTime = now.toISOString();
    console.log('endDateTime', endDateTime);
    let startDateTime = nowCopy.toISOString();
    console.log('startDateTime', startDateTime);

    let step = '1m';
    fetch(
      `/api/prometheus/metricspage?startDateTime=${startDateTime}&endDateTime=${endDateTime}&step=${step}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log('data in getPromMetrics', data.bytesTransmittedPerNode);
        console.log('data', data);
        setTimeSeriesMetrics(data);
        console.log('time series metrics refetched');
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getTimeSeriesMetrics();
  }, []);

  const renderBytesReceived = () => {
    if (timeSeriesMetrics.bytesReceivedPerNode) {
      return (
        <BytesReceivedByNode metrics={timeSeriesMetrics.bytesReceivedPerNode} />
      );
    }
  };

  const renderCPUUsage = () => {
    if (timeSeriesMetrics.getCPUUsageByNode) {
      return <CPUUsageByNode metrics={timeSeriesMetrics.getCPUUsageByNode} />;
    }
  };

  const renderFreeMemory = () => {
    if (timeSeriesMetrics.getFreeMemoryPerNode) {
      return (
        <FreeMemoryByNode metrics={timeSeriesMetrics.getFreeMemoryPerNode} />
      );
    }
  };

  return (
    <div>
      {renderBytesReceived()}
      {renderCPUUsage()}
      {renderFreeMemory()}
    </div>
  );
};

export default MetricsContainer;
