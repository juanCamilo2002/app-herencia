import styles from "./row.module.css";
import { formatterNumberCol } from "@/lib/utils/currencyFormatter";
const Row = ({sale}) => {
    const statusValidate = (status, opcionUno, opcionDos, opciontres) =>{
        return status ? opcionUno : !status ? opcionDos : opciontres;
    }

    const classStatus = statusValidate(sale.status, styles.cancelado, styles.pendiente, styles.noAplica);
    return (
        <tr className={styles.row}>
            <td>{sale.customer}</td>
            <td>{sale.product}</td>
            <td>{sale.amountUnit}</td>
            <td>{formatterNumberCol(sale.priceUnit)}</td>
            <td>{formatterNumberCol(sale.total)}</td>
            <td>
                <div className={`${styles.estado} ${classStatus}`}>
                    <span>{statusValidate(sale.status, "Cancelado", "Pendiente", "No aplica")}</span>
                </div>
            </td>
            <td>{sale.date}</td>
        </tr>
    )
}

export default Row;
