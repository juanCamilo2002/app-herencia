import { TbCalendarTime } from "react-icons/tb";
import styles from "./tablesales.module.css";
import Row from "./row/Row";

const sales = [
    {
        customer: "Diego Ordoñez",
        product: "Vino Ducle",
        amountUnit: 2,
        priceUnit: 28000,
        total: 56000,
        status: true,
        date: "Hace 1s"
    },
    {
        customer: "Diego Ordoñez",
        product: "Vino Ducle",
        amountUnit: 2,
        priceUnit: 28000,
        total: 56000,
        status: false,
        date: "Hace 1s"
    },
    {
        customer: "Diego Ordoñez",
        product: "Vino Ducle",
        amountUnit: 2,
        priceUnit: 28000,
        total: 56000,
        status: true,
        date: "Hace 1s"
    },
    {
        customer: "Diego Ordoñez",
        product: "Vino Ducle",
        amountUnit: 2,
        priceUnit: 28000,
        total: 56000,
        status: false,
        date: "Hace 1s"
    },
    {
        customer: "Diego Ordoñez",
        product: "Vino Ducle",
        amountUnit: 2,
        priceUnit: 28000,
        total: 56000,
        status: false,
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
                        <th>Cliente</th>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio unidad</th>
                        <th>Total</th>
                        <th>Estado</th>
                        <th>Hace</th>
                    </tr>
                </thead>
                <tbody>
                    {sales.map((sale) => (
                        <Row key={sale.customer} sale={sale}/>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableSales;
