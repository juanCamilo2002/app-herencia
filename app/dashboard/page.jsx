import React from 'react';
import KpiCard from '../ui/dashboard/kpi/KpiCard';
import { MdOutlineAttachMoney,  MdOutlineSell } from "react-icons/md";
import { BsCartDash } from "react-icons/bs";
import TableSales from '../ui/dashboard/tableSales/TableSales';
const DashboardPage = () => {
  return (
    <div>
      <div style={{ display: 'flex', gap: 70 }}>
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
          value="5.257.000"
          percent="-2.3"
          message="desde el mes pasado"
          colorPercent="red"
        />
        <KpiCard
          title="Monto en deuda"
          icon={<BsCartDash size={30}/>}
          value="1.235.000"
          percent="23.50"
          message="desde el mes pasado"
          colorPercent="green"
        />
       
      </div>

      <TableSales />

    </div>
  );
}

export default DashboardPage;
