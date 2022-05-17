import React, { useState, useEffect, useCallback } from 'react';
import { useTable, useFilters, useExpanded } from 'react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import { matchSorter } from 'match-sorter';
import ExpandableRow from './ExpandableRow';

function Alerts() {
  const [data, setData] = useState([]);

  const fetchAlerts = () => {
    fetch('/api/alerts')
      .then((data) => data.json())
      .then((data) => formatData(data))
      .then((tableData) => setData(tableData));
  };

  // format data into table structure
  const formatData = (data) => {
    const groups = data.data.groups;
    const tableData = [];

    for (let group of groups) {
      for (let rule of group.rules) {
        if (rule.state) {
          const ruleObj = {
            group: group.name,
            state: rule.state,
            name: rule.name,
            severity: rule.labels?.severity,
            description: rule?.annotations.description,
            summary: rule?.annotations.summary,
            alerts: rule.alerts,
          };
          tableData.push(ruleObj);
        }
      }
    }
    return tableData;
  };

  useEffect(() => {
    fetchAlerts();
  }, []);

  // define table columns using React.useMemo
  const columns = React.useMemo(
    () => [
      {
        // Build our expander column
        id: 'expander', // Make sure it has an ID
        Cell: ({ row }) => (
          // Use Cell to render an expander for each row.
          // We can use the getToggleRowExpandedProps prop-getter
          // to build the expander.
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? (
              <span className='material-symbols-outlined'>expand_less</span>
            ) : (
              <span className='material-symbols-outlined'>expand_more</span>
            )}
          </span>
        ),
      },
      {
        Header: 'Group',
        accessor: 'group',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Name',
        accessor: 'name',
        filter: 'fuzzyText',
      },
      {
        Header: 'State',
        accessor: 'state',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
      {
        Header: 'Severity',
        accessor: 'severity',
        Filter: SelectColumnFilter,
        filter: 'includes',
      },
    ],
    []
  );

  // render ExpandableRow
  const renderExpandableRow = useCallback(({ row }) => {
    return (
      <ExpandableRow
        key={row.original.name}
        alerts={row.original.alerts}
        description={row.original.description}
        summary={row.original.summary}
      />
    );
  });

  // filtering
  // default UI for filtering
  function DefaultColumnFilter({
    column: { filterValue, preFilteredRows, setFilter },
  }) {
    const count = preFilteredRows.length;

    return (
      <input
        value={filterValue || ''}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
        placeholder={''}
      />
    );
  }

  //filter for selecting option from list
  function SelectColumnFilter({
    column: { filterValue, setFilter, preFilteredRows, id },
  }) {
    const options = React.useMemo(() => {
      const options = new Set();
      preFilteredRows.forEach((row) => {
        options.add(row.values[id]);
      });
      return [...options.values()];
    }, [id, preFilteredRows]);

    // render a multi-select box
    return (
      <select
        value={filterValue}
        onChange={(e) => {
          setFilter(e.target.value || undefined);
        }}
      >
        <option value=''>All</option>
        {options.map((option, i) => (
          <option key={i} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  }

  //fuzzy text filter
  function fuzzyTextFilterFn(rows, id, filterValue) {
    return matchSorter(rows, filterValue, { keys: [(row) => row.values[id]] });
  }

  fuzzyTextFilterFn.autoRemove = (val) => !val;

  function TableInstance({ columns, data }) {
    const defaultColumn = React.useMemo(
      () => ({
        // Let's set up our default Filter UI
        Filter: DefaultColumnFilter,
      }),
      []
    );

    const filterTypes = React.useMemo(
      () => ({
        fuzzyText: fuzzyTextFilterFn,
      }),
      []
    );

    const {
      getTableProps,
      headerGroups,
      rows,
      prepareRow,
      visibleColumns,
      state: { expanded },
    } = useTable(
      {
        columns,
        data,
        filterTypes,
        defaultColumn,
      },
      useFilters,
      useExpanded
    );

    // text: (rows, id, filterValue) => {
    //   return rows.filter(row => {
    //     const rowValue = row.values[id];
    //     return rowValue !== undefined ? String(rowValue).toLowerCase().startswith(String(filterValue).toLowerCase()) : true
    //   })
    // }

    return (
      <div>
        <Table {...getTableProps()}>
          <TableHead>
            {headerGroups.map((headerGroup) => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <TableCell {...column.getHeaderProps()}>
                    {column.render('Header')}
                    <div>
                      {column.canFilter ? column.render('Filter') : null}
                    </div>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {rows.map((row, i) => {
              prepareRow(row);

              // console.log('row', row);
              return (
                <React.Fragment>
                  <TableRow {...row.getRowProps()}>
                    {row.cells.map((cell) => {
                      return (
                        <TableCell {...cell.getCellProps()}>
                          {cell.render('Cell')}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  {row.isExpanded ? renderExpandableRow({ row }) : null}
                </React.Fragment>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }

  return (
    <div>
      <TableInstance
        columns={columns}
        data={data}
        renderRowSubComponent={renderExpandableRow}
      />
    </div>
  );
}

export default Alerts;
