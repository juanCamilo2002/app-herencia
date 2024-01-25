"use client"
import { IoArrowBackSharp } from "react-icons/io5";
import styles from "./top.module.css";
import Link from "next/link";

const Top = () => {
    return (
        <div className={styles.top}>
            <Link href="/dashboard/ventas" className={styles.iconContainer} >
                <IoArrowBackSharp className={styles.icon} />
            </Link>
            <span className={styles.span}>Volver</span>
        </div>
    )
}

export default Top;
