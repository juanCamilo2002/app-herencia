import DashIcon from "../assets/icons/dash.svg?react";
import CalendarIcon from "../assets/icons/calendar.svg?react";
import PersonIcon from "../assets/icons/person.svg?react";
import TxtIcon from "../assets/icons/txt.svg?react";
import TableIcon from "../assets/icons/table.svg?react";
import SettingsIcon from "../assets/icons/settings.svg?react";
import ChartIcon from "../assets/icons/chart.svg?react";
import UiIcon from "../assets/icons/ui.svg?react";
import AuthIcon from "../assets/icons/auth.svg?react";
import { BuildingStorefrontIcon, ShoppingBagIcon } from "@heroicons/react/24/outline";
import { UsersIcon } from "@heroicons/react/24/outline";
import { BanknotesIcon } from "@heroicons/react/24/outline";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";




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
        label: 'Movimientos',
        icon: <ArrowTrendingUpIcon className="h-5 w-5 text-gray-500" />,
        to: '/movements'
      },
      // {
      //   label: 'Calendario',
      //   icon: <CalendarIcon className="fill-current" />,
      //   to: '/calendar'
      // },
      {
        label: 'Liquidaciones',
        icon: <BanknotesIcon  className="h-5 w-5 text-gray-500" />,
        to: '/liquidations'
      },
      {
        label: 'Ventas',
        icon: <BuildingStorefrontIcon className="h-5 w-5 text-gray-500" />,
        to: '/sales'
      },
      
      {
        label: 'Productos',
        icon: <ShoppingBagIcon className="h-5 w-5 text-gray-500" />,
        to: '/products'
      },
      
      {
        label: 'Clientes',
        icon: <UsersIcon className="h-5 w-5 text-gray-500" />,
        to: '/customers'
      },
      {
        label: 'Vendedores',
        icon: <ShoppingBagIcon className="h-5 w-5 text-gray-500" />,
        to: '/sellers'
      },
      // {
      //   label: 'Formularios',
      //   icon: <TxtIcon className="fill-current" />,
      //   to: '/forms',
      //   children: [
      //     {
      //       label: 'Elementos del formulario',
      //       to: '/forms/form-elements'
      //     },
      //     {
      //       label: 'Diseño del formulario',
      //       to: '/forms/form-layout'
      //     }
      //   ]
      // },
      // {
      //   label: 'Tablas',
      //   icon: <TableIcon className="fill-current" />,
      //   to: '/tables'
      // },
      
    ]
  },
  {
    category: 'OTROS',
    items: [
      {
        label: 'Perfil',
        icon: <PersonIcon className="fill-current" />,
        to: '/profile'
      },
      {
        label: 'Ajustes',
        icon: <SettingsIcon className="fill-current" />,
        to: '/settings'

      },
      // {
      //   label: 'Gráfico',
      //   icon: <ChartIcon className="fill-current" />,
      //   to: '/chart'
      // },
      // {
      //   label: 'Elementos UI',
      //   icon: <UiIcon className="fill-current" />,
      //   to: '/ui-elements',
      //   children: [
      //     {
      //       label: 'Alertas',
      //       to: '/ui/alerts'
      //     },
      //     {
      //       label: 'Botones',
      //       to: '/ui/buttons'
      //     }
      //   ]
      // },
      // {
      //   label: 'Autenticación',
      //   icon: <AuthIcon className="fill-current" />,
      //   to: '/auth',
      //   children: [
      //     {
      //       label: 'Iniciar sesión',
      //       to: '/auth/signin'
      //     },
      //     {
      //       label: 'Registrarse',
      //       to: '/auth/signup'
      //     }
      //   ]
      // },
      
    ]
  }
]

export default navLinks;