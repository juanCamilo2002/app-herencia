import { useState } from "react";
import { useSellers } from "../hooks/useSellers";
import ModalDeleteSeller from "./ModalDeleteSeller";

const DeleteSellerBtn = ({ sellerId }) => {
  const { removeSeller } = useSellers();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    removeSeller(sellerId);
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
      <ModalDeleteSeller
        open={open}
        onCLose={() => setOpen(false)}
        onAccept={handleDelete}
      />
    </>
  );
};

export default DeleteSellerBtn;
