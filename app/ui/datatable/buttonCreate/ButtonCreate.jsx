import Link from "next/link";
import styles from "./buttoncreate.module.css";
import { IoAddOutline } from "react-icons/io5";

const ButtonCreate = ({title}) => {
    return (
        <Link
            href={`/dashboard/${title}/create`}
            className={styles.link}
        >
            <IoAddOutline size={20}/>
            Agregar {title}
        </Link>
    )
}

export default ButtonCreate
