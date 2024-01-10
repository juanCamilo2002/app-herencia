"use client"
import { useState } from 'react';
import Input from '../../input/Input';
import styles from './right.module.css';
import { CiMail, CiLock } from "react-icons/ci";
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { useFormik, } from 'formik';
import * as Yup from "yup";
import { useSession } from 'next-auth/react';
import ReactLoading from "react-loading";

const Right = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const { data: session, status } = useSession();

  const LoginSchemaYup = Yup.object({
    email:
      Yup.string()
        .required("Email Requerido")
        .email('Formato de correo electrónico inválido'),
    password:
      Yup.string()
        .required("Contraseña requerida")
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: ""
    },
    validationSchema: LoginSchemaYup,
    onSubmit: async (values) => {
      const res = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false
      })
      if (res?.error) {
        setError(res.error)
        setTimeout(() => {
          setError("");
        }, 2000)
      };
      if (res?.ok) return router.push("/dashboard");

    }
  })

  const statusValue = (status, valueUno, valueDos) => {
    if (status === "unauthenticated") {
      return valueUno
    } else if (status === "loading" || status === "authenticated") {
      return valueDos
    } else {
      return valueUno
    }
  }
  return (
    <div className={styles.container}>
      <form className={styles.wrapper} onSubmit={formik.handleSubmit}>
        <div className={styles.top}>
          <h2>¡Bienvenido!</h2>
          <span>iniciar sesión</span>
        </div>
        <div className={styles.inputs}>
          <div>
            <Input
              label="Correo electrónico"
              name="email"
              icon={<CiMail />}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}

            />
            {
              formik.touched.email
              && formik.errors.email
              && <span className={styles.error}>{formik.errors.email}</span>}
          </div>
          <div>
            <Input
              label="Contraseña"
              name="password"
              icon={<CiLock />}
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
            {
              formik.touched.password
              && formik.errors.password
              && <span className={styles.error}>{formik.errors.password}</span>}
          </div>
          <span className={styles.forgotPassword}>¿Has olvidado tu contraseña?</span>
        </div>
        <div className={styles.footer}>
          {error ? <span className={styles.errorLogin}>{error}</span> : ""}
          <button
            type='submit'
            className={styles.button}
            disabled={statusValue(status, false, true)}
          >
            {statusValue(
              status,
              "Iniciar Sesion",
              (<>
              <span>
                Cargando
              </span>
              <ReactLoading
                type='bubbles'
                color='#000000'
                height={20}
                width={20} />
              </>))}
          </button>
        </div>
      </form>
    </div>
  )
}


export default Right;
