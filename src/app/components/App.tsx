import MovieList from '../components/MovieList';
import FilterSelect from './FilterSelect';
import { fetchMovies } from '../redux/slices/moviesSlice';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

export default function App() {
    const dispatch = useDispatch();
  
    useEffect(() => {
      dispatch(fetchMovies());
    }, [dispatch]);
  
    return (
      <div className="container mx-auto p-4">
        <FilterSelect />
        <MovieList />
      </div>
  
    );
  }