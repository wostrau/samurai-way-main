import React from 'react';
import styles from './Paginator.module.css';

type PaginatorPropsType = {
    pageSize: number
    currentPage: number
    totalUsersCount: number
    setCurrentPage: (pageNumber: number) => void
    getUsers: (pageNumber: number, pageSize: number) => void
}

export const Paginator = (props: PaginatorPropsType) => {
    const currentPageChange = (pageNumber: number) => {
        props.setCurrentPage(pageNumber);
        props.getUsers(pageNumber, props.pageSize);
    };

    const pagesCount = Math.ceil(props.totalUsersCount / props.pageSize);
    const pages = [];
    for (let i = 1; i <= pagesCount; i++) pages.push(i);

    return (
        <div>
            {pages.map((p, index) => {
                return (
                    <span
                        key={index}
                        className={props.currentPage === p ? styles.selected : ''}
                        onClick={() => currentPageChange(p)}
                    >{p}
                    </span>
                );
            })}
        </div>
    );
};
