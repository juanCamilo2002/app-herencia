import { formatterNumberCol } from "@/lib/utils/currencyFormatter";
import styles from "./renderrows.module.css";
import BtnEdit from "../btnEdit/BtnEdit";
import BtnDelete from "../btnDelete/BtnDelete";

const renderDataCell = (column, value, urlApi, id) => {
    const options = ["total", "priceunit"];
    if (typeof value === "number" && options.includes(column.toLowerCase())) {
        return (
            <div className={styles.center}>
                <span >{formatterNumberCol(value)}</span>
            </div>
        );
    }

    if (typeof value === "number") {
        return (
            <div className={styles.center}>
                <span >{value}</span>
            </div>
        );
    }
    if (column === "actions" && value === true) {
        return (
            <div className={styles.actions}>
                <BtnEdit />
                <BtnDelete urlApi={urlApi} id={id} />
            </div>
        );
    }

    if (column === "status") {
        if (value === false) {
            return (
                <div className={`${styles.center} ${styles.pendiente}`}>
                    <span>Pendiente</span>
                </div>
            );
        }

        if (value === undefined) {
            return (
                <div className={`${styles.center} ${styles.muestra}`}>
                    <span>Muestra</span>
                </div>
            );
        }

        return (
            <div className={`${styles.center} ${styles.cancelado}`}>
                <span>Cancelado</span>
            </div>
        );
    }
    return value;
}


const TableRow = ({ row, datatableKeys, urlApi }) => (
    <tr>
        {datatableKeys.map((datatableKey) => (
            datatableKey !== 'id' && (
                <td key={datatableKey}>
                    {renderDataCell(datatableKey, row[datatableKey], urlApi, row['id'])}
                </td>
            )
        ))}
    </tr>
);

const RenderRows = ({ currentData, datatableKeys, urlApi }) => {
    return (
        <>
            {
                currentData.length === 0
                    ? (
                        <tr >
                            <td colSpan={datatableKeys.length} style={{ textAlign: "center" }}>
                                No hay datos que mostrar
                            </td>
                        </tr>)
                    : (
                        currentData.map((row, index) => (
                            <TableRow
                                key={index}
                                row={row}
                                datatableKeys={datatableKeys}
                                urlApi={urlApi}
                            />
                        )))
            }
        </>
    )
}



export default RenderRows;



