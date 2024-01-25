"use client"
import Input from "../input/Input";
import styles from "./formuCreateSales.module.css";
import { BsCurrencyDollar } from "react-icons/bs";
import { IoPersonOutline } from "react-icons/io5";
import { MdOutlineShoppingBag, MdOutlinePayment } from "react-icons/md";
import { IoIosAddCircleOutline } from "react-icons/io";
import { PiHash } from "react-icons/pi";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect, useState } from "react";
import { CreateSale, getCustomers, getProducts } from "@/lib/utils/api";
import InputDataFilter from "./inputDataFilter/InputDataFilter";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Modal from "../modal/Modal";
import { VscError } from "react-icons/vsc";
import { TbCurrencyDollarOff } from "react-icons/tb";
import { BsBagCheck } from "react-icons/bs";
import Select from "../select/Select";

const FormuCreateSales = () => {
  const router = useRouter();
  const [idCustomer, setIdCustomer] = useState(null);
  const [showModalError, setShowModalError] = useState(false)
  const [formuError, setFormuError] = useState(null);
  const [idProduct, setIdProduct] = useState(null);
  const [total, setTotal] = useState(0);
  const [hasNotPaid, setHasNotPaid] = useState(0);
  const { data: session } = useSession();

  const handleOpenModalError = () => {
    setShowModalError(true);
  }

  const handleCloseModalError = () => {
    setShowModalError(false)
  }


  const createSaleSchema = Yup.object({
    unitAmount: Yup.number().required('El campo cantidad es obligatorio'),
    unitPrice: Yup
      .number("el campo precio unidad debe ser un numero entero")
      .required("el campo precio unidad es obligatorio"),
    totalPrice: Yup
      .number("el campo total debe ser un numero entero")
      .integer(),
    paymentType: Yup
      .string()
      .required("el campo Tipo de pago es obligatorio"),
    contributed: Yup
      .number("el campo Total Abonado debe ser un numero entero")
      .required("el campo Total Abonado es obligatorio"),
    hasNotPaid: Yup
      .number("el campo debe debe ser un numero entero"),
  });

  const formik = useFormik({
    initialValues: {
      customerId: idCustomer,
      productId: idProduct,
      unitAmount: "",
      unitPrice: "",
      totalPrice: "",
      paymentType: "",
      contributed: "",
      hasNotPaid: ""
    },
    validationSchema: createSaleSchema,
    onSubmit: async (values, { setFieldError }) => {
      if (idCustomer && idProduct) {
        values.customerId = idCustomer;
        values.productId = idProduct;
        values.totalPrice = total;
        values.hasNotPaid = hasNotPaid;

        if (values.contributed > values.totalPrice) {
          handleOpenModalError();
          return setFormuError("Total abonado supera total de la venta");
        }
        const res = await CreateSale(session.user.data.accessToken, formik.values);

        if (!res.data.error) {
          router.push("/dashboard/ventas");
        }


      } else {
        if (!idCustomer) {
          setFieldError("customerId", "Cliente está vacío");
        }
        if (!idProduct) {
          setFieldError("productId", "Producto está vacío");
        }
      }
    }
  });


  useEffect(() => {
    if (formik.values.unitPrice && formik.values.unitAmount) {
      setTotal(formik.values.unitPrice * formik.values.unitAmount);
    }
    if (total && formik.values.contributed || formik.values.contributed === 0) {
      setHasNotPaid(total - formik.values.contributed);
    }

    if (formik.values.paymentType === "muestra") {
      formik.values.unitPrice = 0;
      formik.values.contributed = 0;
      setTotal(0);
    }

   
  }, [formik.values, total]);

  return (
    <form className={styles.container} onSubmit={formik.handleSubmit}>
      <div>
        <InputDataFilter
          setValue={setIdCustomer}
          filteredKeys={["name", "company"]}
          setValueInput="company"
          getDataFilter={getCustomers}
          placeholder="Cliente"
          icon={<IoPersonOutline />}
        />

        {
          formik.touched.customerId
          && formik.errors.customerId
          && <span className={styles.error}>{formik.errors.customerId}</span>}
      </div>
      <div>
        <InputDataFilter
          setValue={setIdProduct}
          filteredKeys={["name"]}
          setValueInput="name"
          getDataFilter={getProducts}
          placeholder="Producto"
          icon={<MdOutlineShoppingBag />}
        />
        {
          formik.touched.productId
          && formik.errors.productId
          && <span className={styles.error}>{formik.errors.productId}</span>}
      </div>

      <div className={styles.formGroup}>
        <div className={styles.formInput}>
          <Input
            icon={<PiHash />}
            label={"Cantidad"}
            name="unitAmount"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.unitAmount}
            type="number"
          />
          {formik.touched.unitAmount
            && formik.errors.unitAmount
            && <span className={styles.error}>{formik.errors.unitAmount}</span>}
        </div>
        <div className={styles.formInput}>
          <Input
            icon={<BsCurrencyDollar />}
            label={"Precio unidad"}
            name="unitPrice"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.unitPrice}
            type="number"
          />
          {
            formik.touched.unitPrice
            && formik.errors.unitPrice
            && <span className={styles.error}>{formik.errors.unitPrice}</span>}
        </div>
      </div>
      <div className={styles.formGroup}>
        <div className={styles.formInput}>
          <Select
            icon={<MdOutlinePayment />}
            label={"Tipo de pago"}
            name="paymentType"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.paymentType}
            options={['contado', 'muestra', 'en consignación']}
          />
          {
            formik.touched.paymentType
            && formik.errors.paymentType
            && <span className={styles.error}>{formik.errors.paymentType}</span>}
        </div>
        <div className={styles.formInput}>
          <Input
            icon={<IoIosAddCircleOutline />}
            label={"Total abonado"}
            name="contributed"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.contributed}
            type="number"
          />
          {
            formik.touched.contributed
            && formik.errors.contributed
            && <span className={styles.error}>{formik.errors.contributed}</span>}
        </div>
      </div>
      <div className={styles.formGroup}>
        <div className={styles.formInput}>
          <Input
            icon={<BsBagCheck />}
            label={"Total"}
            value={total}
            readonly={true}
          />
        </div>
        <div className={styles.formInput}>
          <Input
            icon={<TbCurrencyDollarOff />}
            label={"Debe"}
            value={hasNotPaid}
            readonly={true}
          />
        </div>
      </div>
      <div className={styles.formGroup}>

      </div>
      {showModalError &&
        (
          <Modal
            icon={< VscError size={40} color="red" />}
            textBody={formuError}
            onClose={handleCloseModalError}
          />)}
      <div className={styles.formGroupBttm}>
        <button className={styles.btnSubmit} type="submit">Agregar venta</button>
      </div>
    </form>
  );
}

export default FormuCreateSales;