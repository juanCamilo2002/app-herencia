import RenderRows from "../renderRows/RenderRows";
import styles from "./table.module.css";

const Table = ({columns, currentData, datatableKeys, urlApi}) => {
    return (
        <table className={styles.datatable}>
            <thead>
                <tr>
                    {columns.map(column => (
                        <th key={column}>{column}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                <RenderRows
                    currentData={currentData}
                    datatableKeys={datatableKeys}
                    urlApi={urlApi}
                />
            </tbody>
        </table>
    )
}

export default Table
