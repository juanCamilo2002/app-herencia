"use client"
import { useState } from "react";
import styles from "./searchfilter.module.css";
import { IoSearchOutline } from "react-icons/io5";

const SearchFilter = ({ searchTerm, handleSearch }) => {
    const [isFocus, setIsFocus] = useState(false);
    const handleFocus = () => setIsFocus(true);
    const handleBlur = () => setIsFocus(false);
    return (
        <div
            className={`${styles.searchContainer} ${isFocus && styles.focus}`}
            onFocus={handleFocus}
            onBlur={handleBlur}
        >
            <input
                type="text"
                placeholder="Filtrar datos..."
                value={searchTerm}
                onChange={handleSearch}
            />
            <IoSearchOutline size={20} className={styles.iconSearch} />
        </div>
    )
}

export default SearchFilter
