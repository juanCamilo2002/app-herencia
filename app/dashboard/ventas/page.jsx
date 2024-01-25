import KpiCard from "@/app/ui/dashboard/kpi/KpiCard";
import KpiContainer from "@ui/dashboard/kpiContainer/KpiContainer";
import { MdOutlineAttachMoney } from "react-icons/md";
import { BsCartDash, BsCartPlus } from "react-icons/bs";
import Title from "@ui/title/Title";
import SalesContainer from "@ui/sales/SalesContainer";


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
      <SalesContainer />
    </>
  )
}

export default Page
