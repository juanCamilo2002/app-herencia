import * as Yup from "yup";

export const validationSchema = Yup.object({
  name: Yup.string().when("useExistingEntity", {
    is: false,
    then: (schema) => schema.required("El nombre es requerido"),
  }),
  lastName: Yup.string().when("useExistingEntity", {
    is: false,
    then: (schema) => schema.required("El apellido es requerido"),
  }),
  email: Yup.string()
    .email("Email inválido")
    .when("useExistingEntity", {
      is: false,
      then: (schema) => schema.required("El correo es requerido"),
    }),
  identificationTypeId: Yup.string().when("useExistingEntity", {
    is: false,
    then: (schema) => schema.required("El tipo de identificación es requerido"),
  }),
  identification: Yup.string().when("useExistingEntity", {
    is: false,
    then: (schema) => schema.required("La identificación es requerida"),
  }),
  phone: Yup.string().when("useExistingEntity", {
    is: false,
    then: (schema) => schema.required("El teléfono es requerido"),
  }),
  address: Yup.string().when("useExistingEntity", {
    is: false,
    then: (schema) => schema.required("La dirección es requerida"),
  }),
  city: Yup.object().when("useExistingEntity", {
    is: false,
    then: (schema) => schema.required("La ciudad es requerida"),
  }),
  typeEntity: Yup.string().when("useExistingEntity", {
    is: false,
    then: (schema) => schema.required("El tipo de entidad es requerido"),
  }),
  companyName: Yup.string().required("La razón social es requerida"),
  entityId: Yup.string().when("useExistingEntity", {
    is: true,
    then: (schema) => schema.required("La entidad es requerida"),
  }),
  responsibleSeller: Yup.object().required(
    "El vendedor responsable es requerido"
  ),
});