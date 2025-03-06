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
import { useState, useRef, useEffect } from "react";
import ArrowDatatableRight from "../../../assets/icons/arrow-datatable-right.svg?react";
import ArrowDatatableLeft from "../../../assets/icons/arrow-datatable-left.svg?react";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const SalesTable = () => {
  const { sales, loading, error, loadSales } = useSales();
  const [globalFilter, setGlobalFilter] = useState("");
  const [pagination, setPagination] = useState({
    pageIndex: 0, // Página actual
    pageSize: 10, // Tamaño de página
  });

  useEffect(() => {
    loadSales();
  }, [loadSales]);
  const columns = [
    {
      id: "expander",
      header: () => null,
      size: 10,
      cell: ({ row }) => (
        <button
          onClick={(e) => {
            e.stopPropagation(); // Evita que el arrastre bloquee el clic en la flecha
            row.toggleExpanded();
          }}
          className="expander-button text-blue-500 hover:underline flex justify-center items-center"
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
      accessorKey: "customer.companyName",
      header: "Cliente",
      size: 300,
    },
    {
      accessorKey: "seller.entityId.name",
      header: "Vendedor",
      size: 300,
      cell: ({ row }) =>
        row.original.seller.entityId.name +
        " " +
        row.original.seller.entityId.lastName,
      filterFn: (row, id, filterValue) => {
        const fullName = `${row.original.seller.entityId.name} ${row.original.seller.entityId.lastName}`;
        return fullName
          .toString()
          .toLowerCase()
          .includes(filterValue.toLowerCase());
      },
    },
    {
      accessorKey: "total",
      header: "Total",
      cell: ({ getValue }) => {
        const value = getValue() ?? 0;
        return `$${value.toLocaleString()}`;
      },
      filterFn: (row, id, filterValue) => {
        return row.original.total.toString().includes(filterValue); 
      },
      size: 200,
    },
    {
      accessorKey: "contributed",
      header: "Abono",
      cell: ({ getValue }) => {
        const value = getValue() ?? 0;
        return `$${value.toLocaleString()}`;
      },
      filterFn: (row, id, filterValue) => {
        return row.original.contributed.toString().includes(filterValue);
      },
      size: 200,
    },
    {
      accessorKey: "hasNotPaid",
      header: "Debe",
      cell: ({ getValue }) => {
        const value = getValue() ?? 0;
        return `$${value.toLocaleString()}`;
      },
      filterFn: (row, id, filterValue) => {
        return row.original.hasNotPaid.toString().includes(filterValue);
      },
      size: 200,
    },
    {
      accessorKey: "saleType",
      header: "Tipo de Venta",
      cell: ({ getValue }) => {
        switch (getValue()) {
          case "wholesaler":
            return "Al por mayor";
          case "retailer":
            return "Detal";
        }
      },

      filterFn: (row, id, filterValue) => {
        if (!filterValue) return true;
        return row.getValue(id) === filterValue;
      },
      size: 200,
    },
    {
      accessorKey: "paymentMethod.name",
      header: "Método de Pago",
      size: 200,
    },
    {
      accessorKey: "statusPay",
      header: "Estado de Pago",
      cell: ({ getValue }) => {
        return getValue() === true ? "Pagado" : "Pendiente";
      },
      filterFn: (row, id, filterValue) => {
        if (filterValue === undefined) return true; // Mostrar todos si no hay filtro
        return row.getValue(id) === (filterValue === "true");
      },
      size: 200,
    },
    {
      accessorKey: "paymentType",
      header: "Modo de venta",
      cell: ({ getValue }) => {
        const translations = {
          cash: "Contado",
          consignment: "Consignación",
          sample: "Muestra",
        };
        return translations[getValue()] || "Desconocido";
      },
      filterFn: (row, id, filterValue) => {
        if (!filterValue) return true; // Si el filtro está vacío, no hacer nada

        // Normalizar el texto ingresado por el usuario (sin espacios y en minúsculas)
        const normalizedFilterValue = filterValue.trim().toLowerCase();

        // Mapa de traducción de valores escritos en español a claves internas
        const filterMap = {
          contado: "cash",
          consignación: "consignment",
          consignacion: "consignment", // Manejo sin tilde
          muestra: "sample",
        };

        // Obtener el valor filtrado (si no está en el mapa, usa lo que escribió el usuario)
        const expectedValue =
          filterMap[normalizedFilterValue] || normalizedFilterValue;

        // Comparar con el `paymentType` de la fila
        return row.original.paymentType === expectedValue;
      },
      size: 200,
    },
    {
      accessorKey: "date",
      header: "Fecha",
      cell: ({ getValue }) => {
        const fecha = new Date(getValue());
        const fechaUTC = new Date(
          fecha.getUTCFullYear(),
          fecha.getUTCMonth(),
          fecha.getUTCDate()
        );
        const fechaFormateada = fechaUTC.toLocaleDateString("es-ES");

        return fechaFormateada;
      },
      size: 200,
    },
  ];

  const table = useReactTable({
    data: sales || [],
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

  const scrollContainerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [draggingDistance, setDraggingDistance] = useState(0);

  const handleMouseDown = (e) => {
    if (e.target.closest(".expander-button")) return; // Si el clic es en la flecha, no activar arrastre

    setIsDragging(true);
    setStartX(e.pageX - scrollContainerRef.current.offsetLeft);
    setScrollLeft(scrollContainerRef.current.scrollLeft);
    setDraggingDistance(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();

    const x = e.pageX - scrollContainerRef.current.offsetLeft;
    const walk = (x - startX) * 1.5; // Ajustar velocidad del scroll
    scrollContainerRef.current.scrollLeft = scrollLeft - walk;

    setDraggingDistance(Math.abs(walk)); // Registrar distancia movida
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleClick = (e) => {
    // Si se arrastró más de 5px y el clic NO fue en la flecha, bloquearlo
    if (draggingDistance > 5 && !e.target.closest(".expander-button") ) {
      e.stopPropagation();
      e.preventDefault();
    }
  };

  if (loading) return <p>Cargando ventas...</p>;
  if (error) return <p>Error al cargar las ventas.</p>;

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

      <div className="  ">
        <div
          ref={scrollContainerRef}
          className="overflow-x-auto cursor-grab active:cursor-grabbing select-none  scrollbar-hide"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseUp}
          onMouseUp={handleMouseUp}
          onClick={handleClick}
        >
          <table className="datatable-table datatable-one w-full table-auto border-collapse  break-words px-4 md:table-fixed md:px-8">
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
                          (header.column.id === "saleType" ? (
                            <select
                              value={header.column.getFilterValue() || ""}
                              onChange={(e) =>
                                header.column.setFilterValue(e.target.value)
                              }
                              className="w-full min-w-[150px] rounded border-[1.5px] border-stroke px-3 py-1 font-normal outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
                            >
                              <option value="">Todos</option>
                              <option value="wholesaler">Al por mayor</option>
                              <option value="retailer">Detal</option>
                            </select>
                          ) : header.column.id === "statusPay" ? (
                            <select
                              value={header.column.getFilterValue() ?? ""}
                              onChange={(e) =>
                                header.column.setFilterValue(
                                  e.target.value === ""
                                    ? undefined
                                    : e.target.value
                                )
                              }
                              className="w-full min-w-[150px] rounded border-[1.5px] border-stroke px-3 py-1 font-normal outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
                            >
                              <option value="">Todos</option>
                              <option value="true">Pagado</option>
                              <option value="false">Pendiente</option>
                            </select>
                          ) : header.column.id === "paymentType" ? (
                            <select
                              value={header.column.getFilterValue() || ""}
                              onChange={(e) =>
                                header.column.setFilterValue(e.target.value)
                              }
                              className="w-full min-w-[150px] rounded border-[1.5px] border-stroke px-3 py-1 font-normal outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:focus:border-primary"
                            >
                              <option value="">Todos</option>
                              <option value="Contado">Contado</option>
                              <option value="Muestra">Muestra</option>
                              <option value="Consignacion">Consignación</option>
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
                    <tr className="border-t bg-stroke dark:bg-strokedark border-stroke dark:border-strokedark  hover:dark:bg-meta-4">
                      <td colSpan={columns.length} className="px-4 py-5">
                        <h3 className="text-lg text-primary font-semibold">
                          Detalle de la venta
                        </h3>
                        <table className="datatable-table datatable-one border-b border-stroke dark:border-strokedark w-full table-auto border-collapse overflow-hidden break-words px-4 md:table-fixed md:overflow-auto md:px-8">
                          <thead className="border-separate px-4">
                            <tr>
                              <th className="p-2 ">Producto</th>
                              <th className="p-2 ">Cantidad</th>
                              <th className="p-2 ">Valor Unitario</th>
                              <th className="p-2 ">Iva</th>
                              <th className="p-2 ">Impuesto al consumo</th>
                              <th className="p-2 ">Estampilla</th>
                              <th className="p-2 ">Valor neto unitario</th>
                              <th className="p-2 ">Sub total</th>
                            </tr>
                          </thead>
                          <tbody>
                            {row.original.items.map((item) => (
                              <tr
                                key={item.product._id}
                                className="border-t border-stroke text-center dark:border-strokedark"
                              >
                                <td className="px-4 py-5">
                                  {item.product.name}
                                </td>
                                <td className="px-4 py-5">{item.quantity}</td>
                                <td className="px-4 py-5">
                                  ${item.unitValue.toLocaleString()}
                                </td>

                                <td className="px-4 py-5">
                                  ${item.iva.toLocaleString()}
                                </td>
                                <td className="px-4 py-5">
                                  ${item.ipo.toLocaleString()}
                                </td>
                                <td className="px-4 py-5">
                                  ${item.stamp.toLocaleString()}
                                </td>
                                <td className="px-4 py-5">
                                  ${item.netUnitValue.toLocaleString()}
                                </td>
                                <td className="px-4 py-5">
                                  ${item.subTotal.toLocaleString()}
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

export default SalesTable;
