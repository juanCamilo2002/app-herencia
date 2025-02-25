import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  getExpandedRowModel,
  flexRender,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { useLiquidations } from "../hooks/useLiquidations";
import { useState, useEffect } from "react";
import ArrowDatatableRight from "../../../assets/icons/arrow-datatable-right.svg?react";
import ArrowDatatableLeft from "../../../assets/icons/arrow-datatable-left.svg?react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { format } from "date-fns";
import { es } from "date-fns/locale";
import { toZonedTime } from "date-fns-tz";

const LiquidationTable = () => {
  const { liquidations, loading, error, loadLiquidations } = useLiquidations();
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0, // Página actual
    pageSize: 10, // Tamaño de página
  });

  useEffect(() => {
    loadLiquidations();
  }, [loadLiquidations]);
  const columns = [
    {
      id: "expander",
      header: () => null,
      size: 10,
      cell: ({ row }) => (
        <button
          onClick={() => row.toggleExpanded()}
          className="text-blue-500 hover:underline flex justify-center items-center"
        >
          {row.getIsExpanded() ? (
            <ChevronDownIcon className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronRightIcon className="h-5 w-5 text-gray-500" />
          )}
        </button>
      ),
    },
    {
      accessorKey: "sale.customer.companyName",
      header: "Cliente",
      size: 300,
    },
    {
      accessorKey: "sale.seller.entityId.name",
      header: "Vendedor",
      size: 300,
      cell: ({ row }) =>
        row.original.sale.seller.entityId.name +
        " " +
        row.original.sale.seller.entityId.lastName,
      filterFn: (row, id, filterValue) => {
        const fullName = `${row.original.sale.seller.entityId.name} ${row.original.sale.seller.entityId.lastName}`;
        return fullName
          .toString()
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      },
    },
    {
      accessorKey: "sale.total",
      header: "Total venta",
      size: 200,
      cell: ({ getValue }) => {
        return `$${getValue().toLocaleString()}`;
      },
    },
    {
      accessorKey: "totalCommission",
      header: "Valor comisión",
      size: 200,
      cell: ({ getValue }) => {
        return `$${getValue().toLocaleString()}`;
      },
    },
    {
      accessorKey: "statusPay",
      header: "Estado de Pago",
      cell: ({ getValue }) => {
        switch (getValue()) {
          case "ready":
            return "Lista";
          case "pending":
            return "Pendiente";
          default:
            return "No aplica";
        }
      },
      filterFn: (row, id, filterValue) => {
        if (!filterValue) return true;
        return row.getValue(id) === filterValue;
      },
      size: 200,
    },
    {
      accessorKey: "statusLiquidation",
      header: "Estado comisión",
      cell: ({ getValue }) => {
        return getValue() ? "Pagado" : "Pendiente";
      },

      size: 200,
    },

    {
      accessorKey: "date",
      header: "Fecha",
      cell: ({ getValue }) => {
        const localDate = toZonedTime(getValue(), "America/Bogota");

        return format(localDate, "EEEE d 'de' MMMM 'de' yyyy", {
          locale: es,
        });
      },
      size: 200,
    },
  ];

  const table = useReactTable({
    data: liquidations || [],
    columns,
    state: { globalFilter, pagination },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    getRowCanExpand: () => true, // Habilita la expansión de filas
  });

  if (loading) return <p>Cargando liquidaciones...</p>;
  if (error) return <p>Error al cargar las liquidaciones.</p>;

  return (
    <section className="data-table-common rounded-sm border border-stroke bg-white py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
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

      <div className="overflow-x-auto dark:bg-gray-800 dark:scrollbar-thumb-gray-600 dark:scrollbar-track-gray-900 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100  ">
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
                      {/* Input para filtrar por columna */}
                      {header.column.getCanFilter() &&
                        (header.column.id === "statusPay" ? (
                          <select
                            value={header.column.getFilterValue() || ""}
                            onChange={(e) =>
                              header.column.setFilterValue(
                                e.target.value === "true"
                              )
                            }
                            className="w-full min-w-[150px] rounded border-[1.5px] border-stroke px-3 py-1 font-normal outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
                          >
                            <option value="">Todos</option>
                            <option value="true">Lista</option>
                            <option value="false">Pendiente</option>
                          </select>
                        ) : (
                          <input
                            type="text"
                            value={header.column.getFilterValue() || ""}
                            onChange={(e) =>
                              header.column.setFilterValue(e.target.value)
                            }
                            className="w-full min-w-[150px] rounded border-[1.5px] border-stroke px-3 py-1 font-normal outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
                          />
                        ))}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <>
                <tr
                  key={row.id}
                  className={`border-t border-stroke dark:border-strokedark hover:bg-gray-2 hover:dark:bg-meta-4 transition duration-300 ${
                    row.getIsExpanded() ? "bg-stroke dark:bg-strokedark" : ""
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-4 py-5">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>

                {row.getIsExpanded() && (
                  <tr className="border-t border-stroke dark:border-strokedark hover:bg-gray-2 hover:dark:bg-meta-4">
                    <td colSpan={columns.length} className="px-4 py-5">
                      <h3 className="text-lg text-primary font-semibold">
                        Detalle de la liquidación
                      </h3>
                      <table className="datatable-table datatable-one border-b border-stroke dark:border-strokedark w-full table-auto border-collapse overflow-hidden break-words px-4 md:table-fixed md:overflow-auto md:px-8">
                        <thead className="border-separate px-4">
                          <tr>
                            <th className="p-2 ">Producto</th>
                            <th className="p-2 ">Cantidad</th>
                            <th className="p-2 ">Valor Unitario</th>
                            <th className="p-2 ">Porcentaje de comisión</th>
                            <th className="p-2 ">Valor comisión producto</th>
                          </tr>
                        </thead>
                        <tbody>
                          {row.original.details.map((item) => (
                            <tr
                              key={item.product._id}
                              className="border-t border-stroke text-center dark:border-strokedark"
                            >
                              <td className="px-4 py-5">{item.product.name}</td>
                              <td className="px-4 py-5">{item.quantity}</td>
                              <td className="px-4 py-5">
                                ${item.unitValue.toLocaleString()}
                              </td>
                              <td className="px-4 py-5">{item.percent}%</td>
                              <td className="px-4 py-5">
                                ${item.commissionValue.toLocaleString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
              </>
            ))}
          </tbody>
        </table>
      </div>

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
    </section>
  );
};

export default LiquidationTable;
