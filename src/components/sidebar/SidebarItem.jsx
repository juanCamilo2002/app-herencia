import React from 'react'
import { NavLink, useLocation } from 'react-router'
import SidebarLinkGroup from './SidebarLinkGroup';
import ArrowDropdown from "../../assets/icons/arrow-dropdown.svg?react";

const SidebarItem = ({ to, label, icon, children, sidebarExpanded, setSidebarExpanded }) => {
  const location = useLocation();
  const { pathname } = location;

  if (children) {
    return (
      <SidebarLinkGroup
        activateCondition={
          pathname === to || pathname.includes(to)
        }
      >
        {(handleClick, open) => {
          return (
            <React.Fragment>
              <NavLink
                to="#"
                className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${(pathname === to || pathname.includes(to.split("/")[1])) && 'bg-graydark dark:bg-meta-4'
                  }`}
                onClick={(e) => {
                  e.preventDefault();
                  sidebarExpanded
                    ? handleClick()
                    : setSidebarExpanded(true);
                }}
              >
                {icon}
                {label}
                <ArrowDropdown
                  className={`absolute right-4 top-1/2 -translate-y-1/2 fill-current ${open && 'rotate-180'
                    }`}
                />
              </NavLink>

              {/* DROPDOWN MENU START */}
              <div
                className={`translate transform overflow-hidden ${!open && 'hidden'
                  }`}
              >
                <ul className="mt-4 mb-5.5 flex flex-col gap-2.5 pl-6" >
                  {children.map((child, index) => (
                    <li key={index}>
                      <NavLink
                        to={child.to}
                        className={({ isActive }) =>
                          'group relative flex items-center gap-2.5 rounded-md px-4 font-medium text-bodydark2 duration-300 ease-in-out hover:text-white ' +
                          (isActive && '!text-white')
                        }
                      >
                        {child.label}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </div>
              {/* DROPDOWN MENU END */}
            </React.Fragment>
          );
        }}
      </SidebarLinkGroup>
    );
  }
  return (
    <li>
      <NavLink
        to={to}
        className={`group relative flex items-center gap-2.5 rounded-sm py-2 px-4 font-medium text-bodydark1 duration-300 ease-in-out hover:bg-graydark dark:hover:bg-meta-4 ${pathname === to || pathname.startsWith(to + "/") ? 'bg-graydark dark:bg-meta-4' : ''
          }`}
      >
        {icon}
        {label}
      </NavLink>
    </li>

  )
}

export default SidebarItem