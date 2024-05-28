import styles from "./select.module.css";
import { capitalizeTitle } from "@/lib/utils/capitalizeWord";

const Select = ({ icon, name, onChange, onBlur, value, onFocus, autoComplete, readOnly, options, label }) => {
    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                {icon}
            </div>
            <select
                name={name}
                className={styles.select}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                onFocus={onFocus}
                autoComplete={autoComplete}
                readOnly={readOnly}
            >
                <option value="">seleccionar</option>
                {options.map((o) => (
                     <option key={o} value={o}>{capitalizeTitle(o)}</option>
                ))}
                
            </select>
            <label className={styles.label}>{label}</label>
        </div>
    )
}

export default Select;
