import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { movies$ } from '../../mock/movies'; // Assuming movies.js is in the root

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
}

const initialState: MoviesState = {
    movies: [],
    filteredCategories: [],
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
    },
});

export const { setMovies, likeMovie, dislikeMovie, deleteMovie, setFilter } = moviesSlice.actions;

export default moviesSlice.reducer;

export const fetchMovies = () => async (dispatch: any) => {
    try {
        const response = await movies$;
        dispatch(setMovies(response));
    } catch (error) {
        console.error('Error fetching movies:', error);
    }
};
