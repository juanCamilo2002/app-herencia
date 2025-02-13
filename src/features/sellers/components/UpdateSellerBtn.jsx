import { useState } from "react";
import ModalUpdateSeller from "./ModalUpdateSeller";

const UpdateSellerBtn = ({seller}) => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <button
        className="px-3 py-2 text-sm font-medium text-white bg-primary rounded shadow-md transition-all hover:bg-opacity-90 hover:shadow-lg"
        onClick={() => setOpen(true)}
      >
        Editar
      </button>
      <ModalUpdateSeller open={open} onClose={onClose} seller={seller}/>
    </>
  );
};

export default UpdateSellerBtn;
