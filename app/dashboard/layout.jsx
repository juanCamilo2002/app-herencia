"use client"
import React, { useEffect, useState } from 'react'
import SideBar from '../ui/dashboard/sidebar/SideBar';
import styles from "./dashboard.module.css";
import { useSidebar } from '@/context/SidebarProvider';
import Navbar from '../ui/dashboard/navbar/Navbar';
import Loading from '../ui/Loading/Loading';

const layout = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const { isOpen } = useSidebar();

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 3000)
    }, []);
    return (
        <>
            {loading ?
                (<Loading />)
                : (<div className={styles.container}>
                    <SideBar />
                    <div className={`${styles.wrapper} ${!isOpen && styles.wrapperClose}`}>
                        <Navbar />
                        <div className={styles.content}>
                            {children}
                        </div>
                    </div>
                </div>)
            }
        </>
    )
}



export default layout
