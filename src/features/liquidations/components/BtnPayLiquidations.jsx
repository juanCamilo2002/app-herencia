import React, { useEffect } from "react";
import SelectFilter from "../../../components/forms/selects/SelectFilter";
import { useSellers } from "../../sellers/hooks/useSellers";
import { useFormik } from "formik";
import * as Yup from "yup";
import { usePayLiquidations } from "../hooks/usePayLiquidations";
import { ExclamationCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";

const payLiquidationsSchema = Yup.object().shape({
  id: Yup.mixed().required("El vendedor es requerido"),
});

const BtnPayLiquidations = () => {
  const { sellers, loadSellers } = useSellers();
  const { processLiquidation, loading, error, dismissError } = usePayLiquidations();

  useEffect(() => {
    loadSellers({ activate: true });
  }, [loadSellers]);

  useEffect(() => {
    if (error) {
      const timer = setTimeout(() => {
        dismissError(); // Limpiar error después de 5 segundos
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const formik = useFormik({
    initialValues: {
      id: null,
    },
    validationSchema: payLiquidationsSchema,
    onSubmit: (values) => {
      if (values.id) {
        processLiquidation(values.id.value);
      }
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="">
        <div className="flex flex-col gap-2 md:flex-row">
          <SelectFilter
            placeholder="Seleccionar Vendedor"
            options={sellers.map((seller) => ({
              value: seller._id,
              label: `${seller.entityId.name} ${seller.entityId.lastName}`,
            }))}
            onChange={(option) => formik.setFieldValue("id", option)}
          />
          <button
            type="submit"
            className="flex justify-center min-w-1/4 rounded bg-primary py-3 px-5 my-3 font-medium text-gray hover:bg-opacity-90"
          >
            {loading ? "Procesando..." : "Pagar Liquidaciones"}
          </button>
        </div>
        {formik.touched.id && formik.errors.id && (
          <span className="text-danger text-sm">{formik.errors.id}</span>
        )}
      </form>
      {error && (
        <div className="flex justify-between max-w-md bg-danger p-3 rounded-sm mb-3 text-white">
          <div className="flex gap-4 ">
            <ExclamationCircleIcon className="h-6 w-6 text-gray-500" />
            <span>{error}</span>
          </div>
          <XCircleIcon
            className="h-6 w-6 text-gray-500 cursor-pointer"
            onClick={dismissError}
          />
        </div>
      )}
    </>
  );
};

export default BtnPayLiquidations;
