import React, { Component } from 'react';
import MoviesTable from './moviesTable';
import Pagination from './common/pagination';
import ListGroup from './common/listgroup';
import { getMovies, deleteMovie } from '../services/fakeMovieService';
import { getGenres } from '../services/fakeGenreService';
import { paginate } from '../utils/paginate';
import _ from 'lodash';

class Movies extends Component {
	state = {
		movies: [],
		genres: [],
		pageSize: 4,
		currentPage: 1,
		selectedGenre: { _id: 'All Genres', name: 'All Genres' },
		sortColumn: { path: 'title', order: 'asc' }
	};

	componentDidMount() {
		this.genres = getGenres();
		this.genres.unshift({ _id: 'All Genres', name: 'All Genres' });
		this.setState({ movies: getMovies(), genres: this.genres });
	}

	handleDelete = (movie) => {
		deleteMovie(movie._id);
		this.setState({ movies: this.state.movies, currentPage: 1 });
	};

	handleLike = (movie) => {
		const moviesClone = [ ...this.state.movies ];
		const index = moviesClone.indexOf(movie);
		moviesClone[index].liked = !moviesClone[index].liked;
		this.setState({ movies: moviesClone });
	};

	handlePageChange = (page) => {
		this.setState({ currentPage: page });
	};

	handlePreviousPageChange = (currentPage) => {
		if (currentPage === 1) return null;
		this.setState({ currentPage: this.state.currentPage - 1 });
	};

	handleNextPageChange = (pagesCount) => {
		if (this.state.currentPage === pagesCount) return null;
		this.setState({ currentPage: this.state.currentPage + 1 });
	};

	handleGenreSelect = (genre) => {
		this.setState({ selectedGenre: genre, currentPage: 1 });
	};

	handleSort = (sortColumn) => {
		this.setState({ sortColumn });
	};

	getPagedData = () => {
		const { selectedGenre, movies, sortColumn, currentPage, pageSize } = this.state;

		const filtered =
			selectedGenre._id === 'All Genres' ? movies : movies.filter((m) => m.genre._id === selectedGenre._id);
		const sorted = _.orderBy(filtered, [ sortColumn.path ], [ sortColumn.order ]);
		const moviePage = paginate(sorted, currentPage, pageSize);

		return { totalCount: filtered.length, data: moviePage };
	};

	render() {
		const { sortColumn, selectedGenre, movies: allMovies, genres } = this.state;

		if (allMovies.length === 0) return <p>There are no movies in the database.</p>;

		const result = this.getPagedData();

		if (result.totalCount === 0) this.setState({ selectedGenre: { _id: 'All Genres', name: 'All Genres' } });

		return (
			<div className="row">
				<div className="col-3">
					<ListGroup items={genres} selectedItem={selectedGenre} onItemSelect={this.handleGenreSelect} />
				</div>
				<div className="col">
					<p>Showing {result.totalCount} movies in the database.</p>
					<MoviesTable
						movies={result.data}
						sortColumn={sortColumn}
						onDelete={this.handleDelete}
						onLike={this.handleLike}
						onSort={this.handleSort}
					/>
					<Pagination
						itemsCount={result.totalCount}
						pageSize={this.state.pageSize}
						currentPage={this.state.currentPage}
						onPageChange={this.handlePageChange}
						onPreviousPageChange={this.handlePreviousPageChange}
						onNextPageChange={this.handleNextPageChange}
					/>
				</div>
			</div>
		);
	}
}

export default Movies;
