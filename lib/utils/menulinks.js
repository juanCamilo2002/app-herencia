import { TfiStatsUp } from "react-icons/tfi";
import { RxDashboard } from "react-icons/rx";
import { MdOutlineSell } from "react-icons/md";
import { IoPersonOutline,  IoBagHandleOutline } from "react-icons/io5";

const menuLinks = [
  {
      title: "Menu",
      list: [
        {
          title: "Dashboard",
          path: "/dashboard",
          icon: <RxDashboard  size={25} fontWeight={900}/>,
        },
        {
          title: "Ventas",
          path: "/dashboard/ventas",
          icon: <MdOutlineSell  size={25} fontWeight={900}/>,
        },
        {
          title: "Clientes",
          path: "/dashboard/clientes",
          icon: <IoPersonOutline size={25} fontWeight={900}/>,
        },
        {
          title: "Productos",
          path: "/dashboard/productos",
          icon: <IoBagHandleOutline  size={25} fontWeight={900}/>,
        },
        {
          title: "Estadisticas",
          path: "/dashboard/estadisticas",
          icon: <TfiStatsUp size={25} fontWeight={900}/>,
        },
      ],
    },
]


export default menuLinks;