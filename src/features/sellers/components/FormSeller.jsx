import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import { useSellers } from "../hooks/useSellers";
import { useIdentificationTypes } from "../../common/hooks/useIdentificationTypes";
import { useEntities } from "../../entities/hooks/useEntitites";
import { validationSchema } from "./sellerSchema";
import InputForm from "../../../components/forms/inputs/InputForm";
import Select from "../../../components/forms/selects/Select";
import SelectFilter from "../../../components/forms/selects/SelectFilter";

const FormSeller = ({ onClose, initialValues = {} }) => {
  const { addSeller, loading, error, editSeller } = useSellers();
  const { identificationTypes, loadIdentificationTypes } =useIdentificationTypes();
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
        const cityOptions = data.map((city) => ({
          value: city.name,
          label: city.name,
        }));
        setCities(cityOptions);
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
      values.city = values.city.value;
      if (values.entityId) {
        values.entityId = values.entityId.value;
      }
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
            <SelectFilter
            options={entities.map((entity) => ({
              label: `${entity.name} ${entity.lastName} - ${entity.identification}`,
              value: entity._id,
            }))}
            name="entityId"
            label={"Seleccionar Entidad Existente"}
            placeholder={"Seleccionar"}
            required
            maxWidth
            value={formik.values.entityId}
            onChange={(selectedOption) => {
              formik.setFieldValue("entityId", selectedOption);
              formik.setFieldTouched("entityId", false);
            }}
            error={
              formik.errors.entityId && formik.touched.entityId
                ? formik.errors.entityId
                : null
            }
            onBlur={() => {
              if (!formik.values.entityId) {
                formik.setFieldTouched("entityId", true);
              }
            }}
          />
          ) : (
            <>
              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <InputForm
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.errors.name && formik.touched.name
                      ? formik.errors.name
                      : null
                  }
                  label={"Nombre"}
                  required
                  placeholder={"Jhon"}
                />

                <InputForm
                  name="lastName"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.errors.lastName && formik.touched.lastName
                      ? formik.errors.lastName
                      : null
                  }
                  label={"Apellidos"}
                  required
                  placeholder={"Doe"}
                />
              </div>

              <InputForm
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.errors.email && formik.touched.email
                    ? formik.errors.email
                    : null
                }
                label={"Correo Electrónico"}
                required
                placeholder={"JhonDoe@gmail.com"}
                maxWidth
              />

              <Select
                label={"Tipo de entidad"}
                required
                options={[
                  { label: "Persona", value: "person" },
                  { label: "Empresa", value: "company" },
                ]}
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
                    formik.setFieldValue("companyName", "");
                  } else if (selectedType === "person") {
                    selectedIdentification = identificationTypes.find(
                      (type) => type.name.toUpperCase() === "CC"
                    );

                    formik.setFieldValue(
                      "companyName",
                      `${formik.values.name} ${formik.values.lastName}`
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
                error={
                  formik.errors.typeEntity && formik.touched.typeEntity
                    ? formik.errors.typeEntity
                    : null
                }
                maxWidth
                valueOption={"value"}
                labelOption={"label"}
              />

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                <InputForm
                  name="identification"
                  value={formik.values.identification}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.errors.identification &&
                    formik.touched.identification
                      ? formik.errors.identification
                      : null
                  }
                  label={"Número Identificación"}
                  required
                  type="number"
                  placeholder={"10039087654"}
                />
                <Select
                  options={identificationTypes.map((type) => ({
                    _id: type._id,
                    name: type.name.toUpperCase(),
                  }))}
                  label={"Tipo Identificación"}
                  value={formik.values.identificationTypeId}
                  error={
                    formik.errors.identificationTypeId &&
                    formik.touched.identificationTypeId
                      ? formik.errors.identificationTypeId
                      : null
                  }
                  name={"identificationTypeId"}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  disabled
                  valueOption={"_id"}
                  labelOption={"name"}
                />
              </div>
              <InputForm
                label={"Teléfono"}
                required
                placeholder={"313 410 1234"}
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                name="phone"
                error={
                  formik.errors.phone && formik.touched.phone
                    ? formik.errors.phone
                    : null
                }
                maxWidth
              />

              <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
              <InputForm
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.errors.address && formik.touched.address
                      ? formik.errors.address
                      : null
                  }
                  label={"Dirección"}
                  required
                  placeholder={"Cra 1 # 2 - 3"}
                />
                <SelectFilter
                  options={cities}
                  name="city"
                  label={"Ciudad"}
                  placeholder={"Seleccionar"}
                  required
                  value={formik.values.city}
                  error={
                    formik.errors.city && formik.touched.city
                      ? formik.errors.city
                      : null
                  }
                  onChange={(selectedOption) => {
                    formik.setFieldValue("city", selectedOption);
                    formik.setFieldTouched("city", false);
                  }}
                  onBlur={() => {
                    if (!formik.values.city) {
                      formik.setFieldTouched("city", true);
                    }
                  }}
                />
              </div>
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