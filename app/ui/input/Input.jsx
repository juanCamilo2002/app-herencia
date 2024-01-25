"use client"
import { useState } from "react";
import styles from "./input.module.css";
import { FaRegEyeSlash } from "react-icons/fa";
import { IoEyeOutline } from "react-icons/io5";

const classNameInput = (icon, type) => {
    if (!icon) {
        if(type === "password"){
            return `${styles.inputWithOutIcon} ${styles.inputWithOutIconPassword}`;
        }
        return styles.inputWithOutIcon
    };

    if (type === "password") return `${styles.inputIcon} ${styles.input}`;
    return styles.inputIcon;
}

const Input = ({ label, name, icon, type, onChange, onBlur, value, onFocus, autoComplete, readonly }) => {
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
                className={classNameInput(icon, type)}
                type={visible ? "text" : type}
                placeholder=""
                onChange={onChange}
                onBlur={onBlur}
                value={value}
                onFocus={onFocus}
                autoComplete={autoComplete}
                readOnly={readonly}
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

export default Input;