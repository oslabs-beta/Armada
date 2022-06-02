import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Paper, Typography, ListSubheader } from '@mui/material';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import parseStatus from '../../../utils/parseStatus';
import ComponentWrapper from '../../../utils/ComponentWrapper';
import ProblematicItem from '../CriticalNodes/ProblematicItem';

// Component to show problematic nodes
const ProblematicNodes = ({ items, lastUpdated }) => {
  const [openState, setOpenState] = useState({
    pidPressure: false,
    memoryPressure: false,
    diskPressure: false,
    down: false,
  });

  const handleClick = (key) => {
    setOpenState({ [key]: !openState[key] });
  };
  const nodeConditions = parseStatus(items);

  // Generates ProblematicItem list for each condition
  const renderByCondition = (nodes, conditionType, condition) => {
    const list = Object.keys(nodes).filter(
      (key) => nodes[key][conditionType] === condition
    );
    return list.map((n) => {
      return <ProblematicItem item={n} />;
    });
  };
  const down = () => {
    return renderByCondition(nodeConditions, 'Ready', 'False');
  };
  const memoryPressure = () => {
    return renderByCondition(nodeConditions, 'MemoryPressure', 'True');
  };
  const diskPressure = () => {
    return renderByCondition(nodeConditions, 'DiskPressure', 'True');
  };
  const pidPressure = () => {
    return renderByCondition(nodeConditions, 'PIDPressure', 'True');
  };

  const renderList = (key, conditionType, renderComponent, icon) => {
    const open = openState[key];
    const length = renderComponent().length;
    return (
      <>
        <ListItemButton onClick={() => handleClick(key)}>
          <ListItemIcon>
            <span className='material-icons'>{icon}</span>
          </ListItemIcon>
          <ListItemText primary={`${conditionType} (${length})`} />
          {open ? (
            <span className='material-icons'>expand_less</span>
          ) : (
            <span className='material-icons'>expand_more</span>
          )}
        </ListItemButton>
        <Collapse in={open} timeout='auto' unmountOnExit>
          {renderComponent()}
        </Collapse>
      </>
    );
  };

  const render = () => {
    return (
      items.length && (
        <ComponentWrapper title='Problematic Nodes'>
          <List>
            {renderList('down', 'Down', down, 'dangerous')}
            {renderList('pidPressure', 'PID Pressure', pidPressure, 'speed')}
            {renderList(
              'memoryPressure',
              'Memory Pressure',
              memoryPressure,
              'memory'
            )}
            {renderList('diskPressure', 'Disk Pressure', diskPressure, 'save')}
          </List>
        </ComponentWrapper>
      )
    );
  };

  return render();
};

const mapStateToProps = ({ nodes }) => {
  return nodes;
};

export default connect(mapStateToProps)(ProblematicNodes);
