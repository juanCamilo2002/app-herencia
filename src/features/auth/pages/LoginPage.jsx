import LoginForm from '../components/LoginForm';
import LeftSide from '../components/LeftSide';

const LoginPage = () => {
  return (
    <div className='flex justify-center items-center h-screen  mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>
      <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
        <div className="flex flex-wrap items-center">
          <LeftSide/>
          <div className="w-full border-stroke dark:border-strokedark xl:w-1/2 xl:border-l-2">
            <div className="w-full p-4 sm:p-12.5 xl:p-17.5">
              <span className="mb-1.5 block font-medium">Bienvenido</span>
              <h2 className="mb-9 text-2xl font-bold text-black dark:text-white sm:text-title-xl2">
                Inicia sesión en Herencia
              </h2>
              <LoginForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
