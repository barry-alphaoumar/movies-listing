import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { setFilter } from '../redux/slices/moviesSlice';

export default function FilterSelect() {
  const dispatch = useDispatch();
  const movies = useSelector((state: RootState) => state.movies.movies);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = Array.from(new Set(movies.map(movie => movie.category)));

  const handleCategoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
    setSelectedCategories(selectedOptions);
    dispatch(setFilter(selectedOptions));
  };

  return (
    <div className="mb-4">
      <label htmlFor="categoryFilter" className="block text-sm font-medium text-gray-700 mb-1">Filter by Category:</label>
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
