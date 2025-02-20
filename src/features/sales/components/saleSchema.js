import * as yup from "yup";

export const saleSchema = yup.object().shape({
  customer: yup.object().required("El cliente es requerido"),
  seller: yup.object().required("El vendedor es requerido"),
  paymentMethod: yup.object().required("El método de pago es requerido"),
  saleType: yup.object().required("El tipo de venta es requerido"),
  contributed: yup.number()
    .min(0, "Debe ser mayor o igual a 0")
    .required("El abono es requerido"),
  date: yup.date().required("La fecha de venta es requerida"),
  items: yup.array()
    .of(
      yup.object().shape({
        product: yup.object().required("El producto es requerido"),
        quantity: yup.number()
          .min(1, "Debe ser al menos 1")
          .required("Cantidad requerida"),
        unitValue: yup.number()
          .min(1, "Debe ser al menos 1")
          .required("Precio requerido"),
      })
    )
    .min(1, "Debe agregar al menos un producto"),
});
