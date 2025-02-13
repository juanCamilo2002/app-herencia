import ModalContainer from "../../../components/modals/ModalContainer";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { DialogTitle } from "@headlessui/react";

const ModalDeleteCustomer = ({ open, onClose, onAccept }) => {
  
 

  return (
    <ModalContainer open={open} handleClose={onClose}>
      <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4 dark:border-strokedark dark:bg-boxdark">
        <div className="sm:flex sm:items-start">
          <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-danger/30 sm:mx-0 sm:size-10">
            <ExclamationTriangleIcon
              aria-hidden="true"
              className="size-6 text-danger"
            />
          </div>
          <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
            <DialogTitle
              as="h3"
              className="text-base font-semibold dark:text-white"
            >
              Desactivar cliente
            </DialogTitle>
            <div className="mt-2">
              <p className="text-sm dark:text-gray">
                Estas seguro que deseas desactivar ese cliente? Todos sus datos
                se ocultaran. para volver a activarlo deberas contactar con el
                administrador.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="button"
          onClick={onAccept}
          className="inline-flex w-full justify-center rounded-md bg-danger px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-red-500 sm:ml-3 sm:w-auto"
        >
          Desactivar
        </button>
        <button
          type="button"
          data-autofocus
          onClick={onClose}
          className="mt-3 inline-flex w-full justify-center rounded-md text-white bg-primary px-3 py-2 text-sm font-semibold   shadow-xs  ring-inset hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          Cancelar
        </button>
      </div>
    </ModalContainer>
  );
};

export default ModalDeleteCustomer;
