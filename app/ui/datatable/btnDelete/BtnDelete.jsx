import { AiOutlineDelete } from "react-icons/ai";
import styles from "./btnDelete.module.css";

const BtnDelete = ({urlApi, id}) => {
  const handleDelete = () =>{
    alert(process.env.NEXT_PUBLIC_BACKEND_URL +  `/${urlApi}/${id}`)
  }
  return (
    <button className={styles.button} onClick={handleDelete}>
        <AiOutlineDelete  size={20}/>
    </button>
  )
}

export default BtnDelete
