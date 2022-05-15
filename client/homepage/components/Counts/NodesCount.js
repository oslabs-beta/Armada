import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Card, Typography } from '@mui/material';
import ComponentWrapper from '../../../utils/ComponentWrapper';

const mapStateToProps = ({ nodes }) => {
  return nodes;
};

function NodesCount({ items }) {
  const nodesCount = items.length ? items.length : '-';
  return (
    <ComponentWrapper title='Nodes'>
      <Typography variant='h1'> {nodesCount}</Typography>
    </ComponentWrapper>
  );
}

export default connect(mapStateToProps)(NodesCount);
