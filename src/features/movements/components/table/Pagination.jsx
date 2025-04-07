import React from "react";
import ArrowDatatableRight from "../../../../assets/icons/arrow-datatable-right.svg?react";
import ArrowDatatableLeft from "../../../../assets/icons/arrow-datatable-left.svg?react";

const Pagination = ({ table }) => {
  return (
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
  );
};

export default Pagination;
