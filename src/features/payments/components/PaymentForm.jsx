import React, { useEffect } from "react";
import InputForm from "../../../components/forms/inputs/InputForm";
import { useFormik } from "formik";
import { usePaymentMethods } from "../../common/hooks/usePaymentMethods";
import SelectFilter from "../../../components/forms/selects/SelectFilter";
import { paymentSchema } from "./paymentSchema";
import { usePayments } from "../hooks/usePayments";

const PaymentForm = ({ sale, onClose, initialValues }) => {
  const { loadPaymentMethods, paymentMethods } = usePaymentMethods();
  const { createCustomerPayment, updateCustomerPayment } = usePayments();

    
  useEffect(() => {
    loadPaymentMethods();
  }, [loadPaymentMethods]);

  useEffect(() => {
    if (initialValues) {
        formik.setFieldValue("paymentDate", new Date(initialValues.paymentDate).toISOString().split("T")[0]);
        formik.setFieldValue("amount", initialValues.amount);
        formik.setFieldValue("paymentMethod", {
          value: initialValues.paymentMethod._id,
          label: initialValues.paymentMethod.name,
        });

    }
  }, [initialValues]);

  const formik = useFormik({
    initialValues: {
      sale: sale,
      amount: "",
      paymentMethod: "",
      paymentDate: "", 
    },
    validationSchema: paymentSchema,
    onSubmit: (values) => {
      values.paymentMethod = values.paymentMethod.value;
      if (initialValues) {
        values._id = initialValues._id;
        values.sale = initialValues.sale;
        updateCustomerPayment(initialValues, values);
      } else {
        createCustomerPayment(values);
      }
      onClose();
    },
  });
  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
      <form onSubmit={formik.handleSubmit}>
        <InputForm
          label="Fecha de pago"
          type="date"
          maxWidth
          name="paymentDate"
          value={formik.values.paymentDate}
          onChange={formik.handleChange}
          error={formik.touched.paymentDate && formik.errors.paymentDate}
        />
        <InputForm
          label="Monto"
          type="number"
          placeholder="0"
          maxWidth
          name="amount"
          value={formik.values.amount}
          onChange={formik.handleChange}
          error={formik.touched.amount && formik.errors.amount}
        />

        <SelectFilter
          label="Método de pago"
          name="paymentMethod"
          placeholder="Seleccionar"
          maxWidth
          value={formik.values.paymentMethod}
          options={paymentMethods.map((paymentMethod) => ({
            value: paymentMethod._id,
            label: paymentMethod.name,
          }))}
          onChange={(option) => formik.setFieldValue("paymentMethod", option)}
          error={formik.touched.paymentMethod && formik.errors.paymentMethod}
        />
        <button
          type="submit"
          className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray disabled:bg-opacity-50 disabled:cursor-not-allowed disabled:border-opacity-50"
        >
          Añadir Abono
        </button>
      </form>
    </div>
  );
};

export default PaymentForm;
