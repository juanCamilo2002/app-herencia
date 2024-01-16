import KpiCard from "@/app/ui/dashboard/kpi/KpiCard";
import KpiContainer from "@ui/dashboard/kpiContainer/KpiContainer";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BsCartDash, BsCartPlus } from "react-icons/bs";
import Title from "@ui/title/Title";
import Datatable from "@ui/datatable/Datatable";

const dashboardKpis = [
  {
    title: "Total del mes",
    icon: <MdOutlineAttachMoney size={30} />,
    value: "5257000",
    percent: "-2.3",
    message: "desde el mes pasado",
    colorPercent: "red"
  },
  {
    title: "Total abonado",
    icon: <BsCartPlus size={30} />,
    value: "4022000",
    percent: "76.50",
    message: "respecto a total del mes",
    colorPercent: "green"
  },
  {
    title: "Monto en deuda",
    icon: <BsCartDash size={30} />,
    value: "1235000",
    percent: "23.50",
    message: "respecto al total del mes",
    colorPercent: "green"
  },
];

const columns = [
  "Fecha",
  "Cliente",
  "Producto",
  "Cantidad",
  "Precio unidad",
  "Total",
  "Estado",
  "Acciones"
];


const data = [
  { 
    id: "6584c4fc2733416cb2e64101",
    date: "01/12/2023", 
    customer: 'Diego Ordoñez',
    product: "Vino dulce", 
    amount: 2, 
    priceUnit: 28000, 
    total: 56000, 
    status: true,  
    actions: true
  },
  { 
    id: 2,
    date: "01/12/2023", 
    customer: 'Camilo Ordoñez',
    product: "Vino dulce", 
    amount: 2, 
    priceUnit: 28000, 
    total: 56000, 
    status: false,  
    actions: true
  },
  { 
    id: 3,
    date: "01/12/2023", 
    customer: 'Diego Ordoñez',
    product: "Vino dulce", 
    amount: 2, 
    priceUnit: 28000, 
    total: 56000, 
    status: undefined,  
    actions: true
  },
  { 
    id: 2,
    date: "01/12/2023", 
    customer: 'Diego Ordoñez',
    product: "Vino dulce", 
    amount: 2, 
    priceUnit: 28000, 
    total: 56000, 
    status: false,  
    actions: true
  },
  { 
    id: 3,
    date: "01/12/2023", 
    customer: 'Diego Ordoñez',
    product: "Vino dulce", 
    amount: 2, 
    priceUnit: 28000, 
    total: 56000, 
    status: undefined,  
    actions: true
  },
  { 
    id: 1,
    date: "01/12/2023", 
    customer: 'Diego Ordoñez',
    product: "Vino dulce", 
    amount: 2, 
    priceUnit: 28000, 
    total: 56000, 
    status: true,  
    actions: true
  },
  { 
    id: 1,
    date: "01/12/2023", 
    customer: 'Diego Ordoñez',
    product: "Vino dulce", 
    amount: 2, 
    priceUnit: 28000, 
    total: 56000, 
    status: true,  
    actions: true
  },
  { 
    id: 2,
    date: "01/12/2023", 
    customer: 'Diego Ordoñez',
    product: "Vino dulce", 
    amount: 2, 
    priceUnit: 28000, 
    total: 56000, 
    status: false,  
    actions: true
  },
  { 
    id: 3,
    date: "01/12/2023", 
    customer: 'Diego Ordoñez',
    product: "Vino dulce", 
    amount: 2, priceUnit: 28000, 
    total: 56000, 
    status: undefined,  
    actions: true
  },
  { 
    id: 2,
    date: "01/12/2023", 
    customer: 'Diego Ordoñez',
    product: "Vino dulce", 
    amount: 2, 
    priceUnit: 28000, 
    total: 56000, 
    status: false,  
    actions: true
  },
  { 
    id: 3,
    date: "01/12/2023", 
    customer: 'Diego Ordoñez',
    product: "Vino dulce", 
    amount: 2, 
    priceUnit: 28000, 
    total: 56000, 
    status: undefined,  
    actions: true
  },
  { 
    id: 1,
    date: "01/12/2023", 
    customer: 'Diego Ordoñez',
    product: "Vino dulce", 
    amount: 2, 
    priceUnit: 28000, 
    total: 56000, 
    status: true,  
    actions: true
  },
  
  
];


const Page = () => {
  return (
    <>
      <Title title={"Datos actuales del mes"} />
      <KpiContainer>
        {dashboardKpis.map((kpi) => (
          <KpiCard
            key={kpi.title}
            title={kpi.title}
            icon={kpi.icon}
            value={kpi.value}
            percent={kpi.percent}
            message={kpi.message}
            colorPercent={kpi.colorPercent}
          />
        ))}
      </KpiContainer>
      <Datatable
        columns={columns}
        data={data}
        defaultPageSizeOptions={[5, 10, 20, 30]}
        title="ventas"
        urlApi="sales"
      />
    </>
  )
}

export default Page
