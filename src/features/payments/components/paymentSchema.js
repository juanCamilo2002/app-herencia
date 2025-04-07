import * as Yup from 'yup';

export const paymentSchema = Yup.object().shape({
    amount: Yup.number()
        .min(0, "Debe ser mayor o igual a 0")
        .required("La cantidad es requerida"),
    paymentMethod: Yup.object().required("El método de pago es requerido"),
    paymentDate: Yup.date().required("La fecha de pago es requerida"),
});