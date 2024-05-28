"use client"
import { capitalizeTitle } from "@/lib/utils/capitalizeWord";
import styles from "./navbar.module.css";
import { usePathname } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";
import { useSidebar } from "@/context/SidebarProvider";
import { useState } from "react";
import { useSession } from 'next-auth/react';
const Navbar = () => {
    const { data: session } = useSession();
    const pathname = usePathname();
    const title = pathname.split("/").pop();
    const { isOpen } = useSidebar();
    const [isFocus, setIsFocus] = useState(false);
    const handleFocus = () => setIsFocus(true);
    const handleBlur = () => setIsFocus(false)
    return (
        <div className={`${styles.nav} ${!isOpen && styles.navClose}`}>
            <div className={styles.left}>
                <span>{capitalizeTitle(title)}</span>
            </div>
            <div className={styles.center}>
                <div
                    className={`${styles.divInput} ${isFocus && styles.focus}`}
                    onFocus={handleFocus}
                    onBlur={handleBlur}
                >
                    <input type="text" className={styles.input} placeholder="Buscar..." />
                    <IoSearchOutline size={20} className={styles.iconSearch} />
                </div>
            </div>
            <div className={styles.right}>
                <span className={styles.title}>Bienvenido</span>
                <span className={styles.name}>{session?.user.data.name}</span>
            </div>
        </div>
    );
}

export default Navbar;
