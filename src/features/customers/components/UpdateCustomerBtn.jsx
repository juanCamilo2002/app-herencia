import { useState } from "react";
import ModaUpdateCustomer from "./ModaUpdateCustomer";

const UpdateCustomerBtn = ({ customer }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button 
      className="px-3 py-2 text-sm font-medium text-white bg-primary rounded shadow-md transition-all hover:bg-opacity-90 hover:shadow-lg"
      onClick={() => setOpen(true)}
      >
        Editar
      </button>
      <ModaUpdateCustomer
        open={open}
        onClose={() => setOpen(false)}
        customer={customer}
      />
    </>
  );
};

export default UpdateCustomerBtn;
