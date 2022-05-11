import React, { useState, useEffect } from 'react';

function NodesCount(props) {
  const { nodes } = props;
  const nodesCount = nodes.length ? nodes.length : '-';
  return <div>NodeList {nodesCount}</div>;
}

export default NodesCount;
