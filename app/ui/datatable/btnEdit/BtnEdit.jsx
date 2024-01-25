import { CiEdit } from "react-icons/ci";
import styles from "./btnEdit.module.css";
import Link from "next/link";

const BtnEdit = ({title, id}) => {
  return (
    <Link href={`/${title}/edit/${id}`} className={styles.button}>
      <CiEdit  size={20}/>
    </Link>
  )
}

export default BtnEdit
