import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import LogsTable from '../components/LogsTable';

function LogsContainer({ namespace }) {
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

  const filterByNamespace = () => {
    if (namespace !== 'All' && namespace !== '') {
      return logs.filter((log) => log.namespace === namespace);
    }
    return logs;
  };
  // console.log('logs filtered', filterByNamespace());
  return <LogsTable data={filterByNamespace()} namespace={namespace} />;
}

const mapStateToProps = ({ namespace }) => {
  return namespace;
};

export default connect(mapStateToProps)(LogsContainer);
