"use client"
import { useEffect, useState } from 'react';
import Input from '../input/Input'
import styles from "./inputDataFilter.module.css";
import { useSession } from 'next-auth/react';

const InputDataFilter = ({ setValue, filteredKeys, setValueInput, getDataFilter, placeholder, icon, value }) => {
    const { data: session } = useSession();
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isOptionsVisible, setOptionsVisible] = useState(false);
    const token = session?.user?.data?.accessToken;

    const getData = async () => {
        try {
            if (token) {
                const res = await getDataFilter(token);
                setData(res.data);
            }
        } catch (error) {
            console.error("Error al obtener los clientes:", error);
        }
    }


    useEffect(() => {
        getData();
        if(value) setSearchTerm(value);
    }, [token, value]);


    const handleChange = (e) => {
        setSearchTerm(e.target.value);
        setOptionsVisible(true);
        if (e.target.value === "") {
            setValue("");
        }
    }

    const handleOptionClick = (option) => {
        setValue(option._id);
        setOptionsVisible(false);
        setSearchTerm(option[setValueInput])
    }



    const filteredData = data.filter((c) => {
        const stringValue = searchTerm.toLowerCase();
        return filteredKeys.some((key) => c[key].toLowerCase().includes(stringValue));
    });

    return (
        <div className={styles.container}>
            <Input
                icon={icon}
                label={placeholder}
                name="client"
                onChange={(e) => handleChange(e)}
                value={searchTerm}
                autoComplete="off"
            />
            {isOptionsVisible && filteredData.length > 0 && (
                <div className={styles.options}>
                    {searchTerm && filteredData.map((c) => (
                        <div
                            key={c._id}
                            className={styles.option}
                            onClick={(e) => handleOptionClick(c, e)}
                        >
                            <span className={styles.title}>{c[filteredKeys[0]]}</span>
                            {filteredKeys[1] === "company"
                                && <span className={styles.subtTitle}>{c[filteredKeys[1]]}</span>}
                        </div>

                    ))}
                </div>)}
        </div>
    )
}
export default InputDataFilter