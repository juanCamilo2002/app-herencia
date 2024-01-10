import { decimalFormatter } from "@/lib/utils/currencyFormatter";
import styles from "./kpiCard.module.css";

const KpiCard = ({ title, icon, value, percent, colorPercent, message }) => {
  const color = colorPercent === "red" ? "#DB0505" : "#159700";
  return (
    <div className={styles.card}>
      <div className={styles.top}>
        <span>{title}</span>
          {icon}
      </div>
      <div className={styles.center}>
        <span>{decimalFormatter({value})}</span>
      </div>
      <div className={styles.bottom}>
        <span className={styles.percent} style={{color: color}} >{percent}%</span>
        <span className={styles.subtitle}>{message}</span>
      </div>
    </div>
  )
}

export default KpiCard;
