import styles from "./modal.module.css";
import { useState, useEffect } from "react";

const Modal = ({ textBody, icon, subimt, onClose, onCancel, onAccept }) => {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            // Bloquear el scroll del body cuando el modal está abierto
            if (isOpen) {
                document.body.style.overflow = "hidden";
            }
        };

        if (isOpen) {
            document.body.style.overflow = "hidden";
            window.addEventListener("scroll", handleScroll);
        } else {
            // Restaurar el scroll del body cuando el modal está cerrado
            document.body.style.overflow = "visible";
            window.removeEventListener("scroll", handleScroll);
        }

        // Limpieza al desmontar el componente
        return () => {
            document.body.style.overflow = "visible";
            window.removeEventListener("scroll", handleScroll);
        };
    }, [isOpen]);

    const handleClose = () => {
        setIsOpen(false);
        if (onClose) {
            onClose();
        }
    };

    const modalStyle = {
        position: "fixed", // Establecer la posición fija
        top: "50%", // Centrar verticalmente en la pantalla
        left: "50%", // Centrar horizontalmente en la pantalla
        transform: "translate(-50%, -50%)", // Centrar el modal
    };
    return (
        <div className={isOpen ? styles.container : styles.hidden} style={modalStyle}>
            <div className={styles.cardModal}>
                <div className={styles.top}>
                    <div className={styles.iconContainer}>{icon}</div>
                </div>
                <div className={styles.body}>
                    <span>{textBody}</span>
                </div>
                <div className={styles.footer}>
                    {!subimt && <button className={styles.cancelar} onClick={handleClose}>Cerrar</button>}
                    {subimt && (
                        <>
                            <button className={styles.cancelar} onClick={onCancel}>Cancelar</button>
                            <button className={styles.aceptar} onClick={onAccept}>Aceptar</button>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Modal;
