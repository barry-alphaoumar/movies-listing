import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { clearFilter, setCurrentPage, setFilter } from '../redux/slices/moviesSlice';

export default function FilterSelect() {
    const dispatch = useDispatch();
    const movies = useSelector((state: RootState) => state.movies.movies);
    const filteredCategories = useSelector((state: RootState) => state.movies.filteredCategories);

    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

    const categories = Array.from(new Set(movies.map(movie => movie.category)));

    const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedCategories(selectedOptions);
        dispatch(setCurrentPage(1));
        dispatch(setFilter(selectedOptions));
    };

    const handleClearFilter = () => {
        dispatch(setCurrentPage(1));
        dispatch(clearFilter());
        setSelectedCategories([]);
    };

    return (
        <div className="mb-4">
            <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Category:</label>
            {filteredCategories.length > 0 && (
                 <button
                 onClick={handleClearFilter}
                 className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
             >
                 Clear Filter
             </button>
            )}
           
            <select
                id="categoryFilter"
                className="form-multiselect block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                multiple
                value={selectedCategories}
                onChange={handleCategoryChange}
            >
                {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                ))}
            </select>
        </div>
    );
};
