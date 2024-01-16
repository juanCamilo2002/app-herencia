
import { TbCalendarTime } from "react-icons/tb";
import styles from "./tablesales.module.css";
import Row from "./row/Row";
const sales = [
    {
        id: 1,
        customer: "Diego Ordoñez",
        product: "Vino Dulce",
        amountUnit: 2,
        priceUnit: 28000,
        total: 56000,
        status: true,
        date: "Hace 1s"
    },
    {
        id: 2,
        customer: "Diego Ordoñez",
        product: "Vino Ducle",
        amountUnit: 2,
        priceUnit: 28000,
        total: 56000,
        status: false,
        date: "Hace 1s"
    },
    {
        id: 3,
        customer: "Diego Ordoñez",
        product: "Vino Ducle",
        amountUnit: 2,
        priceUnit: 28000,
        total: 56000,
        status: true,
        date: "Hace 1s"
    },
    {
        id: 4,
        customer: "Diego Ordoñez",
        product: "Vino Ducle",
        amountUnit: 2,
        priceUnit: 28000,
        total: 56000,
        status: false,
        date: "Hace 1 dia"
    },
    {
        id: 5,
        customer: "Diego Ordoñez",
        product: "Vino Ducle",
        amountUnit: 2,
        priceUnit: 28000,
        total: 56000,
        status: null,
        date: "Hace 1s"
    },
    
]

const TableSales = () => {
    
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <span>Ventas más recientes</span>
                < TbCalendarTime className={styles.icon} />
            </div>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th className={styles.thStart}>Cliente</th>
                        <th className={styles.thCenter}>Producto</th>
                        <th className={styles.thCenter}>Cantidad</th>
                        <th className={styles.thCenter}>Precio unidad</th>
                        <th className={styles.thCenter}>Total</th>
                        <th className={styles.thCenter}>Estado</th>
                        <th className={styles.thEnd}>Hace</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => (
                        <Row key={ sale.id} sale={sale}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableSales;
