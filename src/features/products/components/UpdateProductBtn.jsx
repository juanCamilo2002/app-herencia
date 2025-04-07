import React, { useState } from 'react'
import ModalUpdateProduct from './ModalUpdateProduct';

const UpdateProductBtn = ({product}) => {
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
        <ModalUpdateProduct open={open} onClose={onClose} product={product}/>
      </>
    );
}

export default UpdateProductBtn