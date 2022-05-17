import React, { useState, useEffect } from 'react';

const Refresh = (props) => {
  const [timestamp, setTimestamp] = useState(new Date().toString());

  function setTime() {
    console.log('set time called');
    let time = new Date();
    time = time.toString();
    getNodeList();
    getDeploymentsList();
    getPodsList();
    getServicesList();
    getPromMetrics();
    setTimestamp(time);
  }

  return (
    <span>
      <p className='timestamp'>
        Last updated at {timestamp}{' '}
        <button className='refreshButton' onClick={setTime}>
          <span className='material-icons'>refresh</span>
        </button>
      </p>
    </span>
  );
};

export default Refresh;
