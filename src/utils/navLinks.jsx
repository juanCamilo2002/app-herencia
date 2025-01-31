import DashIcon from "../assets/icons/dash.svg?react";
import CalendarIcon from "../assets/icons/calendar.svg?react";
import PersonIcon from "../assets/icons/person.svg?react";
import TxtIcon from "../assets/icons/txt.svg?react";
import TableIcon from "../assets/icons/table.svg?react";
import SettingsIcon from "../assets/icons/settings.svg?react";
import ChartIcon from "../assets/icons/chart.svg?react";
import UiIcon from "../assets/icons/ui.svg?react";
import AuthIcon from "../assets/icons/auth.svg?react";
import { ShoppingBagIcon } from "@heroicons/react/24/outline";


const navLinks = [
  {
    category: 'MENU',
    items: [
      {
        label: 'Dashboard',
        icon: <DashIcon className="fill-current" />,
        to: '/'
      },
      {
        label: 'Calendario',
        icon: <CalendarIcon className="fill-current" />,
        to: '/calendar'
      },
      {
        label: 'Ventas',
        icon: <ShoppingBagIcon className="h-5 w-5 text-gray-500" />,
        to: '/sales'
      },
      {
        label: 'Perfil',
        icon: <PersonIcon className="fill-current" />,
        to: '/profile'
      },
      {
        label: 'Formularios',
        icon: <TxtIcon className="fill-current" />,
        to: '/forms',
        children: [
          {
            label: 'Elementos del formulario',
            to: '/forms/form-elements'
          },
          {
            label: 'Diseño del formulario',
            to: '/forms/form-layout'
          }
        ]
      },
      {
        label: 'Tablas',
        icon: <TableIcon className="fill-current" />,
        to: '/tables'
      },
      {
        label: 'Ajustes',
        icon: <SettingsIcon className="fill-current" />,
        to: '/settings'

      },
    ]
  },
  {
    category: 'OTROS',
    items: [
      {
        label: 'Gráfico',
        icon: <ChartIcon className="fill-current" />,
        to: '/chart'
      },
      {
        label: 'Elementos UI',
        icon: <UiIcon className="fill-current" />,
        to: '/ui',
        children: [
          {
            label: 'Alertas',
            to: '/ui/alerts'
          },
          {
            label: 'Botones',
            to: '/ui/buttons'
          }
        ]
      },
      {
        label: 'Autenticación',
        icon: <AuthIcon className="fill-current" />,
        to: '/auth',
        children: [
          {
            label: 'Iniciar sesión',
            to: '/auth/signin'
          },
          {
            label: 'Registrarse',
            to: '/auth/signup'
          }
        ]
      },
      
    ]
  }
]

export default navLinks;