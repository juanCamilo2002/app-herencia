import { useEffect, useState } from "react";
import { usePayments } from "../hooks/usePayments";
import ModalCreatePayment from "./ModalCreatePayment";
import BtnDeletePayment from "./BtnDeletePayment";
import UpdatePaymentBtn from "./UpdatePaymentBtn";

const PaymentList = ({ saleId }) => {
  const { loadPayments, payments } = usePayments();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    loadPayments({ saleId });
  }, [loadPayments, saleId]);
  return (
    <>
      <div className="space-y-2 text-sm text-gray-700">
        <div className="flex justify-between items-center">
          <h4 className="text-md font-semibold text-gray-800 mb-2">
            Registro de pagos
          </h4>
          <button
            className="bg-primary px-4 py-3 rounded-md text-white"
            onClick={() => setOpen(true)}
          >
            Añadir pago
          </button>
        </div>
        {payments.length === 0 ? (
          <p className="text-gray-500">No hay pagos registrados.</p>
        ) : (
          payments.map((pago, index) => {
            return (
              <div
                key={index}
                className="flex justify-between items-center border-b pb-1"
              >
                <span>{new Date(pago.paymentDate).toLocaleDateString()}</span>
                <span>{pago.paymentMethod.name}</span>
                <span>${pago.amount.toLocaleString()}</span>
                <div className="space-x-2">
                  <UpdatePaymentBtn initialValues={pago} />
                  <BtnDeletePayment payment={pago} />
                </div>
              </div>
            );
          })
        )}
      </div>
      <ModalCreatePayment
        open={open}
        onClose={() => setOpen(false)}
        sale={saleId}
      />
    </>
  );
};

export default PaymentList;
