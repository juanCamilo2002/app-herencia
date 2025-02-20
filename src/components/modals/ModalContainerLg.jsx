import { Dialog, DialogBackdrop, DialogPanel } from "@headlessui/react";
import React from "react";

const ModalContainerLg = ({ open, children, handleClose }) => {
  return (
    <Dialog open={open} onClose={handleClose} className="relative z-999999">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-black/20 dark:bg-black/70 transition-opacity data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full items-end justify-end p-4 sm:mr-7 mr-0 text-center sm:items-center sm:p-0">
          <DialogPanel
            transition
            className="relative transform overflow-hidden rounded-lg bg-white dark:border-strokedark dark:bg-boxdark text-left shadow-xl transition-all data-closed:translate-y-4 data-closed:opacity-0 data-enter:duration-300 data-enter:ease-out data-leave:duration-200 data-leave:ease-in sm:my-8 sm:w-full sm:max-w-[50%] data-closed:sm:translate-y-0 data-closed:sm:scale-95"
          >
           {children}
          </DialogPanel>
        </div>
      </div>
    </Dialog>
  );
};

export default ModalContainerLg;
