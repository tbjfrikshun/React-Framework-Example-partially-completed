import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash'; //underscore

const Pagination = (props) => {
	const { itemsCount, pageSize, currentPage, onPageChange, onPreviousPageChange, onNextPageChange } = props;
	const pagesCount = Math.ceil(itemsCount / pageSize);

	if (pagesCount === 1) return null; // Don't show pagination if only one page.

	const pages = _.range(1, pagesCount + 1);

	return (
		<nav aria-label="Page navigation example">
			<ul className="pagination">
				<li key="previousPage" className={currentPage === 1 ? 'page-item disabled' : 'page-item'}>
					<button className="page-link" aria-label="Previous" onClick={() => onPreviousPageChange(currentPage)}>
						<span aria-hidden="true">&laquo;</span>
					</button>
				</li>
				{pages.map((page) => (
					<li key={page} className={page === currentPage ? 'page-item active' : 'page-item'}>
						<button className="page-link" onClick={() => onPageChange(page)}>
							{page}
						</button>
					</li>
				))}
				<li
					key="nextPage"
					className={currentPage === pagesCount ? 'page-item disabled' : 'page-item'}
					onClick={() => onNextPageChange(pagesCount)}
				>
					<button className="page-link" aria-label="Next" onClick={() => onNextPageChange(pagesCount)}>
						<span aria-hidden="true">&raquo;</span>
					</button>
				</li>
			</ul>
		</nav>
	);
};

Pagination.propTypes = {
	itemsCount: PropTypes.number.isRequired,
	pageSize: PropTypes.number.isRequired,
	currentPage: PropTypes.number.isRequired,
	onPageChange: PropTypes.func.isRequired,
	onPreviousPageChange: PropTypes.func.isRequired,
	onNextPageChange: PropTypes.func.isRequired
};

export default Pagination;
