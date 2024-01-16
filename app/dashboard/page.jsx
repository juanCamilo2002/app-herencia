import KpiCard from '@ui/dashboard/kpi/KpiCard';
import { MdOutlineAttachMoney, MdOutlineSell } from "react-icons/md";
import { BsCartDash } from "react-icons/bs";
import TableSales from '@ui/dashboard/tableSales/TableSales';

import Title from '@ui/title/Title';
import KpiContainer from '@ui/dashboard/kpiContainer/KpiContainer';

const dashboardKpis = [
  {
    title: "Ventas",
    icon: <MdOutlineSell size={30} />,
    value: "201",
    percent: "+12.3",
    message: "desde el mes pasado",
    colorPercent: "green"
  },
  {
    title: "Total del mes",
    icon: <MdOutlineAttachMoney size={30} />,
    value: "5257000",
    percent: "-2.3",
    message: "desde el mes pasado",
    colorPercent: "red"
  },
  {
    title: "Monto en deuda",
    icon: <BsCartDash size={30} />,
    value: "1235000",
    percent: "23.50",
    message: "respecto al total del mes",
    colorPercent: "green"
  },
]
const DashboardPage = () => {
  return (
    <div >
      <Title title="Análisis con respecto al mes anterior" />
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
      <Title title="Novedades" />
      <TableSales />
    </div>
  );
}

export default DashboardPage;
