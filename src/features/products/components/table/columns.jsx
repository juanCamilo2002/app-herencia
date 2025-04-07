import DeleteProductBtn from "../DeleteProductBtn";
import UpdateProductBtn from "../UpdateProductBtn";

export const columns = [
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "price",
    header: "Precio",
  },
  {
    header: "Acciones",
    cell: ({ row }) => {
      return (
        <div className="flex justify-center gap-2">
          <UpdateProductBtn product={row.original} />
          <DeleteProductBtn productId={row.original._id} />
        </div>
      );
    },
  },
];
