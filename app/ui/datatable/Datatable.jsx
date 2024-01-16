"use client"
import SearchFilter from "./SearchFilter/SearchFilter";
import styles from "./datatable.module.css";
import { useState } from "react";
import Pagination from "./pagination/Pagination";
import ButtonCreate from "./buttonCreate/ButtonCreate";
import SelectRows from "./selectRows/SelectRows";
import Table from "./table/Table";

const Datatable = ({ columns, data, defaultPageSizeOptions, title, urlApi }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(defaultPageSizeOptions[0]);
    const [searchTerm, setSearchTerm] = useState('');


    const datatableKeys = Array.from(
        new Set(data.flatMap(d => Object.keys(d)))
    );

    const filteredData = data.filter((row) => {
        return datatableKeys.some((datatableKey) => {
            const cellValue = row[datatableKey];
            if (datatableKey === 'status') {
                const statusMapping = {
                    true: 'Cancelado',
                    false: 'Pendiente',
                    undefined: 'Muestra',
                };


                const statusString = statusMapping[cellValue];

                return statusString !== undefined && statusString.toLowerCase().includes(searchTerm.toLowerCase());
            }
            if (cellValue !== undefined && cellValue !== null) {
                const stringValue = cellValue.toString().toLowerCase();
                return stringValue.includes(searchTerm.toLowerCase());
            }

            return false;
        });
    })

    const totalPages = Math.ceil(filteredData.length / pageSize);
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const currentData = filteredData.slice(startIndex, endIndex);


    const handlePageChange = newPage => {
        setCurrentPage(newPage);
    }

    const handlePageSizeChange = (e) => {
        setPageSize(parseInt(e.target.value, 10));
        setCurrentPage(1);
    }

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1);
    }

    return (
        <div className={styles.datatableContainer}>
            <div className={styles.topOptions}>
                <ButtonCreate title={title} />
                <SearchFilter searchTerm={searchTerm} handleSearch={handleSearch} />
            </div>

            <Table
                columns={columns}
                currentData={currentData}
                datatableKeys={datatableKeys}
                urlApi={urlApi}
            />

            <div className={styles.bottomContainer}>
                <SelectRows
                    handlePageSizeChange={handlePageSizeChange}
                    pageSize={pageSize}
                    defaultPageSizeOptions={defaultPageSizeOptions}
                />

                <Pagination
                    currentPage={currentPage}
                    handlePageChange={handlePageChange}
                    totalPages={totalPages}
                    start={startIndex}
                    end={endIndex}
                    lengthData={filteredData.length}
                />
            </div>
        </div>
    )
}

export default Datatable;