import React, { useEffect, useState } from 'react';
import BarChart from '../Charts/BarChartTemplate';
import ComponentWrapper from '../../../utils/ComponentWrapper';
import { MAX_SERIES } from '../../../actions/constants/chartConstants';
import io from 'socket.io-client';

const socket = io.connect('http://127.0.0.1:3001/', {
  // cors: {
  //   origin: 'http://127.0.0.1:3001',
  //   credentials: true,
  // },
  transports: ['websocket', 'polling'],
});

const WebSocketCPUIntensivePods = ({ pods }) => {
  const [cpuData, setCpuData] = useState([]);
  useEffect(() => {
    socket.on('cpu', (data) => {
      setCpuData((curData) => [...curData, data]);
      console.log(cpuData);
    });
  }, []);

  // const renderCpuData = () => {
  //     cpuData.map(el => <span>{el}</span>)
  // }

  return (
    <ComponentWrapper title='CPU Intensive Pods'>
      {/* <BarChart
        chartData={pods.slice(0, MAX_SERIES)}
        title='CPU Usage (%) by Pods'
        label='CPU Usage (%) By Pods'
      /> */}
    </ComponentWrapper>
  );
};

export default WebSocketCPUIntensivePods;
