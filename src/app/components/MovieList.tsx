import React from 'react';
import { useSelector } from 'react-redux';
import MovieCard from './MovieCard';
import { RootState } from '../redux/store';
import { Movie } from '../redux/slices/moviesSlice';

export default function MovieList() {
  const movies = useSelector((state: RootState) => state.movies.movies);
  const filteredCategories = useSelector((state: RootState) => state.movies.filteredCategories);

  const filteredMovies = movies.filter((movie: Movie) => {
    if (filteredCategories.length === 0) {
      return true;
    }
    return filteredCategories.includes(movie.category);
  });

  return (
    <div className="flex flex-wrap justify-center">
      {filteredMovies.map((movie: Movie) => (
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
  );
};