import Top from "@ui/sales/top/Top";
import styles from "./page.module.css";
import FormuUpdateSales from "@ui/FormuUpdateSales/FormuUpdateSales";

const Page = ({ params }) => {
    return (
        <div className={styles.container}>
            <Top />
                <h1 className={styles.title} >Editar venta</h1>
                {/* {params.id} */}
            <FormuUpdateSales idSale={params.id}/>
        </div>
    )
}

export default Page;
