import styles from "./title.module.css";

const Title = ({ title }) => {
    return (
        <div className={styles.container}>
            <span className={styles.titleSpan}>{title}</span>
        </div>
    )
}

export default Title;
