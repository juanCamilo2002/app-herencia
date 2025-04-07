import React, { useState } from "react";
import ModalDeletePayment from "./ModalDeletePayment";
import { usePayments } from "../hooks/usePayments";

const BtnDeletePayment = ({payment}) => {
  const { deleteCustomerPayment } = usePayments();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    deleteCustomerPayment(payment);
    setOpen(false);
  };
  return (
    <>
      <button className="px-3 py-2 rounded-md bg-danger text-white" onClick={() => setOpen(true)}>
        Eliminar
      </button>
      <ModalDeletePayment
        open={open}
        handleClose={() => setOpen(false)}
        onAccept={handleDelete}
      />
    </>
  );
};

export default BtnDeletePayment;
