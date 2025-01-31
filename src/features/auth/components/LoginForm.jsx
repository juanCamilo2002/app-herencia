import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import InputField from '../../../components/forms/InputField';
import { EnvelopeIcon } from "@heroicons/react/24/outline";


const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Email inválido').required('El correo electrónico es requerido'),
      password: Yup.string().required('La contraseña es requerida'),
    }),
    onSubmit: async (values) => {
      try {
        await login(values.email, values.password);
        navigate('/');
      } catch (error) {
        alert(error.message || 'Error al iniciar sesión');
      }
    }
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-4">
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
      <div className="mb-6">
        <InputField
          label="Contraseña"
          type="password"
          placeholder="Ingresa tu contraseña"
          name="password"
          value={formik.values.password}
          onChange={formik.handleChange}
          error={formik.touched.password && formik.errors.password}
        />
      </div>
      <div className="mb-5">
        <input
          type="submit"
          value="Iniciar sesión"
          className="w-full cursor-pointer rounded-lg border border-primary bg-primary p-4 text-white transition hover:bg-opacity-90"
        />
      </div>
      <div className="mt-6 text-center">
        <p>
          ¿Olvidaste tu contraseña?{' '}
          <Link to="/forgot-password" className="text-primary">
            Recupérala aquí
          </Link>
        </p>
      </div>
    </form>
  )
}

export default LoginForm;
