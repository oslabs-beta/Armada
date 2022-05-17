import React from 'react';
import {
  Box,
  Typography,
  Chip,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@mui/material';

function ExpandableRow({ description, summary, alerts, open }) {
  const alertsRow = (alert) => {
    return (
      <Box mb={2}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant='body2' color='text.secondary'>
            Active at: {alert.activeAt}
          </Typography>
          <Chip
            color={alert.state === 'firing' ? 'error' : 'warning'}
            label={alert.state}
          />
        </Box>
        <Table size='small'>
          <TableHead>
            <TableRow>
              <TableCell>Container</TableCell>
              <TableCell>Instance</TableCell>
              <TableCell>Job</TableCell>
              <TableCell>Namespace</TableCell>
              <TableCell>Statefulset</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Summary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell component='th' scope='row'>
                {alert.labels.container}
              </TableCell>
              <TableCell>{alert.labels.instance}</TableCell>
              <TableCell>{alert.labels.job}</TableCell>
              <TableCell>{alert.labels.namespace}</TableCell>
              <TableCell>{alert.labels.statefulset}</TableCell>
              <TableCell>{alert.annotations.description}</TableCell>
              <TableCell>{alert.annotations.summary}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
    );
  };
  return (
    <TableRow>
      <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
        {/* <Collapse in={open} timeout='auto' unmountOnExit> */}
        <Box sx={{ margin: 1 }}>
          <Typography variant='h6' gutterBottom component='div'>
            Annotations
          </Typography>
          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Description</TableCell>
                {/* <TableCell>Runbook Url</TableCell> */}
                <TableCell>Summary</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell component='th' scope='row'>
                  {description}
                </TableCell>
                {/* <TableCell>{annotations?.runbook_url}</TableCell> */}
                <TableCell>{summary}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
        {alerts?.length > 0 && (
          <Box sx={{ margin: 1 }}>
            <Typography variant='h6' gutterBottom component='div'>
              Alerts
            </Typography>
            {alerts.map((alert) => alertsRow(alert))}
          </Box>
        )}
      </TableCell>
    </TableRow>
  );
}

export default ExpandableRow;
