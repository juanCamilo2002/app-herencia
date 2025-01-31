import React from 'react'
import HerenciaLogo from '../../../assets/herencia.png';
import { Link } from 'react-router';

const LeftSide = () => {
  return (
    <div className="hidden w-full xl:block xl:w-1/2">
      <div className="py-17.5 px-26 text-center">
        <Link className="mb-5.5 inline-block" to="/">

          <img className="" src={HerenciaLogo} alt="Logo" width={176} height={36} />
        </Link>
        <p className="2xl:px-20">
          Bienvenido al área administrativa. Inicia sesión para supervisar
          y controlar los recursos de manera segura.
        </p>
      </div>
    </div>
  )
}

export default LeftSide