'use client'
import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import MovieList from './components/MovieList';
import FilterSelect from './components/FilterSelect';
import { fetchMovies } from './redux/slices/moviesSlice';
import store from '../app/redux/store';

function Test() {
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

export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Provider store={store}>
        <Test />
      </Provider>
    </main>
  );
}
