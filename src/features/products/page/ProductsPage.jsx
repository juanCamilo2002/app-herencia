import { useState } from "react";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import ProductsTable from "../components/ProductsTable";
import ModalCreateProduct from "../components/ModalCreateProduct";

const ProductsPage = () => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <BreadCrumb pageName="Productos" />
      <button
        className="flex justify-center min-w-1/4 rounded bg-primary py-3 px-5 my-3 font-medium text-gray hover:bg-opacity-90"
        onClick={() => setOpen(true)}
      >
        Añadir Producto
      </button>
      <ProductsTable />
      <ModalCreateProduct open={open} onClose={onClose} />
    </>
  );
};

export default ProductsPage;
