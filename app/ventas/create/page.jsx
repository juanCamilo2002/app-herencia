import FormuCreateSales from "@ui/FormuCreateSales/FormuCreateSales"
import styles from "./page.module.css";
import Top from "@ui/sales/top/Top";


const Page = () => {  
  return (
    <div className={styles.container}>
      <Top />
      <FormuCreateSales />
    </div>
  )
}

export default Page
