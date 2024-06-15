import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { movies$ } from '../../mock/movies';

export interface Movie {
    id: string;
    title: string;
    category: string;
    likes: number;
    dislikes: number;
}



interface MoviesState {
    movies: Movie[];
    filteredCategories: string[];
    currentPage: number;
    itemsPerPage: number;
}

const initialState: MoviesState = {
    movies: [],
    filteredCategories: [],
    currentPage: 1,
    itemsPerPage: 4
};

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setMovies: (state, action: PayloadAction<Movie[]>) => {
            state.movies = action.payload;
        },
        likeMovie: (state, action: PayloadAction<string>) => {
            const movie = state.movies.find(movie => movie.id === action.payload);
            if (movie) {
                movie.likes++;
            }
        },
        dislikeMovie: (state, action: PayloadAction<string>) => {
            const movie = state.movies.find(movie => movie.id === action.payload);
            if (movie) {
                movie.dislikes++;
            }
        },
        deleteMovie: (state, action: PayloadAction<string>) => {
            state.movies = state.movies.filter(movie => movie.id !== action.payload);
        },
        setFilter: (state, action: PayloadAction<string[]>) => {
            state.filteredCategories = action.payload;
        },
        setCurrentPage: (state, action: PayloadAction<number>) => {
            state.currentPage = action.payload;
        },
        setItemsPerPage: (state, action: PayloadAction<number>) => {
            state.itemsPerPage = action.payload;
        },
    },
});

export const { setMovies, likeMovie, dislikeMovie, deleteMovie, setFilter, setCurrentPage, setItemsPerPage } = moviesSlice.actions;

export default moviesSlice.reducer;

export const fetchMovies = () => async (dispatch: any) => {
    try {
        const response = await movies$;
        dispatch(setMovies(response));
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
};
