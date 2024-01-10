import KpiCard from '../ui/dashboard/kpi/KpiCard';
import { MdOutlineAttachMoney,  MdOutlineSell } from "react-icons/md";
import { BsCartDash } from "react-icons/bs";
import TableSales from '../ui/dashboard/tableSales/TableSales';
import styles from "./page.module.css";
import Title from '../ui/title/Title';

const DashboardPage = () => {

  return (
    <div >
     
      <Title title="Análisis con respecto al mes anterior"/>
      <div className={styles.kpiContainer}>
        <KpiCard
          title="Ventas"
          icon={<MdOutlineSell size={30}/>}
          value="201"
          percent="+12.3"
          message="desde el mes pasado"
          colorPercent="green"
        />
        <KpiCard
          title="Total del mes"
          icon={<MdOutlineAttachMoney size={30}/>}
          value="5257000"
          percent="-2.3"
          message="desde el mes pasado"
          colorPercent="red"
        />
        <KpiCard
          title="Monto en deuda"
          icon={<BsCartDash size={30}/>}
          value="1235000"
          percent="23.50"
          message="respecto al total del mes"
          colorPercent="green"
        /> 
      </div>

      <Title title="Novedades"/>
      <TableSales />
    </div>
  );
}

export default DashboardPage;
