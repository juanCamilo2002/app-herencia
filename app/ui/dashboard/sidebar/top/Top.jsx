import Image from "next/image";
import styles from "./top.module.css";
import { useSidebar } from "@/context/SidebarProvider";


const Top = () => {
    const { isOpen } = useSidebar();
    return (
        <div className={`${styles.container} ${!isOpen && styles.close}`}>
            <Image src="/Herencia_logo.jpg" width="40" height="40" className={styles.logo} alt="logo" />
            <span className={`${styles.title} ${!isOpen && styles.spanClose}`}>Herencia</span>
        </div>
    )
}

export default Top;
