"use client"
import { useState } from "react";
import styles from "./input.module.css";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

const Input = ({ label, name, icon, type, onChange, onBlur, value, error }) => {
    const [visible, setIsVisible] = useState(false);

    const handleVisible = () => {
        setIsVisible(!visible);
    }
    return (
        <div className={styles.container}>
            <div className={styles.icon}>
                {icon}
            </div>
            <input
                name={name}
                className={styles.input}
                type={visible ? "text" : type}
                placeholder=""
                onChange={onChange}
                onBlur={onBlur}
                value={value}
            />
            <label className={styles.label}>{label}</label>
            {
                type === "password" &&
                (<div className={styles.iconLock} onClick={handleVisible}>
                    {visible ? <IoEyeOutline /> : <FaRegEyeSlash />}
                </div>)
            }
        </div>
    )
}

export default Input
