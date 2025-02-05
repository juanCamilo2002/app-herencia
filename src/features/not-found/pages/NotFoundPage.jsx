import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import NotFoundImage from '../../../assets/404-not-found.png'
const NotFoundPage = () => {
  return (
    <div className='flex justify-center items-center h-screen  mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10'>
      <div className='rounded-sm border w-full border-stroke bg-white px-5 py-10 shadow-default dark:border-strokedark dark:bg-boxdark sm:py-20'>
        <div className='mx-auto max-w-[410px] flex flex-col items-center'>
          <img src={NotFoundImage} alt="illustration" className='object-contain' />
          <div className='mt-7.5 text-center'>
            <h2 className='mb-3 text-2xl font-bold text-black dark:text-white'>Lo sentimos, no se puede encontrar la página</h2>
            <p className='font-medium'>
              La página que estás buscando parece haber sido movida, eliminada o no existe.
            </p>
            <Link to='/' className='mt-7.5 inline-flex items-center gap-2 rounded-md bg-primary py-3 px-6 font-medium text-white hover:bg-opacity-90'>
              <ArrowLeftIcon className="h-6 w-6 text-gray-500" />
              <span>ir a página inicio</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFoundPage