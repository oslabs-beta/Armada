import React from 'react';

import MaUTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useTable, useFilters } from 'react-table';
import {
  SelectColumnFilter,
  DefaultColumnFilter,
} from '../../utils/table/helpers';

const HEADERS = [
  'NAMESPACE',
  'LAST SEEN',
  'TYPE',
  'REASON',
  'OBJECT',
  'MESSAGE',
];

function Table({ columns, data }) {
  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter,
    }),
    []
  );

  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useFilters
  );

  // Render the UI for your table
  return (
    <MaUTable {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderProps()}>
                {column.render('Header')}
                <div>{column.canFilter ? column.render('Filter') : null}</div>
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render('Cell')}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MaUTable>
  );
}

const formatColumns = () => {
  const columnsWithFilters = ['NAMESPACE', 'TYPE', 'REASON'];
  return HEADERS.map((el) => {
    const obj = {};
    if (columnsWithFilters.includes(el)) {
      obj.filter = 'includes';
      obj.Filter = SelectColumnFilter;
    } else {
      obj.canFilter = false;
      obj.disableFilters = true;
    }
    obj.Header = el.charAt(0).toUpperCase() + el.slice(1);
    obj.accessor = el.toLowerCase().replace(' ', '_');
    return obj;
  });
};

function LogsTable({ data }) {
  const columns = React.useMemo(
    () =>
      //   HEADERS.map((el) => {
      //     return {
      //       Header: el.charAt(0).toUpperCase() + el.slice(1),
      //       accessor: el.toLowerCase().replace(' ', '_'),
      //     };
      //   }),
      formatColumns(),

    []
  );

  return (
    <div>
      <Table columns={columns} data={data} />
    </div>
  );
}

export default LogsTable;
