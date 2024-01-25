import RenderRows from "../renderRows/RenderRows";
import styles from "./table.module.css";

const Table = ({columns, currentData, datatableKeys, urlApi, getData, loading, title}) => {
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
                    getData={getData}
                    columns={columns}
                    loading = {loading}
                    title = {title}
                />
            </tbody>
        </table>
    )
}

export default Table
