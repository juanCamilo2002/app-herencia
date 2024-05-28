"use client"
import React, { useEffect, useState } from 'react'
import InputDataFilter from '../inputDataFilter/InputDataFilter'
import { PiHash } from 'react-icons/pi'
import { BsBagCheck, BsCurrencyDollar } from 'react-icons/bs'
import { MdOutlinePayment, MdOutlineShoppingBag } from 'react-icons/md'
import Input from '../input/Input'
import Select from '../select/Select'
import { IoIosAddCircleOutline } from 'react-icons/io'
import { TbCurrencyDollarOff } from 'react-icons/tb'
import styles from './formuUpdateSale.module.css'
import { getCustomers, getProducts, getSale, updateSale } from '@/lib/utils/api'
import { IoPersonOutline } from 'react-icons/io5'
import { useSession } from 'next-auth/react'
import * as Yup from "yup";
import { useFormik } from 'formik'
import Modal from '../modal/Modal'
import { CiCircleCheck } from 'react-icons/ci'
import { VscError } from 'react-icons/vsc'
import { useRouter } from 'next/navigation'
import ReactLoading from "react-loading";

const FormuUpdateSales = ({ idSale }) => {
    const router = useRouter();
    const [sale, setSale] = useState(null);
    const [idCustomer, setIdCustomer] = useState(null);
    const [idProduct, setIdProduct] = useState(null);
    const [total, setTotal] = useState(0);
    const [hasNotPaid, setHasNotPaid] = useState(0);
    const [showModalError, setShowModalError] = useState(false);
    const [showModalSubmit, setShowModalSubmit] = useState(false);
    const [loadingSubmitting, setloadingSubmitting] = useState(false);
    const { data: session } = useSession();
    const token = session?.user.data.accessToken;

    const handleOpenModalError = () => {
        setShowModalError(true);
    }

    const handleCloseModalError = () => {
        setShowModalError(false)
    }

    const handleAccept = () => {
        router.push("/dashboard/ventas");
    }
    useEffect(() => {
        const getSaleData = async () => {
            try {
                if (token) {
                    const res = await getSale(token, idSale);
                    setSale(res.data);

                    // Populate the form fields with fetched sale data
                    formik.setValues({
                        customerId: res.data.customerId,
                        productId: res.data.productId,
                        unitAmount: res.data.unitAmount,
                        unitPrice: res.data.unitPrice,
                        totalPrice: res.data.totalPrice,
                        paymentType: res.data.paymentType,
                        contributed: res.data.contributed,
                        hasNotPaid: res.data.hasNotPaid,
                    });

                    // Update total and hasNotPaid based on fetched data
                    setTotal(res.data.totalPrice);
                    setHasNotPaid(res.data.hasNotPaid);
                    setIdProduct(res.data.productId)
                    setIdCustomer(res.data.customerId);
                }
            } catch (error) {
                console.error(error);
            }
        }
        getSaleData();
    }, [token]);

    const updateSaleSchema = Yup.object({
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
        validationSchema: updateSaleSchema,
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
                setShowModalSubmit(true);
                setloadingSubmitting(true);
                await updateSale(session.user.data.accessToken, values, idSale);
                setloadingSubmitting(false);
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

        if (formik.values.paymentType === "muestra") {
            formik.values.unitPrice = 0;
            formik.values.contributed = 0;
            setTotal(0);
            setHasNotPaid(0);
        }

        if (formik.values.paymentType !== "muestra") {
            setTotal(formik.values.unitPrice * formik.values.unitAmount);
            setHasNotPaid(total - formik.values.contributed);

        }
    }, [formik.values, total, hasNotPaid]);

    return (
        <>
            <form className={styles.container} onSubmit={formik.handleSubmit}>
                <div>
                
                    <InputDataFilter
                        setValue={setIdCustomer}
                        filteredKeys={['name', 'company']}
                        setValueInput="company"
                        getDataFilter={getCustomers}
                        placeholder="Cliente"
                        icon={<IoPersonOutline />}
                        value={sale?.customerDetails.company}
                    />
                    {formik.touched.customerId && formik.errors.customerId && (
                        <span className={styles.error}>{formik.errors.customerId}</span>
                    )}
                </div>
                <div>
                    <InputDataFilter
                        setValue={setIdProduct}
                        filteredKeys={['name']}
                        setValueInput="name"
                        getDataFilter={getProducts}
                        placeholder="Producto"
                        icon={<MdOutlineShoppingBag />}
                        value={sale?.productDetails.name}
                    />
                    {formik.touched.productId && formik.errors.productId && (
                        <span className={styles.error}>{formik.errors.productId}</span>
                    )}
                </div>
                <div className={styles.formGroup}>
                    <div className={styles.formInput}>
                        <Input
                            icon={<PiHash />}
                            label={'Cantidad'}
                            name="unitAmount"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.unitAmount}
                            type="number"
                        />
                        {formik.touched.unitAmount && formik.errors.unitAmount && (
                            <span className={styles.error}>{formik.errors.unitAmount}</span>
                        )}
                    </div>
                    <div className={styles.formInput}>
                        <Input
                            icon={<BsCurrencyDollar />}
                            label={'Precio unidad'}
                            name="unitPrice"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.unitPrice}
                            type="number"
                        />
                        {formik.touched.unitPrice && formik.errors.unitPrice && (
                            <span className={styles.error}>{formik.errors.unitPrice}</span>
                        )}
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <div className={styles.formInput}>
                        <Select
                            icon={<MdOutlinePayment />}
                            label={'Tipo de pago'}
                            name="paymentType"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.paymentType}
                            options={['contado', 'muestra', 'en consignación']}
                        />
                        {formik.touched.paymentType && formik.errors.paymentType && (
                            <span className={styles.error}>{formik.errors.paymentType}</span>
                        )}
                    </div>
                    <div className={styles.formInput}>
                        <Input
                            icon={<IoIosAddCircleOutline />}
                            label={'Total abonado'}
                            name="contributed"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.contributed}
                            type="number"
                        />
                        {formik.touched.contributed && formik.errors.contributed && (
                            <span className={styles.error}>{formik.errors.contributed}</span>
                        )}
                    </div>
                </div>
                <div className={styles.formGroup}>
                    <div className={styles.formInput}>
                        <Input icon={<BsBagCheck />} label={'Total'} value={total} readonly={true} />
                    </div>
                    <div className={styles.formInput}>
                        <Input
                            icon={<TbCurrencyDollarOff />}
                            label={'Debe'}
                            value={hasNotPaid}
                            readonly={true}
                        />
                    </div>
                </div>
                <div className={styles.formGroupBttm}>
                    <button className={styles.btnSubmit} type="submit">
                        Agregar venta
                    </button>
                </div>
            </form>
            {showModalError && (
                <Modal
                    icon={<VscError size={40} color="red" />}
                    textBody={formuError}
                    onClose={handleCloseModalError}
                />
            )}
            {showModalSubmit && (
                <Modal
                    icon={
                        loadingSubmitting ? (
                            <ReactLoading type="bubbles" color="#000000" height={40} width={40} />
                        ) : (
                            <CiCircleCheck size={40} color="green" />
                        )
                    }
                    textBody={loadingSubmitting ? 'Actualizando venta' : 'Venta actualizada con éxito'}
                    nameBtn={'Aceptar'}
                    btnCancelDisabled={loadingSubmitting}
                    bgColor={!loadingSubmitting && 'rgb(84, 227, 124)'}
                    onClose={!loadingSubmitting && handleAccept}
                />
            )}
        </>
    )
}

export default FormuUpdateSales
