import React, { useState } from 'react'
import SalesTable from '../components/SalesTable'
import BreadCrumb from '../../../components/breadCrumb/BreadCrumb'
import ModalCreateSale from '../components/ModalCreateSale'

const Sales = () => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <BreadCrumb  pageName="Ventas"/>
      <button
        className="flex justify-center min-w-1/4 rounded bg-primary py-3 px-5 my-3 font-medium text-gray hover:bg-opacity-90"
        onClick={() => setOpen(true)}
      >
        Añadir Venta
      </button>
      <SalesTable />
      <ModalCreateSale open={open} onClose={() => setOpen(false)} />
    </>
  )
}

export default Sales