import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import BtnPayLiquidations from "../components/BtnPayLiquidations";
import LiquidationTable from "../components/LiquidationsTable";

const LiquidationsPage = () => {
  return (
    <>
      <BreadCrumb pageName="Liquidaciones" />
      <BtnPayLiquidations />
      <LiquidationTable />
    </>
  );
};

export default LiquidationsPage;
