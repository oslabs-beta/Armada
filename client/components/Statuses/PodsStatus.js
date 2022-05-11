import React, { useState, useEffect } from 'react';

const PodsStatus = (props) => {
  const { pods } = props;
  const podsObj = {};
  for (let pod of pods) {
    podsObj[pod.metadata.name] = pod.status.phase;
  }

  return <div className='podsStatus'></div>;
};

export default PodsStatus;
