import React from "react";
import ModalContainer from "../../../components/modals/ModalContainer";
import { DialogTitle } from "@headlessui/react";
import { ShoppingCartIcon } from "@heroicons/react/24/outline";
import PaymentForm from "./paymentForm";

const ModalCreatePayment = ({ open, onClose, sale }) => {
  return (
    <ModalContainer open={open} handleClose={onClose}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:bg-boxdark dark:border-strokedark">
        <div className="sm:flex sm:items-start dark:bg-boxdark dark:border-strokedark">
          <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-meta-5 bg-opacity-30 sm:mx-0 sm:size-10">
            <ShoppingCartIcon
              aria-hidden="true"
              className="size-6 text-primary"
            />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <DialogTitle
              as="h3"
              className="text-base font-semibold dark:text-white"
            >
              Añadir nuevo Abono
            </DialogTitle>
            <div className="mt-2">
              <p className="text-sm dark:text-gray">
                Llena los campos para añadir un nuevo abono.
              </p>
            </div>
          </div>
        </div>
      </div>
      <PaymentForm sale={sale} onClose={onClose}/>
    </ModalContainer>
  );
};

export default ModalCreatePayment;
