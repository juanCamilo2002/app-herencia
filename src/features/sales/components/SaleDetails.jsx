import React from "react";
import PaymentList from "../../payments/components/PaymentList";

const SaleDetails = ({ row }) => {
  const sale = row.original;

  return (
    <div className="p-6 space-y-10">
      {/* Encabezado principal */}
      <h2 className="text-xl font-semibold text-primary pb-2 border-b border-gray-200">
        🧾 Detalles de la Venta
      </h2>

      {/* Información general estilizada en dos columnas ordenadas */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-y-3 gap-x-10 text-sm text-gray-800">
        <div className="flex flex-col">
          <span className="text-gray-500 font-medium">Cliente</span>
          <span>{sale.customer.companyName || "-"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 font-medium">Vendedor</span>
          <span>
            {sale.seller.entityId.name + " " + sale.seller.entityId.lastName ||
              "-"}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 font-medium">Fecha de la venta</span>
          <span>{new Date(sale.date).toLocaleDateString()}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 font-medium">Estado</span>
          <span
            className={
              sale.statusPay
                ? "text-meta-3 font-semibold"
                : "text-danger font-semibold"
            }
          >
            {sale.statusPay ? "Pagado" : "Pendiente"}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 font-medium">Tipo de venta</span>
          <span>{sale.saleType === "retailer" ? "Detal" : "Por mayor"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 font-medium">Tipo de pago</span>
          <span>
            {sale.paymentType === "cash" ? "Contado" : "Consignación"}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-500 font-medium">Método de pago</span>
          <span>{sale.paymentMethod?.name || "-"}</span>
        </div>
      </div>

      {/* Tabla de productos */}
      <div className="">
      <h4 className="text-md font-semibold text-gray-800 mb-2">Productos</h4>
        <table className="min-w-full text-sm border border-primary">
          <thead className="bg-gray-100 text-gray-700 uppercase font-semibold text-xs">
            <tr className="border border-primary">
              <th className="p-3">Producto</th>
              <th className="p-3">Cantidad</th>
              <th className="p-3">Valor unitario</th>
              <th className="p-3">IVA</th>
              <th className="p-3">Impuesto al consumo</th>
              <th className="p-3">Estampilla</th>
              <th className="p-3">Valor neto unitario</th>
              <th className="p-3">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {sale.items.map((item) => (
              <tr key={item._id} className="text-center border-t border-primary">
                <td className="p-3">{item.product.name}</td>
                <td className="p-3">{item.quantity}</td>
                <td className="p-3">${item.unitValue.toLocaleString()}</td>
                <td className="p-3">${item.iva.toLocaleString()}</td>
                <td className="p-3">${item.ipo.toLocaleString()}</td>
                <td className="p-3">${item.stamp.toLocaleString()}</td>
                <td className="p-3">${item.netUnitValue.toLocaleString()}</td>
                <td className="p-3">${item.subTotal.toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Resumen y Pagos */}
      <div className="flex flex-col md:flex-row md:items-start md:justify-end gap-x-6">
        {/* PaymentList */}
        <div className="md:w-2/3 w-full">
          <PaymentList saleId={sale._id} />
        </div>

        {/* Resumen */}
        <div className="md:w-1/3 space-y-2">
          <h4 className="text-md font-semibold text-gray-800 mb-2">Resumen</h4>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Total Venta</span>
            <span className="font-semibold">
              ${sale.total.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm text-gray-700">
            <span>Pagado</span>
            <span className="font-semibold">
              ${sale.contributed.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-700">Pendiente</span>
            <span className="font-bold text-red-600">
              ${sale.hasNotPaid.toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SaleDetails;