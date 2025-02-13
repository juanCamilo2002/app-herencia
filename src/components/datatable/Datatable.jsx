import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useState } from "react";
import ArrowDatatableRight from '../../assets/icons/arrow-datatable-right.svg?react';
import ArrowDatatableLeft from '../../assets/icons/arrow-datatable-left.svg?react';

const DataTable = ({ data, columns, loading }) => {
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0, // Página actual
    pageSize: 10, // Tamaño de página
  });

  const table = useReactTable({
    data,
    columns,
    state: {
      globalFilter,
      pagination,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: setPagination, // Configura el tamaño de página
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="spinner-border animate-spin border-4 border-t-4 border-blue-500 rounded-full w-8 h-8"></div>
      </div>
    );
  }

  return (
    <div>
      {/* Filtro General */}
      <div className="flex flex-wrap justify-between px-8 pb-4 space-y-4 md:space-y-0 md:flex-nowrap">
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Buscar en toda la tabla..."
            value={globalFilter}
            onChange={(e) => table.setGlobalFilter(e.target.value)}
            className="w-full rounded border-[1.5px] border-stroke bg-transparent px-5 py-2.5 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
          />
        </div>
        <div className="flex items-center font-medium space-x-2 w-full md:w-auto">
          <select
            value={table.getState().pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value));
            }}
            className="rounded-md border p-2 border-stroke bg-transparent dark:bg-meta-4 dark:border-strokedark"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
          <p className="text-black dark:text-white">Entradas por página</p>
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-x-auto dark:bg-gray-800 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-900 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100  ">
        {" "}
        {/* Agregado para permitir el desplazamiento horizontal */}
        <table className="datatable-table datatable-one w-full table-auto border-collapse overflow-hidden break-words px-4 md:table-fixed md:overflow-auto md:px-8">
          <thead className="border-separate px-4">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr
                key={headerGroup.id}
                className="border-t border-stroke dark:border-strokedark"
              >
                {headerGroup.headers.map((header) => (
                  <th
                    colSpan={1}
                    key={header.id}
                    className="px-4 py-2 cursor-pointer"
                    style={{ width: header.column.getSize() }} // Establecer el tamaño de las columnas
                  >
                    <div className="flex flex-col items-center justify-center">
                      {/* Ordenamiento */}
                      <span
                        className="cursor-pointer"
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                        {header.column.getIsSorted() === "asc"
                          ? " 🔼"
                          : header.column.getIsSorted() === "desc"
                          ? " 🔽"
                          : null}
                      </span>

                      {/* Input para filtrar por columna */}
                      {header.column.getCanFilter() && (
                        <input
                          type="text"
                          value={header.column.getFilterValue() || ""}
                          onChange={(e) =>
                            header.column.setFilterValue(e.target.value)
                          }
                          className="w-full min-w-[150px] rounded border-[1.5px] border-stroke px-3 py-1 font-normal outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
                        />
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-stroke dark:border-strokedark hover:bg-gray-2 hover:dark:bg-meta-4"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-5">
                    {" "}
                    {/* Mantener el ancho de las celdas */}
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Paginación */}
      {/* Paginación */}
      <div className="flex flex-col sm:flex-row justify-between items-center border-t border-stroke px-6 pt-5 dark:border-strokedark">
        {/* Paginación en pantallas grandes */}
        <div className="flex items-center space-x-2 sm:flex">
          {/* Botón Anterior */}
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex cursor-pointer items-center justify-center rounded p-3 py-3 hover:bg-primary hover:text-white"
          >
            <ArrowDatatableLeft className="fill-current" />
          </button>

          {/* Botones de Páginas (Solo visible en pantallas medianas y grandes) */}
          <div className="hidden md:flex space-x-2 flex-wrap">
            {Array.from({ length: table.getPageCount() }, (_, index) => (
              <button
                key={index}
                onClick={() => table.setPageIndex(index)}
                className={`px-4 py-2 rounded ${
                  table.getState().pagination.pageIndex === index
                    ? "bg-primary text-white"
                    : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>

          {/* Botón Siguiente */}
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="flex cursor-pointer items-center justify-center rounded p-3 py-3 hover:bg-primary hover:text-white"
          >
            <ArrowDatatableRight className="fill-current" />
          </button>
        </div>

        {/* Indicador de página para pantallas pequeñas */}
        <div className="sm:hidden mt-3 text-black dark:text-white">
          Página {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()}
        </div>

        {/* Texto a la derecha */}
        <div className=" hidden md:flex ml-auto text-black sm:block dark:text-white  space-x-2">
          Mostrando {table.getState().pagination.pageIndex + 1} de{" "}
          {table.getPageCount()} páginas
        </div>
      </div>
    </div>
  );
};

export default DataTable;
