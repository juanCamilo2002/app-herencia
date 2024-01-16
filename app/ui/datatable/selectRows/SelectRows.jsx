import styles from "./selectrows.module.css";

const SelectRows = ({handlePageSizeChange, pageSize, defaultPageSizeOptions}) => {
    return (
        <div className={styles.pageSizeContainer}>
            <span>Filas por pagina: </span>
            <select value={pageSize} onChange={handlePageSizeChange}>
                {defaultPageSizeOptions.map(option => (
                    <option key={option} value={option}>
                        {option}
                    </option>
                ))}
            </select>
        </div>
    )
}

export default SelectRows
