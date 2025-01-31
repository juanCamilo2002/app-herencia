import React from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'  
import InputField from '../../../components/forms/InputField'
import { EnvelopeIcon } from '@heroicons/react/24/outline'

const ForgotPasswordForm = () => {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email inválido').required('El correo electrónico es requerido'),
    }),
    onSubmit: async (values) => {
      try {
        alert('Se ha enviado un correo electrónico para restablecer la contraseña');
      } catch (error) {
        alert(error.message || 'Error al iniciar sesión');
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-6">
        <InputField
          label="Correo electrónico"
          type="text"
          placeholder="JhonDoe@example.com"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          error={formik.touched.email && formik.errors.email}
          icon={<EnvelopeIcon className="h-6 w-6 opacity-50" />}
        />
      </div>
     
      <div className="mb-5">
        <input
          type="submit"
          value="Enviar correo electrónico"
          className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
        />
      </div>
     
    </form>
  )
}

export default ForgotPasswordForm