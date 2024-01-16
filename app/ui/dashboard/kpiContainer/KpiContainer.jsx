import styles from "./kpiContainer.module.css";

const KpiContainer = ({children}) => {
  return (
    <div className={styles.kpiContainer}>
      {children}
    </div>
  )
}

export default KpiContainer
