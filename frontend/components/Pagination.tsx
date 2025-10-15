import React, { useId } from 'react'
import styles from '@styles/pagination.module.css'
import { useRouter } from 'next/router'


const Pagination = ({ queryParams: { page, query }, totalPages, setPage }: PaginationProps) => {
    const router = useRouter()
    const pageId = useId
    const pages = Array.from(Array(totalPages).keys())
    return (
        <div className={styles.container}>
            <ul className={styles.pages}>
                {pages.map(number => <li
                    key={`${pageId}-${number}`}
                    className={`${styles.page} ${page === number + 1 ? styles.activePage : ""}`}
                    onClick={() => { setPage(number + 1); router.push(`?page=${number + 1}${query ? '&query=' + query : ''}`, undefined, { shallow: true }) }}><span className={styles.number}>{number + 1}</span></li>)}
            </ul>
        </div>
    )
}

export default Pagination