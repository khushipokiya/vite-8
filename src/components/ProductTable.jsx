import React, { useMemo } from 'react';
import { useTable, useFilters, useGlobalFilter } from 'react-table';
import { useProductContext } from './ProductContext';

// Global Filter Component
const GlobalFilter = ({ globalFilter, setGlobalFilter }) => {
  return (
    <input
      value={globalFilter || ''}
      onChange={e => setGlobalFilter(e.target.value || undefined)}
      placeholder="Search All"
      className="p-2 border rounded mb-4"
    />
  );
};

// Dropdown Filter Component
const DropdownFilter = ({ column }) => {
  const { filterValue, setFilter, preFilteredRows, id } = column;

  // Calculate unique options
  const options = useMemo(() => {
    if (!preFilteredRows) return []; 

    const uniqueValues = new Set();
    preFilteredRows.forEach(row => {
      uniqueValues.add(row.values[id]);
    });

    return [...uniqueValues];
  }, [preFilteredRows, id]);

  return (
    <select
      value={filterValue || ''}
      onChange={e => setFilter(e.target.value || undefined)}
      className="p-2 border rounded"
    >
      <option value="">All</option>
      {options.map(option => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

const ProductTable = () => {
  const { products } = useProductContext();

 
  const data = useMemo(() => products, [products]);

  // Define columns with specific filters
  const columns = useMemo(() => [
    { Header: 'Name', accessor: 'name' },
    { Header: 'SKU', accessor: 'sku' },
    { Header: 'Stock', accessor: 'stock', Filter: DropdownFilter },
    { Header: 'Price', accessor: 'price' },
    { Header: 'Category', accessor: 'category', Filter: DropdownFilter },
    { Header: 'Date', accessor: 'date' },
    { Header: 'Status', accessor: 'status', Filter: DropdownFilter },
  ], []);

  // Use table hooks
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
    setFilter,
  } = useTable(
    { 
      columns, 
      data 
    },
    useFilters,      
    useGlobalFilter  
  );

  const { globalFilter } = state;

  return (
    <div>
      {/* Global Filter */}
      <GlobalFilter globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} />
      
      {/* Dropdown Filters */}
      <div className="mb-4">
        <label className="mr-2">Filter by Category:</label>
        <DropdownFilter column={{
           id: 'category', 
          filterValue: state.filters.find(f => f.id === 'category')?.value,
           setFilter: value => setFilter('category', value), 
           preFilteredRows: rows }} />
      </div>

      <div className="mb-4">
        <label className="mr-2">Filter by Status:</label>
        <DropdownFilter column={{
           id: 'status', 
           filterValue: state.filters.find(f => f.id === 'status')?.value,
            setFilter: value => setFilter('status', value),
             preFilteredRows: rows }} />
      </div>

      <div className="mb-4">
        <label className="mr-2">Filter by Stock:</label>
        <DropdownFilter column={{ 
          id: 'stock',
           filterValue: state.filters.find(f => f.id === 'stock')?.value, 
           setFilter: value => setFilter('stock', value), 
           preFilteredRows: rows }} />
      </div>

      <table {...getTableProps()} className="min-w-full bg-white">
        <thead>
          {headerGroups.map(headerGroup => (
            <tr key={headerGroup.id} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <th key={column.id} {...column.getHeaderProps()} className="border p-2">
                  {column.render('Header')}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map(row => {
            prepareRow(row);
            return (
              <tr key={row.id} {...row.getRowProps()} className="border">
                {row.cells.map(cell => (
                  <td key={cell.id} {...cell.getCellProps()} className="p-2 border">
                    {cell.render('Cell')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
