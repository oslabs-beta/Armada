import React, { useState, useEffect } from 'react';
import LogsTable from '../components/LogsTable';

function LogsContainer() {
  const [logs, setLogs] = useState([]);
  const getLogs = () => {
    fetch('/api/logs')
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch((err) => console.log(err));
  };
  useEffect(() => {
    getLogs();
  }, []);

  return <LogsTable data={logs} />;
}

export default LogsContainer;
