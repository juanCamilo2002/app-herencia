"use client"
import React from 'react'
import ReactLoading from "react-loading";
import styles from "./loading.module.css";

const Loading = () => {
    
    return (
        <section className={styles.container}>
            <ReactLoading
                type='bubbles'
                color='#000000'
                height={50}
                width={50}
            />
            <span className={styles.title}>Cargando</span>
        </section>
    )
}

export default Loading;