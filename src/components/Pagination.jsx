import React from 'react'
import './Pagination.css'

const Pagination = ({ usersPerPage, totalUsers, currentPage, paginate }) => {

    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalUsers / usersPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav className="pagination">
            <ul className="pagination-list">
                {pageNumbers?.map(number => (
                    <li key={number} className="pagination-item">
                        <a onClick={() => paginate(number)} href="#" className={`pagination-item--link ${currentPage === number && 'active'}`} >{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    )
}

export default Pagination
