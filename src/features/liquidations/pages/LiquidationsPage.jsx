import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import LiquidationTable from "../components/LiquidationsTable";

const LiquidationsPage = () => {
  return (
    <>
      <BreadCrumb pageName="Liquidaciones" />
      <LiquidationTable />
    </>
  );
};

export default LiquidationsPage;
