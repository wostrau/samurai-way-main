import React, {useState} from 'react';
import styles from './Paginator.module.css';

type PaginatorPropsType = {
    pageSize: number
    currentPage: number
    totalUsersCount: number
    currentPageChange: (pageNumber: number) => void
    portionSize?: number
}

export const Paginator: React.FC<PaginatorPropsType> = (props) => {
    const portionSize = props.portionSize || 10;

    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    const pages: Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) pages.push(i);

    const portionCount = Math.ceil(pagesCount / portionSize);
    const actualPortion = Math.ceil(props.currentPage / portionSize)
    const [portionNumber, setPortionNumber] = useState<number>(actualPortion);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={styles.paginator}>
            {portionNumber > 1 && <button onClick={() => {
                setPortionNumber(portionNumber - 1)
            }}>PREV</button>}
            {pages
                .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                .map((p, index) => {
                    return (
                        <span
                            key={index}
                            className={props.currentPage === p ? styles.selected : styles.pageNumber}
                            onClick={() => props.currentPageChange(p)}
                        >{p}
                    </span>
                    );
                })}
            {portionCount > portionNumber && <button onClick={() => {
                setPortionNumber(portionNumber + 1)
            }}>NEXT</button>}
        </div>
    );
};
