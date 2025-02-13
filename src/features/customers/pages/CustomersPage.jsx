import { useState } from "react";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import CustomerList from "../components/CustomerList";
import ModalCreateCustomer from "../components/ModalCreateCustomer";

const CustomersPage = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <BreadCrumb pageName="Clientes" />
      <button
        className="flex justify-center min-w-1/4 rounded bg-primary py-3 px-5 my-3 font-medium text-gray hover:bg-opacity-90"
        onClick={() => setOpen(true)} 
      >
        Añadir cliente
      </button>
      <CustomerList />
      <ModalCreateCustomer open={open} onClose={() => setOpen(false)} />
    </>
  );
};

export default CustomersPage;
