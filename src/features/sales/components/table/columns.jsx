import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

export  const columns = [
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
      size: 200,
    },
    {
      accessorKey: "seller.entityId.name",
      header: "Vendedor",
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
      enableColumnFilter: false,
      cell: ({ getValue }) => {
        const value = getValue() ?? 0;
        return `$${value.toLocaleString()}`;
      },
      filterFn: (row, id, filterValue) => {
        return row.original.total.toString().includes(filterValue);
      }
    },
   
    {
      accessorKey: "paymentMethod.name",
      header: "Método de Pago",
    },
    {
      accessorKey: "statusPay",
      header: "Estado",
      size: 100,
      cell: ({ getValue }) => {
        return getValue() === true ? "Pagado" : "Pendiente";
      },
      filterFn: (row, id, filterValue) => {
        if (filterValue === undefined) return true; // Mostrar todos si no hay filtro
        return row.getValue(id) === (filterValue === "true");
      },
    },
    
    {
      accessorKey: "date",
      header: "Fecha",
      size: 100,
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
    },
  ];