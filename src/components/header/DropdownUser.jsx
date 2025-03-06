import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../../features/auth/hooks/useAuth';

import UserOne from '../../assets/user/profile.jpg';
import ArrowDropdownIcon from '../../assets/icons/arrow-dropdown.svg?react';
import PersonTwoIcon from '../../assets/icons/person-two.svg?react';
import ContactIcon from '../../assets/icons/contact.svg?react';
import SettingsIcon from '../../assets/icons/settings.svg?react';
import LogoutIcon from '../../assets/icons/logout.svg?react';

const DropdownUser = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { signOut, getUserProfile, userProfile } = useAuth();
  const navigate = useNavigate();

  const trigger = useRef(null);
  const dropdown = useRef(null);

  useEffect(() => {
    getUserProfile();
  }, [getUserProfile]);

  // close on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  });

  // close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener('keydown', keyHandler);
    return () => document.removeEventListener('keydown', keyHandler);
  });

  const handleLogout = async () => {
    await signOut();
    navigate("/login");
  }

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        to="#"
      >
        <span className="hidden text-right lg:block">
          <span className="block text-sm font-medium text-black dark:text-white">
            {userProfile?.entityId?.name}
          </span>
          <span className="block text-xs">Administrador</span>
        </span>

        <span className="h-12 w-12 rounded-full">
          <img src={UserOne} alt="User" className='object-cover h-12 w-12 rounded-full'/>
        </span>

        <ArrowDropdownIcon className={`hidden fill-current sm:block ${dropdownOpen ? 'rotate-180' : ''
          }`} />
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${dropdownOpen === true ? 'block' : 'hidden'
          }`}
      >
        <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
          <li>
            <Link
              to="/profile"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <PersonTwoIcon className="fill-current" />
              Mi Perfil
            </Link>
          </li>
          <li>
            <Link
              to="#"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <ContactIcon className="fill-current" />
              Mis Contactos
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
            >
              <SettingsIcon className="fill-current h-5.5 w-5.5" />
              Configuración
            </Link>
          </li>
        </ul>
        <button
          className="flex items-center gap-3.5 py-4 px-6 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
          onClick={handleLogout}
        >
          <LogoutIcon className="fill-current" />
          Cerrar Sesión
        </button>
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
