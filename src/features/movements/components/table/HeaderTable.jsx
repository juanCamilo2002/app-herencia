import { flexRender } from "@tanstack/react-table";
import React, { useState, useRef, useEffect } from "react";
import { FunnelIcon, XMarkIcon } from "@heroicons/react/24/outline";

const HeaderTable = ({ table }) => {
  const [openFilterColumn, setOpenFilterColumn] = useState(null);
  const filterRef = useRef(null);

  // Cierra el filtro si se hace clic fuera
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (filterRef.current && !filterRef.current.contains(e.target)) {
        setOpenFilterColumn(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <thead className="border-separate px-4">
      {table.getHeaderGroups().map((headerGroup) => (
        <tr
          key={headerGroup.id}
          className="border-t border-stroke dark:border-strokedark"
        >
          {headerGroup.headers.map((header) => (
            <th
              key={header.id}
              className="relative px-4 py-4 cursor-pointer font-medium text-sm"
              style={{ width: header.column.getSize() }}
            >
              <div className="flex items-center justify-center gap-1">
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

                {/* Botón para desplegar filtro */}
                {header.column.getCanFilter() && (
                  <button
                    onClick={() =>
                      setOpenFilterColumn((prev) =>
                        prev === header.column.id ? null : header.column.id
                      )
                    }
                    title="Filtrar"
                  >
                    <FunnelIcon className="w-4 h-4 text-gray-500 hover:text-primary" />
                  </button>
                )}
              </div>

              {/* Modal flotante del filtro */}
              {header.column.getCanFilter() &&
                openFilterColumn === header.column.id && (
                  <div
                    ref={filterRef}
                    className="absolute z-999999 mt-2 left-1/2  -translate-x-3/4 w-48 rounded-lg border border-stroke bg-white shadow-lg p-3 dark:bg-boxdark dark:border-strokedark"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <p className="text-sm font-semibold text-black dark:text-white">Filtrar</p>
                      <button
                        onClick={() => setOpenFilterColumn(null)}
                        className="text-gray-500 hover:text-red-500"
                      >
                        <XMarkIcon className="w-4 h-4" />
                      </button>
                    </div>

                    {header.column.id === "statusPay" ? (
                      <select
                        value={header.column.getFilterValue() ?? ""}
                        onChange={(e) =>
                          header.column.setFilterValue(
                            e.target.value === "" ? undefined : e.target.value
                          )
                        }
                        className="w-full rounded border border-stroke px-2 py-1 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                      >
                        <option value="">Todos</option>
                        <option value="true">Pagado</option>
                        <option value="false">Pendiente</option>
                      </select>
                    ) : (
                      <input
                        type="text"
                        value={header.column.getFilterValue() || ""}
                        onChange={(e) =>
                          header.column.setFilterValue(e.target.value)
                        }
                        className="w-full rounded border border-stroke px-2 py-1 outline-none focus:border-primary dark:border-strokedark dark:bg-meta-4 dark:text-white"
                      />
                    )}
                  </div>
                )}
            </th>
          ))}
        </tr>
      ))}
    </thead>
  );
};

export default HeaderTable;
