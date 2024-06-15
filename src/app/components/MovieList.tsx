import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MovieCard from './MovieCard';
import { RootState } from '../redux/store';
import { Movie, setCurrentPage, setFilter, setItemsPerPage, setMovies } from '../redux/slices/moviesSlice';

export default function MovieList() {
    const dispatch = useDispatch();

    const movies = useSelector((state: RootState) => state.movies.movies);
    const filteredCategories = useSelector((state: RootState) => state.movies.filteredCategories);
    const currentPage = useSelector((state: RootState) => state.movies.currentPage);
    const itemsPerPage = useSelector((state: RootState) => state.movies.itemsPerPage);

    const filteredMovies = movies.filter((movie: Movie) => {
        if (filteredCategories.length === 0) {
            return true;
        }
        return filteredCategories.includes(movie.category);
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const paginatedMovies = filteredMovies.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page: number) => {
        dispatch(setCurrentPage(page));
    };

    const handleItemsPerPageChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedItemsPerPage = parseInt(event.target.value, 10);
        dispatch(setItemsPerPage(selectedItemsPerPage));
        dispatch(setCurrentPage(1));
    };

    return (
        <div>
            <h1>Movies</h1>
            <div>
                <label htmlFor="itemsPerPage">Items per page:</label>
                <select
                    id="itemsPerPage"
                    value={itemsPerPage}
                    onChange={handleItemsPerPageChange}
                >
                    <option value="4">4</option>
                    <option value="8">8</option>
                    <option value="12">12</option>
                </select>
            </div>
            <ul>
                <div className="flex flex-wrap">
                    {paginatedMovies.map((movie: Movie) => (
                        <MovieCard
                            key={movie.id}
                            id={movie.id}
                            title={movie.title}
                            category={movie.category}
                            likes={movie.likes}
                            dislikes={movie.dislikes}
                        />
                    ))}
                </div>

            </ul>
            <div>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage}</span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={paginatedMovies.length < itemsPerPage}
                >
                    Next
                </button>
            </div>
        </div>
    );
};