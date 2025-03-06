import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import SelectFilter from "../../../components/forms/selects/SelectFilter";
import Select from "../../../components/forms/selects/Select";
import InputForm from "../../../components/forms/inputs/InputForm";
import { useCustomers } from "../../customers/hooks/useCustomers";
import { useSellers } from "../../sellers/hooks/useSellers";
import { usePaymentMethods } from "../../common/hooks/usePaymentMethods";
import { useProducts } from "../../products/hooks/useProducts";
import { saleSchema } from "./saleSchema";
import { useSales } from "../hooks/useSales";

const FormSale = () => {
  const { customers, loadCustomers } = useCustomers();
  const { sellers, loadSellers } = useSellers();
  const { paymentMethods, loadPaymentMethods } = usePaymentMethods();
  const { products, loadProducts } = useProducts();
  const { addSale } = useSales();
  const [items, setItems] = useState([]);

  useEffect(() => {
    loadCustomers();
    loadSellers({ activate: true });
    loadPaymentMethods();
    loadProducts();
  }, []);

  const formik = useFormik({
    initialValues: {
      customer: "",
      seller: "",
      paymentMethod: "",
      saleType: "",
      contributed: 0,
      paymentType: "",
      date: "",
      items: [],
    },
    validationSchema: saleSchema,
    onSubmit: (values) => {
      values.customer = values.customer.value;
      values.seller = values.seller.value;
      values.paymentMethod = values.paymentMethod.value;
      values.saleType = values.saleType.value;
      values.date = new Date(`${values.date}T00:00:00.000Z`);
      values.items = values.items.map((item) => ({
        ...item,
        product: item.product.value,
      }));

      addSale(values);
    },
  });

  useEffect(() => {
    formik.setFieldValue("items", items);
  }, [items]);

  const addItem = (e) => {
    e.preventDefault();
    setItems([
      ...items,
      {
        id: Date.now(),
        product: "",
        quantity: "",
        unitValue: "",
        invoiced: false,
        includesStamp: false,
      },
    ]);
  };

  const removeItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const formatCurrency = (value) => {
    if (!value) return "";
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0,
    }).format(value);
  };

  const parseCurrency = (value) => {
    return Number(value.replace(/[^0-9]/g, ""));
  };

  return (
    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark p-6.5">
      <form onSubmit={formik.handleSubmit} className="space-y-4">
        {/* 📌 Información General */}
        <SelectFilter
          label="Cliente"
          placeholder="Seleccionar cliente"
          name="customer"
          maxWidth
          value={formik.values.customer}
          options={customers.map((customer) => ({
            value: customer._id,
            label: customer.companyName,
          }))}
          onChange={(option) => formik.setFieldValue("customer", option)}
          error={formik.touched.customer && formik.errors.customer}
        />
        <SelectFilter
          label="Vendedor"
          name="seller"
          placeholder="Seleccionar vendedor"
          maxWidth
          value={formik.values.seller}
          options={sellers.map((seller) => ({
            value: seller._id,
            label: seller.entityId.name + " " + seller.entityId.lastName,
          }))}
          onChange={(option) => formik.setFieldValue("seller", option)}
          error={formik.touched.seller && formik.errors.seller}
        />
        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <SelectFilter
            label="Método de pago"
            name="paymentMethod"
            placeholder="Seleccionar"
            value={formik.values.paymentMethod}
            options={paymentMethods.map((paymentMethod) => ({
              value: paymentMethod._id,
              label: paymentMethod.name,
            }))}
            onChange={(option) => formik.setFieldValue("paymentMethod", option)}
            error={formik.touched.paymentMethod && formik.errors.paymentMethod}
          />
          <SelectFilter
            label="Tipo de venta"
            name="saleType"
            placeholder="Seleccionar"
            value={formik.values.saleType}
            options={[
              { value: "wholesaler", label: "Al por mayor" },
              { value: "retailer", label: "Detal" },
            ]}
            onChange={(option) => formik.setFieldValue("saleType", option)}
            error={formik.touched.saleType && formik.errors.saleType}
          />
        </div>
        <Select
          label="Modo de venta"
          maxWidth
          required
          valueOption={"value"}
          name="paymentType"
          labelOption={"label"}
          options={[
            { value: "cash", label: "Contado" },
            { value: "sample", label: "Muestra" },
            { value: "consignment", label: "Consignación" },
          ]}
          value={formik.values.paymentType}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={
            formik.errors.paymentType &&
            formik.touched.paymentType
              ? formik.errors.paymentType
              : null
          }
        />
        <InputForm
          label="Fecha de venta"
          type="date"
          maxWidth
          name="date"
          value={formik.values.date}
          onChange={formik.handleChange}
          error={formik.touched.date && formik.errors.date}
        />
        {/* 📌 Productos */}
        <h3 className="text-lg font-bold text-black dark:text-white mb-3">
          Detalles de la venta
        </h3>
        {formik.touched.items && typeof formik.errors.items === "string" && (
          <p className="text-danger">{formik.errors.items}</p>
        )}

        {items.map((item, index) => (
          <div
            key={item.id}
            className="border border-stroke dark:border-strokedark p-4 rounded-lg space-y-2"
          >
            <SelectFilter
              placeholder="Seleccionar"
              maxWidth
              label="Producto"
              name={`items[${index}].product`}
              value={item.product}
              options={products.map((product) => ({
                value: product._id,
                label: product.name,
              }))}
              onChange={(option) => handleItemChange(index, "product", option)}
              error={formik.errors.items?.[index]?.product}
            />
            <div className="flex space-x-4">
              <InputForm
                label="Cantidad"
                type="number"
                placeholder="0"
                name={`items[${index}].quantity`}
                value={item.quantity}
                onChange={(e) =>
                  handleItemChange(index, "quantity", Number(e.target.value))
                }
                error={formik.errors.items?.[index]?.quantity}
              />
              <InputForm
                label="Precio"
                type="text"
                placeholder="$ 0"
                name={`items[${index}].unitValue`}
                value={formatCurrency(item.unitValue)}
                onChange={(e) => {
                  const parsedValue = parseCurrency(e.target.value);
                  handleItemChange(index, "unitValue", parsedValue);
                }}
                error={formik.errors.items?.[index]?.unitValue}
              />
            </div>
            <div className="flex items-center space-x-4">
              <label>
                <input
                  type="checkbox"
                  checked={item.invoiced}
                  onChange={(e) =>
                    handleItemChange(index, "invoiced", e.target.checked)
                  }
                />{" "}
                Facturado
              </label>
              <label>
                <input
                  type="checkbox"
                  checked={item.includesStamp}
                  onChange={(e) =>
                    handleItemChange(index, "includesStamp", e.target.checked)
                  }
                />{" "}
                Incluye estampilla (Si aplica)
              </label>
            </div>
            <button
              type="button"
              onClick={() => removeItem(item.id)}
              className="text-danger"
            >
              Eliminar
            </button>
          </div>
        ))}

        <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
          <InputForm
            label="Abono"
            type="text"
            placeholder="$ 0"
            name="contributed"
            value={formatCurrency(formik.values.contributed)}
            onChange={(e) => {
              const parsedValue = parseCurrency(e.target.value);
              formik.setFieldValue("contributed", parsedValue);
            }}
            error={formik.touched.contributed && formik.errors.contributed}
          />
          <InputForm
            label="Total"
            type="text"
            placeholder="$ 0"
            value={formatCurrency(
              formik.values.items.reduce(
                (acc, item) => acc + item.quantity * item.unitValue,
                0
              )
            )}
          />
        </div>

        <button
          type="button"
          onClick={(e) => addItem(e)}
          className="bg-meta-4 text-white mr-1 px-4 py-2 rounded"
        >
          Agregar Producto
        </button>

        <button
          type="submit"
          className="bg-primary text-white px-4 py-2 rounded"
        >
          Guardar Venta
        </button>
      </form>
    </div>
  );
};

export default FormSale;
