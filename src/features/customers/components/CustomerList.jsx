import DataTable from "../../../components/datatable/Datatable";
import { useEffect, useMemo } from "react";
import { useCustomers } from "../hooks/useCustomers";
import DeleteCustomerBtn from "./DeleteCustomerBtn";
import UpdateCustomerBtn from "./UpdateCustomerBtn";

const CustomerList = () => {
  const { customers, loadCustomers, loading, error } = useCustomers();

  useEffect(() => {
    loadCustomers();
  }, [loadCustomers]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "companyName",
        header: "Razón social",
        size: 300,
      },
      {
        accessorKey: "entityId.name",
        header: "Nombre Contacto",
        size: 200,
      },
      {
        accessorKey: "entityId.lastName",
        header: "Apellidos Contacto",
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
        accessorKey: "responsibleSeller.entityId.name",
        header: "Vendedor Responsable",
        size: 300,
        cell: ({ row }) => (
          <span>
            {row.original.responsibleSeller.entityId.name}{" "}
            {row.original.responsibleSeller.entityId.lastName}
          </span>
        ),
        filterFn: (row, columnId, filterValue) => {
          const fullName =
            `${row.original.responsibleSeller.entityId.name} ${row.original.responsibleSeller.entityId.lastName}`.toLowerCase();
          return fullName.includes(filterValue.toLowerCase());
        },
      },
      {
        header: "Acciones",
        size: 200,
        cell: ({ row }) => {

          const { original } = row;

          const customer = {
            _id: original._id,
            companyName: original.companyName,
            name: original.entityId.name,
            lastName: original.entityId.lastName,
            identification: original.entityId.identification,
            identificationTypeId: original.entityId.identificationTypeId._id,
            email: original.entityId.email,
            phone: original.entityId.phone,
            address: original.entityId.address,
            city: {
              value: original.entityId.city,
              label: original.entityId.city,
            },
            typeEntity: original.entityId.typeEntity,
            responsibleSeller: {
              value: original.responsibleSeller._id,
              label: `
              ${original.responsibleSeller.entityId.name} 
              ${original.responsibleSeller.entityId.lastName} - 
              ${original.responsibleSeller.entityId.identification} -
              ${original.responsibleSeller.status ? "Activo" : "Inactivo"}`,
            },
          }
          return (
            <div className="flex justify-center gap-2">
              <UpdateCustomerBtn customer={customer} />
              <DeleteCustomerBtn customerId={row.original._id} />
            </div>
          );
        },
      },
    ],
    []
  );

  return (
    <section className="data-table-common rounded-sm border border-stroke bg-white py-4 shadow-default dark:border-strokedark dark:bg-boxdark">
      <DataTable data={customers} columns={columns} loading={loading} />
    </section>
  );
};

export default CustomerList;
