import FormuCreateSales from "@ui/FormuCreateSales/FormuCreateSales"
import styles from "./page.module.css";
import Top from "@ui/sales/top/Top";


const Page = () => {  
  return (
    <div className={styles.container}>
      <Top />
      <h1 className={styles.title}>Crear Venta</h1>
      <FormuCreateSales />
    </div>
  )
}

export default Page;
