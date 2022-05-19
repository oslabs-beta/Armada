import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { connect } from 'react-redux';
import BytesReceivedByNamespace from '../components/NamespaceMetrics/BytesReceivedByNamespace';
import BytesTransmittedByNamespace from '../components/NamespaceMetrics/BytesTransmittedByNamespace';
import CPUUsageByNamespace from '../components/NamespaceMetrics/CPUUsageByNamespace.js';
import MemoryUsageByNamespace from '../components/NamespaceMetrics/MemoryUsageByNamespace.js';
import BytesReceivedByNode from '../components/NodeMetrics/BytesReceivedByNode';
import BytesTransmittedByNode from '../components/NodeMetrics/BytesTransmittedByNode';
import CPUUsageByNode from '../components/NodeMetrics/CPUUsageByNode.js';
import MemoryUsageByNode from '../components/NodeMetrics/MemoryUsageByNode.js';
import BytesReceivedByPod from '../components/PodMetrics/BytesReceivedByPod';
import BytesTransmittedByPod from '../components/PodMetrics/BytesTransmittedByPod';
import CPUUsageByPod from '../components/PodMetrics/CPUUsageByPod.js';
import MemoryUsageByPod from '../components/PodMetrics/MemoryUsageByPod.js';

const MetricsContainer = ({ namespace }) => {
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
      `/api/prometheus/metricspage?startDateTime=${startDateTime}&endDateTime=${endDateTime}&step=${step}&namespace=${namespace}`
    )
      .then((res) => res.json())
      .then((data) => {
        // console.log('namespace data', data.bytesReceivedPerNamespace);
        setTimeSeriesMetrics(data);
        console.log('time series metrics refetched');
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getTimeSeriesMetrics();
  }, [namespace]);

  // Namespace Rendering:
  const renderBytesReceivedPerNamespace = () => {
    if (timeSeriesMetrics.bytesReceivedPerNamespace) {
      return (
        <BytesReceivedByNamespace
          metrics={timeSeriesMetrics.bytesReceivedPerNamespace}
        />
      );
    }
  };

  const renderBytesTransmittedPerNamespace = () => {
    if (timeSeriesMetrics.bytesTransmittedPerNamespace) {
      return (
        <BytesTransmittedByNamespace
          metrics={timeSeriesMetrics.bytesTransmittedPerNamespace}
        />
      );
    }
  };

  const renderCPUUsageByNamespace = () => {
    if (timeSeriesMetrics.getCPUUsageByNamespace) {
      return (
        <CPUUsageByNamespace
          metrics={timeSeriesMetrics.getCPUUsageByNamespace}
        />
      );
    }
  };

  const renderMemoryUsageByNamespace = () => {
    if (timeSeriesMetrics.getMemoryUsageByNamespace) {
      return (
        <MemoryUsageByNamespace
          metrics={timeSeriesMetrics.getMemoryUsageByNamespace}
        />
      );
    }
  };

  // Node Rendering:
  const renderBytesReceivedPerNode = () => {
    if (timeSeriesMetrics.bytesReceivedPerNode) {
      return (
        <BytesReceivedByNode metrics={timeSeriesMetrics.bytesReceivedPerNode} />
      );
    }
  };

  const renderBytesTransmittedPerNode = () => {
    if (timeSeriesMetrics.bytesTransmittedPerNode) {
      return (
        <BytesTransmittedByNode
          metrics={timeSeriesMetrics.bytesTransmittedPerNode}
        />
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
  const renderBytesReceivedPerPod = () => {
    if (timeSeriesMetrics.bytesReceivedPerPod) {
      return (
        <BytesReceivedByPod metrics={timeSeriesMetrics.bytesReceivedPerPod} />
      );
    }
  };

  const renderBytesTransmittedPerPod = () => {
    if (timeSeriesMetrics.bytesTransmittedPerPod) {
      return (
        <BytesReceivedByPod
          metrics={timeSeriesMetrics.bytesTransmittedPerPod}
        />
      );
    }
  };

  const renderCPUUsageByPod = () => {
    if (timeSeriesMetrics.getCPUUsageByPod) {
      return <CPUUsageByPod metrics={timeSeriesMetrics.getCPUUsageByPod} />;
    }
  };

  const renderMemoryUsageByPod = () => {
    if (timeSeriesMetrics.getMemoryUsageByPod) {
      return (
        <MemoryUsageByPod metrics={timeSeriesMetrics.getMemoryUsageByPod} />
      );
    }
  };

  return (
    <div>
      {renderCPUUsageByNamespace()}
      {renderMemoryUsageByNamespace()}
      {renderBytesReceivedPerNamespace()}
      {renderBytesTransmittedPerNamespace()}
      {renderCPUUsageByNode()}
      {renderMemoryUsageByNode()}
      {renderBytesReceivedPerNode()}
      {renderBytesTransmittedPerNode()}
      {renderCPUUsageByPod()}
      {renderMemoryUsageByPod()}
      {renderBytesReceivedPerPod()}
      {renderBytesTransmittedPerPod()}
    </div>
  );
};

const mapStateToProps = ({ namespace }) => {
  // console.log(`this is namespace: ${namespace}`);
  // console.log('namespace keys' + Object.keys(namespace));
  // console.log(Object.values(namespace));
  return { namespace: namespace.selectedNamespace };
};

export default connect(mapStateToProps)(MetricsContainer);
