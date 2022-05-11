import React, { useState, useEffect } from 'react';

function PodsCount(props) {
  const { pods } = props;
  const podsCount = pods.length ? pods.length : '-';
  return <div>PodsCount {podsCount}</div>;
}

export default PodsCount;
