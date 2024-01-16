import { CiEdit } from "react-icons/ci";
import styles from "./btnEdit.module.css";

const BtnEdit = () => {
  return (
    <button className={styles.button}>
      <CiEdit  size={20}/>
    </button>
  )
}

export default BtnEdit
