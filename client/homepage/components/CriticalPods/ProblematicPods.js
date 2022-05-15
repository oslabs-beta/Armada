import React, { useState } from 'react';
import { connect } from 'react-redux';
import ComponentWrapper from '../../../utils/ComponentWrapper';
import ProblematicItem from '../CriticalNodes/ProblematicItem';
import { POD_STATUS } from '../../../utils/constants';
import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Tooltip,
} from '@mui/material';

const ProblematicPods = ({ items, lastUpdated }) => {
  const [openState, setOpenState] = useState({
    pending: false,
    running: false,
    succeeded: false,
    failed: false,
    unknown: false,
  });

  const handleClick = (key) => {
    setOpenState({ ...openState, [key]: !openState[key] });
  };

  //name: el.metadata.name
  // status: el.status.phase
  // conditions: status.conditions
  const phases = Object.keys(POD_STATUS);
  const parseItems = () => {
    return phases.map((p) => {
      let pods = items.filter((i) => i.status.phase === p);
      return {
        phase: p,
        pods: pods.map((pod) => {
          return { name: pod.metadata.name, conditions: pod.status.conditions };
        }),
        description: POD_STATUS[p],
      };
    });
  };
  console.log('Pods', parseItems());
  const renderList = () => {
    return parseItems().map((item) => {
      const phase = item.phase;
      const open = openState[phase.toLowerCase()];
      const length = item.pods.length;
      return (
        <React.Fragment key={phase}>
          <Tooltip title={item.description} arrow>
            <ListItemButton onClick={() => handleClick(phase.toLowerCase())}>
              <ListItemIcon>
                <span className='material-icons'>dangerous</span>
              </ListItemIcon>
              <ListItemText primary={`${phase} (${length})`} />
              {open ? (
                <span className='material-icons'>expand_less</span>
              ) : (
                <span className='material-icons'>expand_more</span>
              )}
            </ListItemButton>
          </Tooltip>
          <Collapse in={open} timeout='auto' unmountOnExit>
            {item.pods.map((p) => (
              <ProblematicItem
                name={p.name}
                key={p.name}
                conditions={p.conditions}
              />
            ))}
          </Collapse>
        </React.Fragment>
      );
    });
  };

  return (
    <ComponentWrapper title='Problematic Pods'>
      <List>{renderList()}</List>
    </ComponentWrapper>
  );
};

const mapStateToProps = ({ pods }) => {
  return pods;
};
export default connect(mapStateToProps)(ProblematicPods);
