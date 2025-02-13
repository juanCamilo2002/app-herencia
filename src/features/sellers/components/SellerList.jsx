import { useEffect, useMemo } from "react";
import DataTable from "../../../components/datatable/Datatable";
import { useSellers } from "../hooks/useSellers";
import DeleteSellerBtn from "./DeleteSellerBtn";
import UpdateSellerBtn from "./UpdateSellerBtn";

const SellerList = () => {
  const { sellers, loadSellers, loading, error } = useSellers();

  useEffect(() => {
    loadSellers({ activate: true });
  }, [loadSellers]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "entityId.name",
        header: "Nombre",
        size: 200,
      },
      {
        accessorKey: "entityId.lastName",
        header: "Apellidos",
        size: 200,
      },
      {
        accessorKey: "entityId.email",
        header: "Correo",
        size: 300,
      },
      {
        accessorKey: "entityId.phone",
        header: "Teléfono",
        size: 200,
      },
      {
        accessorKey: "entityId.address",
        header: "Dirección",
        size: 200,
      },
      {
        accessorKey: "entityId.city",
        header: "Ciudad",
        size: 200,
      },
      {
        accessorKey: "entityId.identification",
        header: "Identificación",
        size: 200,
      },
      {
        accessorKey: "entityId.identificationTypeId.name",
        header: "T. Identificación",
        size: 200,
        cell: ({ getValue }) => getValue().toUpperCase(),
      },
      // {
      //   accessorKey: "status",
      //   header: "Estado",
      //   size: 200,
      //   cell: ({ getValue }) => (getValue() ? "Activo" : "Inactivo"),
      //   filterFn: (row, columnId, filterValue) => {
      //     const value = row.getValue(columnId);
      //     const displayValue = value ? "Activo" : "Inactivo";
      //     return displayValue.toLowerCase().includes(filterValue.toLowerCase());
      //   },
      // },
      {
        accessorKey: "entityId.typeEntity",
        header: "Tipo Entidad",
        size: 200,
        cell: ({ getValue }) =>
          getValue() === "person" ? "Persona" : "Empresa",
        filterFn: (row, columnId, filterValue) => {
          const value = row.getValue(columnId);
          const displayValue = value === "person" ? "Persona" : "Empresa";
          return displayValue.toLowerCase().includes(filterValue.toLowerCase());
        },
      },
      {
        header: "Acciones",
        size: 200,
        cell: ({ row }) => {
          const sellerId = row.original._id;

          const seller = {
            _id: row.original._id,
            name: row.original.entityId.name,
            lastName: row.original.entityId.lastName,
            email: row.original.entityId.email,
            phone: row.original.entityId.phone,
            address: row.original.entityId.address,
            city: row.original.entityId.city,
            identification: row.original.entityId.identification,
            identificationTypeId: row.original.entityId.identificationTypeId._id,
            typeEntity: row.original.entityId.typeEntity,

          }
          return (
            <div className="flex justify-center gap-2">
              <UpdateSellerBtn seller={seller} />
              <DeleteSellerBtn sellerId={sellerId} />
            </div>
          );
        },
      },
    ],
    []
  );

  if (!sellers.length) {
    return <p>No hay vendedores</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="data-table-common rounded-sm border border-stroke bg-white py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
      <DataTable data={sellers} columns={columns} loading={loading} />
    </section>
  );
};

export default SellerList;
