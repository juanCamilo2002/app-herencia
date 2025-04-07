import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
  flexRender,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useSales } from "../hooks/useSales";
import React, { useState, useEffect } from "react";
import { columns } from "./table/columns";
import SaleDetails from "./SaleDetails";
import HeaderTable from "./table/HeaderTable";
import Pagination from "./table/Pagination";

const SalesTable = () => {
  const { sales, loading, error, loadSales } = useSales();

  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    loadSales();
  }, [loadSales]);

  const table = useReactTable({
    data: sales || [],
    columns,
    state: { globalFilter, pagination, expanded },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    getRowCanExpand: () => true,
    onExpandedChange: (updater) => {
      const updated =
        typeof updater === "function" ? updater(expanded) : updater;
      const clickedRowId = Object.keys(updated).find((id) => updated[id]);

      if (!clickedRowId) {
        setExpanded({});
        return;
      }

      if (expanded[clickedRowId]) {
        setExpanded({});
      } else {
        setExpanded({ [clickedRowId]: true });
      }
    },
  });

  if (loading) return <p>Cargando ventas...</p>;
  if (error) return <p>Error al cargar las ventas.</p>;

  return (
    <section className="data-table-common relative rounded-sm border border-stroke bg-white py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
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
            onChange={(e) => table.setPageSize(Number(e.target.value))}
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

      <div className="overflow-x-auto z-0">
        <table className="datatable-table relative min-h-[300px] datatable-one w-full table-auto border-collapse break-words px-4 md:table-fixed md:px-8">
          <HeaderTable table={table} />
          <tbody>
            {table.getRowModel().rows.length === 0 && (
              <tr>
                <td
                  colSpan={columns.length}
                  className="text-center py-10 text-gray-500"
                >
                  No hay registros disponibles
                </td>
              </tr>
            )}

            {table.getRowModel().rows.map((row) => {
              const rowBaseClass =
                "border-t border-stroke dark:border-strokedark transition duration-300";
              const hoverClass = row.getIsExpanded()
                ? ""
                : "hover:bg-gray-2 hover:dark:bg-meta-4";
              const rowClass = `${rowBaseClass} ${hoverClass} ${
                row.getIsExpanded() ? "bg-stroke dark:bg-strokedark" : ""
              }`;

              return (
                <React.Fragment key={row.id}>
                  <tr
                    className={rowClass}
                    onClick={() => row.toggleExpanded()}
                    style={{ cursor: "pointer", textAlign: "center" }}
                    
                  >
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-2 py-4 text-base">
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>

                  {row.getIsExpanded() && (
                    <tr className={rowClass}>
                      <td colSpan={columns.length} className="px-4 py-4">
                        <SaleDetails columns={columns} row={row} />
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      <Pagination table={table} />
    </section>
  );
};

export default SalesTable;
