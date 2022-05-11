import React, { useState, useEffect } from 'react';

function DeploymentsCount(props) {
  const { deployments } = props;
  const deploymentsCount = deployments.length ? deployments.length : '-';
  return <div>DeploymentsCount {deploymentsCount}</div>;
}

export default DeploymentsCount;
