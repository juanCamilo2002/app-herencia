import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router';
import Logo from '../../assets/logo.svg';
import ArrowLeftIcon from "../../assets/icons/arrow-left.svg?react";
import SidebarItem from './SidebarItem';
import navLinks from '../../utils/navLinks';


const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const trigger = useRef(null);
  const sidebar = useRef(null);

  const storedsidebarExpanded = localStorage.getItem('sidebar-expanded');
  const [sidebarExpanded, setSidebarExpanded] = useState(storedsidebarExpanded === null ? false : storedsidebarExpanded === 'true');

  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!sidebar.current || !trigger.current) return;
      if (!sidebarExpanded || sidebar.current.contains(target) || trigger.current.contains(target)) return;

      setSidebarOpen(false);
    };

    document.addEventListener('click', clickHandler);
    return () => document.removeEventListener('click', clickHandler);
  }, [sidebarExpanded, setSidebarOpen]);

  // close if the esc key is pressed
  useEffect(() => {
    localStorage.setItem('sidebar-expanded', sidebarExpanded.toString());
    if (sidebarExpanded) {
      document.body.classList.add('sidebar-expanded');
    } else {
      document.body.classList.remove('sidebar-expanded');
    }
  }, [sidebarExpanded]);

  return (
    <aside
      ref={sidebar}
      className={`absolute left-0 top-0 z-9999 flex h-screen w-72.5 flex-col overflow-y-hidden bg-black duration-300 ease-linear dark:bg-boxdark lg:static lg:translate-x-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
    >
      {/* SIDEBAR HEADER */}
      <div className='flex items-center justify-between gap-2 px-6 py-5.5 lg:py-6.5'>
        <NavLink to='/'>
          <img src={Logo} alt="Logo" />
        </NavLink>
        <button
          ref={trigger}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          aria-controls='sidebar'
          aria-expanded={sidebarOpen}
          className='block lg:hidden'
        >
          <ArrowLeftIcon className='fill-current' />
        </button>
      </div>
      {/* SIDEBAR HEADER END */}

      <div className='no-scrollbar flex flex-col overflow-y-auto duration-300 ease-linear'>
        {/* SIDEBAR MENU */}
        <nav className='mt-5 py-4 px-4 lg:mt-9 lg:px-6'>

          {navLinks.map((category, index) => (
            <div key={index}>

              <h3 className='mb-4 ml-4 text-sm font-semibold text-bodydark2'>
                {category.category}
              </h3>

              <ul className='mb-6 flex flex-col gap-1.5'>
                {category.items.map((item, index) => (
                  <SidebarItem 
                  key={index} 
                  to={item.to} 
                  label={item.label} 
                  icon={item.icon} 
                  children={item.children ? item.children : null} 
                  sidebarExpanded={sidebarExpanded} 
                  setSidebarExpanded={setSidebarExpanded}/>
                ))}
              </ul>
            </div>
          ))}
                  </nav>
        {/* SIDEBAR MENU END */}
      </div>
    </aside>
  )
}

export default Sidebar;