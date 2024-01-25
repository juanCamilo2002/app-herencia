"use client"
import { AiOutlineDelete } from "react-icons/ai";
import styles from "./btnDelete.module.css";
import { useSession } from "next-auth/react";
import { createAxiosInstancie } from "@/lib/utils/api";
import { useState } from "react";
import Modal from "../../modal/Modal";
import { FiTrash } from "react-icons/fi";

const BtnDelete = ({ urlApi, id, getData }) => {
  const { data: session } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const token = session.user.data.accessToken;

  const handleDelete = () => {
    setIsModalOpen(true);
  }

  const handleModalCancel = () => {
    setIsModalOpen(false);
  }

  const handleModalAccept = async () => {
    setIsModalOpen(false);
    const customApiInstace = createAxiosInstancie(token);
    try {
      await customApiInstace.delete(`/${urlApi}/${id}`);
    } catch (error) {
      console.error(error)
    }

    getData();
  }

  return (
    <div>
      <button className={styles.button} onClick={handleDelete}>
        <AiOutlineDelete size={20} />
      </button>
      {isModalOpen && (
        <Modal
          icon={<FiTrash size={20} color="red" />}
          textBody={"¿Estás seguro de eliminar este item?"}
          subimt={true}
          onCancel={handleModalCancel}
          onAccept={handleModalAccept} />
      )}
    </div>
  )
}

export default BtnDelete
