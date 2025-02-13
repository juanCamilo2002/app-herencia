import React, { useEffect, useState } from "react";
import InputField from "../../../components/forms/InputField";
import ArrowDropDownIcon from "../../../assets/icons/arrow-dropdown.svg?react";
import * as Yup from "yup";
import { useFormik } from "formik";
import { useSellers } from "../hooks/useSellers";
import { useIdentificationTypes } from "../../common/hooks/useIdentificationTypes";
import { useEntities } from "../../entities/hooks/useEntitites";

const validationSchema = Yup.object({
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
  city: Yup.string().when("useExistingEntity", {
    is: false,
    then: (schema) => schema.required("La ciudad es requerida"),
  }),
  typeEntity: Yup.string().when("useExistingEntity", {
    is: false,
    then: (schema) => schema.required("El tipo de entidad es requerido"),
  }),
  entityId: Yup.string().when("useExistingEntity", {
    is: true,
    then: (schema) => schema.required("La entidad es requerida"),
  }),
});

const FormSeller = ({ onClose, initialValues = {} }) => {
  const { addSeller, loading, error, editSeller } = useSellers();
  const { identificationTypes, loadIdentificationTypes } =
    useIdentificationTypes();
  const { entities, loadEntities } = useEntities();
  const [cities, setCities] = useState([]);

  const [useExistingEntity, setUseExistingEntity] = useState(false);

  useEffect(() => {
    loadEntities();
    loadIdentificationTypes();
  }, [loadIdentificationTypes, loadEntities]);

  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await fetch(`https://api-colombia.com/api/v1/City`);
        const data = await response.json();
        setCities(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCities();
  }, []);

  const defaultValues = {
    useExistingEntity: false,
    entityId: "",
    name: "",
    lastName: "",
    email: "",
    identificationTypeId: "",
    identification: "",
    phone: "",
    address: "",
    city: "",
    typeEntity: "",
    ...initialValues,
  };
  const formik = useFormik({
    initialValues: defaultValues,
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values, { resetForm }) => {
      if (initialValues._id) {
        const { _id, entityId, ...restValues } = values;
        editSeller(_id, restValues);
      } else {
        addSeller(values);
        resetForm();
        // if (!error) {
        //   onClose();
        // }
      }
    },
  });

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
      <form onSubmit={formik.handleSubmit}>
        <div className="p-6.5">
          {!initialValues._id ? (
            <>
              <label className="mb-2.5 block text-black dark:text-white">
                Seleccione una opción
              </label>
              <div className="my-5 flex flex-col gap-6 xl:flex-row">
                {/* Opción Nueva Entidad */}
                <label className="flex cursor-pointer select-none items-center">
                  <div className="relative">
                    <input
                      type="radio"
                      name="entityOption"
                      value="new"
                      checked={!useExistingEntity}
                      onChange={() => {
                        setUseExistingEntity(false);
                        formik.setFieldValue("useExistingEntity", false);
                        formik.setFieldValue("entityId", "");
                      }}
                      className="sr-only"
                    />
                    <div
                      className={`box mr-4 flex h-5 w-5 items-center justify-center rounded-full border border-primary ${
                        !useExistingEntity && "!border-4"
                      }`}
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-white dark:bg-transparent"></span>
                    </div>
                  </div>
                  Nueva Entidad
                </label>

                {/* Opción Entidad Existente */}
                <label className="flex cursor-pointer select-none items-center">
                  <div className="relative">
                    <input
                      type="radio"
                      name="entityOption"
                      value="existing"
                      checked={useExistingEntity}
                      onChange={() => {
                        setUseExistingEntity(true);
                        formik.setFieldValue("useExistingEntity", true);
                      }}
                      className="sr-only"
                    />
                    <div
                      className={`box mr-4 flex h-5 w-5 items-center justify-center rounded-full border border-primary ${
                        useExistingEntity && "!border-4"
                      }`}
                    >
                      <span className="h-2.5 w-2.5 rounded-full bg-white dark:bg-transparent"></span>
                    </div>
                  </div>
                  Entidad Existente
                </label>
              </div>
            </>
          ) : null}

          {useExistingEntity ? (
            <div className="mb-4.5">
              <label className="mb-2.5 block text-black dark:text-white">
                Seleccionar Entidad Existente <span className="text-meta-1">*</span>
              </label>
              <div className="relative z-20 bg-transparent dark:bg-form-input">
                <select
                  className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="entityId"
                >
                  <option value="">Seleccione una entidad</option>
                  {entities.map((entity) => (
                    <option key={entity._id} value={entity._id}>
                      {entity.name} {entity.lastName} - {entity.identification}
                    </option>
                  ))}
                </select>
                <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                  <ArrowDropDownIcon className="fill-current" />
                </span>
              </div>
              {formik.errors.entityId && formik.touched.entityId && (
                    <span className="text-danger text-sm">
                      {formik.errors.entityId}
                    </span>
                  )}
            </div>
          ) : (
            <>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Nombre <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Jhon"
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                  ${
                    formik.errors.name &&
                    formik.touched.name &&
                    "border-danger dark:border-danger"
                  }
                  `}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="name"
                  />
                  {formik.errors.name && formik.touched.name && (
                    <span className="text-danger text-sm">
                      {formik.errors.name}
                    </span>
                  )}
                </div>

                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Apellidos <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Doe"
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                  ${
                    formik.errors.lastName &&
                    formik.touched.lastName &&
                    "border-danger dark:border-danger"
                  }
                  `}
                    value={formik.values.lastName}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="lastName"
                  />
                  {formik.errors.lastName && formik.touched.lastName && (
                    <span className="text-danger text-sm">
                      {formik.errors.lastName}
                    </span>
                  )}
                </div>
              </div>

              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Correo Electrónico <span className="text-meta-1">*</span>
                </label>
                <input
                  type="email"
                  placeholder="juan@ejemplo.com"
                  className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                 ${
                   formik.errors.email &&
                   formik.touched.email &&
                   "border-danger dark:border-danger"
                 }
                `}
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="email"
                />
                {formik.errors.email && formik.touched.email && (
                  <span className="text-danger text-sm">
                    {formik.errors.email}
                  </span>
                )}
              </div>

              {/* <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
            Subject
            </label>
            <input
            type="text"
            placeholder="Select subject"
            className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            />
            </div> */}

              {/* <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Tipo Identificación
            </label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <select className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary">
                <option value="">CC</option>
                <option value="">NIT</option>
              </select>
              <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                <ArrowDropDownIcon className="fill-current" />
              </span>
            </div>
          </div> */}
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Tipo de entidad <span className="text-meta-1">*</span>
                </label>
                <div className="relative z-20 bg-transparent dark:bg-form-input">
                  <select
                    className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                   ${
                     formik.errors.typeEntity &&
                     formik.touched.typeEntity &&
                     "border-danger dark:border-danger"
                   }
                  `}
                    value={formik.values.typeEntity}
                    onChange={(e) => {
                      const selectedType = e.target.value;
                      formik.setFieldValue("typeEntity", selectedType);

                      // Determinar el tipo de identificación según el tipo de entidad
                      let selectedIdentification = null;

                      if (selectedType === "company") {
                        selectedIdentification = identificationTypes.find(
                          (type) => type.name.toUpperCase() === "NIT"
                        );
                      } else if (selectedType === "person") {
                        selectedIdentification = identificationTypes.find(
                          (type) => type.name.toUpperCase() === "CC"
                        );
                      }

                      // Si encontramos un tipo de identificación válido, lo asignamos
                      if (selectedIdentification) {
                        formik.setFieldValue(
                          "identificationTypeId",
                          selectedIdentification._id
                        );
                      }
                    }}
                    onBlur={formik.handleBlur}
                    name="typeEntity"
                  >
                    <option value="">Seleccionar</option>
                    <option value="person">Persona</option>
                    <option value="company">Empresa</option>
                  </select>
                  <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                    <ArrowDropDownIcon className="fill-current" />
                  </span>
                </div>
                {formik.errors.typeEntity && formik.touched.typeEntity && (
                  <span className="text-danger text-sm">
                    {formik.errors.typeEntity}
                  </span>
                )}
              </div>

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Número Identificación <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="10039087654"
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                   ${
                     formik.errors.identification &&
                     formik.touched.identification &&
                     "border-danger dark:border-danger"
                   }
                  `}
                    value={formik.values.identification}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="identification"
                  />
                  {formik.errors.identification &&
                    formik.touched.identification && (
                      <span className="text-danger text-sm">
                        {formik.errors.identification}
                      </span>
                    )}
                </div>
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Tipo Identificación <span className="text-meta-1">*</span>
                  </label>

                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                     ${
                       formik.errors.identificationTypeId &&
                       formik.touched.identificationTypeId &&
                       "border-danger dark:border-danger"
                     }
                    `}
                      value={formik.values.identificationTypeId}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      disabled
                      name="identificationTypeId"
                    >
                      <option value="">Seleccionar</option>
                      {identificationTypes.map((identificationTypeId) => (
                        <option
                          key={identificationTypeId._id}
                          value={identificationTypeId._id}
                        >
                          {identificationTypeId.name.toUpperCase()}
                        </option>
                      ))}
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <ArrowDropDownIcon className="fill-current" />
                    </span>
                  </div>
                  {formik.errors.identificationTypeId &&
                    formik.touched.identificationTypeId && (
                      <span className="text-danger text-sm">
                        {formik.errors.identificationTypeId}
                      </span>
                    )}
                </div>{" "}
              </div>
              <div className="mb-4.5">
                <label className="mb-2.5 block text-black dark:text-white">
                  Telefono <span className="text-meta-1">*</span>
                </label>
                <input
                  type="text"
                  placeholder="313 410 1234"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  name="phone"
                  className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                 ${
                   formik.errors.phone &&
                   formik.touched.phone &&
                   "border-danger dark:border-danger"
                 }
                `}
                />
                {formik.errors.phone && formik.touched.phone && (
                  <span className="text-danger text-sm">
                    {formik.errors.phone}
                  </span>
                )}
              </div>

              {/* <div className="mb-4.5">
            <label className="mb-2.5 block text-black dark:text-white">
              Departamento
            </label>
            <div className="relative z-20 bg-transparent dark:bg-form-input">
              <select
                className="relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
                onClick={(e) => setDepartmentId(e.target.value)}
              >
                <option value="">Seleccione un departamento</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.name}
                  </option>
                ))}
              </select>
              <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                <ArrowDropDownIcon className="fill-current" />
              </span>
            </div>
          </div> */}

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <div className="w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Dirección <span className="text-meta-1">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="car 1 # 2 - 3"
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    name="address"
                    className={`w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                   ${
                     formik.errors.address &&
                     formik.touched.address &&
                     "border-danger dark:border-danger"
                   }
                  `}
                  />
                  {formik.errors.address && formik.touched.address && (
                    <span className="text-danger text-sm">
                      {formik.errors.address}
                    </span>
                  )}
                </div>
                <div className="mb-4.5 flex flex-col w-full xl:w-1/2">
                  <label className="mb-2.5 block text-black dark:text-white">
                    Ciudad <span className="text-meta-1">*</span>
                  </label>

                  <div className="relative z-20 bg-transparent dark:bg-form-input">
                    <select
                      className={`relative z-20 w-full appearance-none rounded border border-stroke bg-transparent py-3 px-5 outline-none transition focus:border-primary active:border-primary dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary
                     ${
                       formik.errors.city &&
                       formik.touched.city &&
                       "border-danger dark:border-danger"
                     }
                    `}
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                      name="city"
                    >
                      <option value="">Seleccionar</option>
                      {cities.map((city) => (
                        <option key={city.id} value={city.name}>
                          {city.name}
                        </option>
                      ))}
                    </select>
                    <span className="absolute top-1/2 right-4 z-30 -translate-y-1/2">
                      <ArrowDropDownIcon className="fill-current" />
                    </span>
                  </div>
                  {formik.errors.city && formik.touched.city && (
                    <span className="text-danger text-sm">
                      {formik.errors.city}
                    </span>
                  )}
                </div>{" "}
              </div>

              {/* <div className="mb-6">
            <label className="mb-2.5 block text-black dark:text-white"> 
              Message
            </label>
            <textarea
              rows={6}
              placeholder="Type your message"
              className="w-full rounded border-[1.5px] border-stroke bg-transparent py-3 px-5 font-medium outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-whiter dark:border-form-strokedark dark:bg-form-input dark:focus:border-primary"
            ></textarea>
          </div> */}
            </>
          )}

          <button
            type="submit"
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray disabled:bg-opacity-50 disabled:cursor-not-allowed disabled:border-opacity-50"
            disabled={loading}
          >
            {loading
              ? "Guardando..."
              : initialValues._id
              ? "Editar vendedor"
              : "Añadir vendedor"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormSeller;
