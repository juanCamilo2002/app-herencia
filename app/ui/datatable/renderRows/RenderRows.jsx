import { formatterNumberCol } from "@/lib/utils/currencyFormatter";
import styles from "./renderrows.module.css";
import BtnEdit from "../btnEdit/BtnEdit";
import BtnDelete from "../btnDelete/BtnDelete";
import moment from "moment";
import LoadingDatatable from "../loagingDatatable/LoadingDatatable";

const renderDataCell = (column, value, urlApi, id, getData, title) => {
    if (value instanceof Date || column === "date") {
        const date = moment(value);
        return date.format("DD/MM/YYYY");
    }

    if (typeof value === "number") {
        const options = ["totalprice", "unitprice"];
        let colum = column.toLowerCase();

        const formattedValue = options.includes(colum)
            ? formatterNumberCol(value)
            : value

        return (
            <div className={styles.center}>
                <span >{formattedValue}</span>
            </div>
        );
    }

    if (column === "actions" && value === true) {
        return (
            <div className={styles.actions}>
                <BtnEdit title={title} id={id}/>
                <BtnDelete urlApi={urlApi} id={id} getData={getData} />
            </div>
        );
    }

    if (column === "status" || column === "pay") {
        let className = styles.center;
        if (value === false) {
            className += ` ${styles.pendiente}`
            return (
                <div className={className}>
                    <span>Pendiente</span>
                </div>
            );
        }

        if (value === null) {
            className += ` ${styles.muestra}`
            return (
                <div className={className}>
                    <span>Muestra</span>
                </div>
            );
        }

        className += ` ${styles.cancelado}`
        return (
            <div className={className}>
                <span>Cancelado</span>
            </div>
        );
    }
    return value;
}


const TableRow = ({ row, datatableKeys, urlApi, getData, title }) => (
    <tr>
        {datatableKeys.map((datatableKey) => (
            datatableKey !== 'id' && (
                <td key={datatableKey}>
                    {renderDataCell(datatableKey, row[datatableKey], urlApi, row['id'], getData, title)}
                </td>
            )
        ))}
    </tr>
);

const RenderRows = ({ currentData, datatableKeys, urlApi, getData, columns, loading, title }) => {
    const noDataMessage = (
        <tr>
            <td colSpan={columns.length} style={{ textAlign: "center" }}>
                No hay datos que mostrar
            </td>
        </tr>
    );

    const dataRows = currentData.map((row, index) => (
        <TableRow
            key={index}
            row={row}
            datatableKeys={datatableKeys}
            urlApi={urlApi}
            getData={getData}
            title={title}
        />
    ));
    return (
        <>
            {
                loading 
                ? <LoadingDatatable colSpan={columns.length}/> 
                : (currentData.length === 0 ? (noDataMessage) : (dataRows))
            }
        </>
    )
}
export default RenderRows;