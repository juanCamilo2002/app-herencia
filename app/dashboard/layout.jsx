"use client"
import React from 'react'
import SideBar from '../ui/dashboard/sidebar/SideBar';
import styles from "./dashboard.module.css";
import { useSidebar } from '@/context/SidebarContext';
import Navbar from '../ui/dashboard/navbar/Navbar';

const layout = ({ children }) => {
    const { isOpen } = useSidebar();
    return (
        <div className={styles.container}>
            <SideBar />
            <div className={ `${styles.wrapper} ${!isOpen && styles.wrapperClose}`}>
                <Navbar />
                <div className={styles.content}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default layout
