"use client"
import BtnClose from "./btnClose/btnClose";
import menuLinks from "@/lib/utils/menulinks";
import MenuLink from "./menuLink/MenuLink";
import styles from "./sidebar.module.css";
import Top from "./top/Top";
import { RiShutDownLine } from "react-icons/ri";
import { useSidebar } from "@/context/SidebarProvider";
import { signOut } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";

const SideBar = () => {
    const { isOpen, toggleSideBar } = useSidebar();
    const classDynamic = `${styles.sidebar} ${!isOpen && styles.sidebarActive}`;
    const router = useRouter();
    const handleLogout = async () =>{
        await signOut({
            redirect: true, 
            callbackUrl: '/login', 
          });
    }
    return (
        <div className={classDynamic}>
            <BtnClose toggleSideBar={toggleSideBar} />
            <div className={styles.content}>
                <Top />
                <div className={styles.menuLinks}>
                    <ul className={`${styles.list} ${!isOpen && styles.listClose}`}>
                        {menuLinks.map(cat => (
                            <li key={cat.title}>
                                <span className={styles.cat}>{cat.title}</span>
                                {cat.list.map(item => (
                                    <MenuLink item={item} key={item.title} />
                                ))}
                            </li>
                        ))}
                    </ul>
                </div>
                <div className={`${styles.bottom} ${!isOpen && styles.bottomClose}`}>
                    <button onClick={handleLogout}>
                        <RiShutDownLine size={25} />
                        <span>Cerrar Sesión</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SideBar;
