import { useState } from "react";
import { useCustomers } from "../hooks/useCustomers";
import ModalDeleteCustomer from "./ModalDeleteCustomer";

const DeleteCustomerBtn = ({ customerId }) => {
  const { removeCustomer } = useCustomers();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    removeCustomer(customerId);
    setOpen(false);
  };
  
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-2 text-sm font-medium text-white bg-danger rounded shadow-md transition-all hover:bg-opacity-90 hover:shadow-lg"
      >
        Eliminar
      </button>
      <ModalDeleteCustomer
        open={open}
        onClose={() => setOpen(false)}
        onAccept={handleDelete}
      />
    </>
  );
};

export default DeleteCustomerBtn;
