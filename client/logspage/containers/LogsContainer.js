import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import LogsTable from '../components/LogsTable';

function LogsContainer({ namespace }) {
  const [logs, setLogs] = useState([]);
  // const { selectedNamespace } = namespace;
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
    if (
      namespace &&
      namespace?.selectedNamespace !== 'All' &&
      namespace?.selectedNamespace !== ''
    ) {
      return logs.filter(
        (log) => log.namespace === namespace.selectedNamespace
      );
    }
    return logs;
  };
  // console.log('logs filtered', filterByNamespace());
  return (
    <LogsTable
      data={filterByNamespace()}
      namespace={namespace?.selectedNamespace}
    />
  );
}

const mapStateToProps = ({ namespace }) => {
  console.log('namespace', namespace);
  return namespace;
};

export default connect(mapStateToProps)(LogsContainer);
