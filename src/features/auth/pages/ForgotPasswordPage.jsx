import ForgotPasswordForm from '../components/ForgotPasswordForm';
import LeftSide from '../components/LeftSide';

const ForgotPasswordPage = () => {
  return (
    <div className='flex justify-center items-center h-screen  mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          
          <LeftSide />
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">

              <h2 className="mb-3 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Restablecer contraseña
              </h2>
              <p className="mb-7.5">Introduzca su dirección de correo electrónico para recibir un enlace de restablecimiento de contraseña.</p>
              <ForgotPasswordForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPasswordPage