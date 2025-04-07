import { useState } from "react";
import { useProducts } from "../hooks/useProducts";
import ModalDeleteProduct from "./ModalDeleteProduct";

const DeleteProductBtn = ({ productId }) => {
  const { removeProduct } = useProducts();
  const [open, setOpen] = useState(false);

  const handleDelete = () => {
    removeProduct(productId);
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
      <ModalDeleteProduct
        open={open}
        onCLose={() => setOpen(false)}
        onAccept={handleDelete}
      />
    </>
  );
};

export default DeleteProductBtn;
