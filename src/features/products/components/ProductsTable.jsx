import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useProducts } from "../hooks/useProducts";
import { columns } from "./table/columns";
import Pagination from "./table/Pagination";
import { Fragment, useEffect, useState } from "react";
import HeaderTable from "./table/HeaderTable";

const ProductsTable = () => {
  const { products, loadProducts, error, loading } = useProducts();

  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  useEffect(() => {
    loadProducts({activate:true});
  }, [loadProducts]);

  const table = useReactTable({
    data: products || [],
    columns,
    state: { globalFilter, pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
  });

  if (loading) return <div>Cargando Productos...</div>;
  if (error) return <div>Error: {error.message}</div>;


  return(
    <section className="relative  rounded-sm border border-stroke bg-white py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
      <div className="flex flex-wrap justify-between px-8 pb-4 space-y-4 md:space-y-0 md:flex-nowrap">
        <div className="w-full md:w-1/2">
          <input
            type="text"
            placeholder="Buscar en toda la tabla..."
            onChange={(e) => setGlobalFilter(e.target.value)}
            value={globalFilter}
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
      <div className="overflow-x-auto z-0 min-h-[250]">
        <table className="datatable-table relative  datatable-one w-full table-auto border-collapse break-words px-4 md:table-fixed md:px-8">
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
            {table.getRowModel().rows.map((row) => (
              <tr
                key={row.id}
                className="border-t border-stroke dark:border-strokedark hover:bg-gray-2 hover:dark:bg-meta-4 text-center"
              >
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-2 py-4 text-base">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination table={table} />
    </section>
  );
};

export default ProductsTable;
