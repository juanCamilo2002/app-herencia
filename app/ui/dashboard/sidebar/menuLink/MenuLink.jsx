'use client'
import Link from "next/link";
import styles from "./menulink.module.css";
import { usePathname } from "next/navigation";
import { useSidebar } from "@/context/SidebarProvider";
const MenuLink = ({ item }) => {
    const pathname = usePathname();
    const { isOpen } = useSidebar();
   
    return (
        <Link href={item.path} className={`${styles.container} ${pathname === item.path && styles.active} ${!isOpen && styles.containerClose}`}>
            {item.icon}
            <span className={`${styles.span} ${!isOpen && styles.spanClose}`}>{item.title}</span>
        </Link>
    )
}

export default MenuLink
