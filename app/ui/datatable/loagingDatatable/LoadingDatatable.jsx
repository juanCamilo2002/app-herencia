import ReactLoading from "react-loading";
import styles from "./loadingDatatable.module.css";

const LoadingDatatable = ({ colSpan }) => {
    return (
        <tr>
            <td colSpan={colSpan}>
                <div className={styles.container}>
                    <ReactLoading
                        type='bubbles'
                        color='#000000'
                        height={50}
                        width={50}
                    />
                    <span className={styles.title}>Cargando Datos</span>
                </div>
            </td>
        </tr>
    )
}

export default LoadingDatatable
