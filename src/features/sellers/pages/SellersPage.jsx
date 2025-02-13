import { useState } from "react";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import ModalCreateSeller from "../components/ModalCreateSeller";
import SellerList from "../components/SellerList";

const SellersPage = () => {
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };
  return (
    <>
      <BreadCrumb pageName="Vendedores" />
      <button
        className="flex justify-center min-w-1/4 rounded bg-primary py-3 px-5 my-3 font-medium text-gray hover:bg-opacity-90"
        onClick={() => setOpen(true)}
      >
        Añadir vendedor
      </button>
      <SellerList />
      <ModalCreateSeller open={open} onClose={onClose} />
    </>
  );
};

export default SellersPage;
