import { useFormik } from "formik";
import { productSchema } from "./productSchema";
import InputForm from "../../../components/forms/inputs/InputForm";
import { useProducts } from "../hooks/useProducts";

const FormProduct = ({ onClose, initialValues }) => {
  const { addProduct, editProduct, error } = useProducts();
  const formik = useFormik({
    initialValues: {
      name: "",
      price: 0,
      ...initialValues,
    },
    validationSchema: productSchema,
    onSubmit: (values) => {
      if (initialValues) {
        const { _id, ...rest } = values;
        editProduct(_id, rest);
      } else {
        addProduct(values);
      }

      if (!error) {
        onClose();
      }
    },
  });

  const handleClose = (e) => {
    e.preventDefault();
    onClose();
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
      <form onSubmit={formik.handleSubmit}>
        <InputForm
          label="nombre del producto"
          placeholder="Vino dulce"
          type="text"
          maxWidth
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && formik.errors.name}
        />
        <InputForm
          label="Precio"
          type="number"
          placeholder="0"
          maxWidth
          name="price"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.touched.price && formik.errors.price}
        />
        <div className="flex space-x-4">
          <button
            className="flex w-full justify-center rounded bg-meta-1 p-3 font-medium text-gray disabled:bg-opacity-50 disabled:cursor-not-allowed disabled:border-opacity-50"
            onClick={(e) => handleClose(e)}
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="flex w-full justify-center rounded bg-primary p-3 font-medium text-gray disabled:bg-opacity-50 disabled:cursor-not-allowed disabled:border-opacity-50"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormProduct;
