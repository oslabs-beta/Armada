import React from 'react';
import CPUIntensivePods from '../components/CriticalPods/CPUIntensivePods';
import MemoryIntensivePods from '../components/CriticalPods/MemoryIntensivePods';
import ProblematicPods from '../components/CriticalPods/ProblematicPods';
import ReceivedBytesIntensivePods from '../components/CriticalPods/ReceivedBytesIntensivePods';
import TransactionBytesIntensivePods from '../components/CriticalPods/TransactionBytesIntensivePods';

const CriticalPodsContainer = () => {
  return;
  <>
    <ProblematicPods />
    <CPUIntensivePods />
    <MemoryIntensivePods />
    <ReceivedBytesIntensivePods />
    <TransactionBytesIntensivePods />
  </>;
};

export default CriticalPodsContainer;

// localhost:9090/api/v1/query_range?query=avg((sum (rate (container_cpu_usage_seconds_total[5m])) by (namespace , pod, container ) / on (container , pod , namespace) ((kube_pod_container_resource_limits_cpu_cores >0)*300))*100)&start=2022-05-11T12:37:55.435Z&end=2022-05-11T16:37:55.435Z&step=5m
