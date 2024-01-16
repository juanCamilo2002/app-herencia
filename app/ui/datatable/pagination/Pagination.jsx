import styles from "./pagination.module.css";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({ currentPage, handlePageChange, totalPages, start, end, lengthData }) => {
    return (
        <div className={styles.pagination}>
            <span>
                {lengthData === 0 ? 0 : start + 1} - {end > lengthData ? lengthData : end} de {lengthData}
            </span>
            <button
                disabled={currentPage === 1}
                onClick={() => handlePageChange(currentPage - 1)}
            >
                <IoIosArrowBack size={20} />
            </button>
            <button
                disabled={currentPage === totalPages || lengthData === 0}
                onClick={() => handlePageChange(currentPage + 1)}
            >
                <IoIosArrowForward size={20} />
            </button>
        </div>
    )
}

export default Pagination
