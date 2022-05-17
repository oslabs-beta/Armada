import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import BytesReceivedByNode from '../components/NodeMetrics/BytesReceivedByNode';
import CPUUsageByNode from '../components/NodeMetrics/CPUUsageByNode.js';
import MemoryUsageByNode from '../components/NodeMetrics/MemoryUsageByNode.js';
import BytesReceivedByPod from '../components/PodMetrics/BytesReceivedByPod';
import CPUUsageByPod from '../components/PodMetrics/CPUUsageByPod.js';
import MemoryUsageByPod from '../components/PodMetrics/MemoryUsageByPod.js';

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

    let step = '30m';
    fetch(
      `/api/prometheus/metricspage?startDateTime=${startDateTime}&endDateTime=${endDateTime}&step=${step}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log('data', data);
        setTimeSeriesMetrics(data);
        console.log('time series metrics refetched');
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getTimeSeriesMetrics();
  }, []);

  // Node Rendering:
  const renderBytesReceivedPerNode = () => {
    if (timeSeriesMetrics.bytesReceivedPerNode) {
      return (
        <BytesReceivedByNode metrics={timeSeriesMetrics.bytesReceivedPerNode} />
      );
    }
  };

  const renderCPUUsageByNode = () => {
    if (timeSeriesMetrics.getCPUUsageByNode) {
      return <CPUUsageByNode metrics={timeSeriesMetrics.getCPUUsageByNode} />;
    }
  };

  const renderMemoryUsageByNode = () => {
    if (timeSeriesMetrics.getMemoryUsageByNode) {
      return (
        <MemoryUsageByNode metrics={timeSeriesMetrics.getMemoryUsageByNode} />
      );
    }
  };

  // Pod Rendering:
  // const renderBytesReceivedPerPod = () => {
  //   if (timeSeriesMetrics.bytesReceivedPerPod) {
  //     return (
  //       <BytesReceivedByPod metrics={timeSeriesMetrics.bytesReceivedPerPod} />
  //     );
  //   }
  // };

  // const renderCPUUsageByPod = () => {
  //   if (timeSeriesMetrics.getCPUUsageByPod) {
  //     return <CPUUsageByPod metrics={timeSeriesMetrics.getCPUUsageByPod} />;
  //   }
  // };

  // const renderMemoryUsageByPod = () => {
  //   if (timeSeriesMetrics.getMemoryUsageByPod) {
  //     return (
  //       <MemoryUsageByPod metrics={timeSeriesMetrics.getMemoryUsageByPod} />
  //     );
  //   }
  // };

  return (
    <div>
      {renderBytesReceivedPerNode()}
      {renderCPUUsageByNode()}
      {renderMemoryUsageByNode()}
    </div>
  );
};

export default MetricsContainer;
