import { ArrowUpIcon } from "@heroicons/react/24/outline";
import { ArrowDownIcon } from "@heroicons/react/24/outline";

export const columns = [
  {
    accessorKey: "type",
    header: "Tipo de movimiento",
    cell: ({ getValue }) => {
      return (
        <div className=" flex items-center justify-center gap-1">
          {getValue() === "income" ? (
            <div className="flex items-center gap-1">
              <ArrowUpIcon className="w-5 h-5 text-success" />
              <span>Ingreso</span>
            </div>
          ) : (
            <div className="flex items-center gap-1">
              <ArrowDownIcon className="w-5 h-5 text-danger" />
              <span>Egreso</span>
            </div>
          )}
        </div>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Monto",
    cell: ({ getValue }) => {
      return `$${getValue().toLocaleString()}`;
    },
    enableColumnFilter: false,
  },
  {
    accessorKey: "description",
    header: "Descripción",
    enableColumnFilter: false,
  },
  {
    accessorKey: "paymentMethod.name",
    header: "Método de Pago",
  },
  {
    accessorKey: "date",
    header: "Fecha",
    cell: ({ getValue }) => {
      const date = new Date(getValue());
      return date.toLocaleDateString();
    },
  },
];
