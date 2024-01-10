import styles from "./row.module.css";
import { formatterNumberCol } from "@/lib/utils/currencyFormatter";
const Row = ({ sale }) => {
    const statusValidate = (status, opcionUno, opcionDos, opciontres) => {
        return status
            ? opcionUno
            : status === false ? opcionDos
                : status === null && opciontres;
    }

    const classStatus = statusValidate(sale.status, styles.cancelado, styles.pendiente, styles.noAplica);
    return (
        <tr className={styles.row}>
            <td className={styles.tdStart}>{sale.customer}</td>
            <td className={styles.tdCenter}>{sale.product}</td>
            <td className={styles.tdCenter}>{sale.amountUnit}</td>
            <td className={styles.tdCenter}>{formatterNumberCol(sale.priceUnit)}</td>
            <td className={styles.tdCenter}>{formatterNumberCol(sale.total)}</td>
            <td className={styles.tdStatusCenter}>
                <span className={`${styles.estado} ${classStatus}`} >
                    {statusValidate(sale.status, "Cancelado", "Pendiente", "No aplica")}
                </span>
            </td>
            <td className={styles.tdEnd}>{sale.date}</td>
        </tr>
    )
}

export default Row;
