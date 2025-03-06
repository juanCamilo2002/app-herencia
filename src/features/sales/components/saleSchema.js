import * as yup from "yup";

export const saleSchema = yup.object().shape({
  customer: yup.object().required("El cliente es requerido"),
  seller: yup.object().required("El vendedor es requerido"),
  paymentMethod: yup.object().required("El método de pago es requerido"),
  saleType: yup.object().required("El tipo de venta es requerido"),
  paymentType: yup.string().required("El modo de venta es requerido"),
  contributed: yup.number()
    .min(0, "Debe ser mayor o igual a 0")
    .default(0) // Establece un valor predeterminado de 0
    .transform((value) => (isNaN(value) ? 0 : value)) // Convierte undefined o NaN en 0
    .test(
      "maxContributed",
      "El abono no puede ser mayor al total",
      function (value) {
        const total = this.parent.items.reduce(
          (acc, item) => acc + (item.quantity || 0) * (item.unitValue || 0),
          0
        );
        return value <= total;
      }
    ),
  date: yup.date().required("La fecha de venta es requerida"),
  items: yup.array()
    .of(
      yup.object().shape({
        product: yup.object().required("El producto es requerido"),
        quantity: yup.number()
          .min(1, "Debe ser al menos 1")
          .required("Cantidad requerida"),
        unitValue: yup.number()
          .min(0, "Debe ser al menos 0")
          .required("Precio requerido"),
      })
    )
    .min(1, "Debe agregar al menos un producto"),
});
