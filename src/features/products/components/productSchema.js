import * as Yup from 'yup';

export const productSchema = Yup.object().shape({
    name: Yup.string().required("El nombre del producto es requerido"),
    price: Yup.number()
        .typeError("El precio debe ser un número")
        .min(0, "El precio no puede ser negativo")
        .required("El precio es requerido"),
});