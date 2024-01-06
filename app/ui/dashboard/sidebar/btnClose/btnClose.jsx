import { IoIosArrowBack } from "react-icons/io";
import styles from "./btnclose.module.css";
import { useSidebar } from "@/context/SidebarContext";


const BtnClose = ({ toggleSideBar }) => {
    const { isOpen } = useSidebar();
    const classBtnClose = `${styles.btnclose} ${!isOpen && styles.active}`;
    return (
        <div className={classBtnClose} onClick={() => toggleSideBar()}>
            <IoIosArrowBack color="white" size={25} alignmentBaseline="center" />
        </div>
    )
}

export default BtnClose;
