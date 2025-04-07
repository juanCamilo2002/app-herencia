import React from "react";
import BreadCrumb from "../../../components/breadCrumb/BreadCrumb";
import MovementsTable from "../components/MovementsTable";

const MovementsPage = () => {
  return (
    <>
      <BreadCrumb pageName="Movimientos" />
      <MovementsTable />
    </>
  );
};

export default MovementsPage;
