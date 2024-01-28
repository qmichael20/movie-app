import { createReducer, on } from '@ngrx/store';
import { MovieResponseAPI } from 'src/app/interfaces/movieResponseApi';
import { cleanMovie, loadMovieByIdSuccess } from '../actions/movie.actions';


export interface MovieState extends MovieResponseAPI { }

const initalState: MovieState = {
    imdbID: null,
    Poster: null,
    Title: null,
    Type: null,
    Year: null,
    Actors: null,
    Awards: null,
    BoxOffice: null,
    Country: null,
    Director: null,
    DVD: null,
    Genre: null,
    imdbRating: null,
    imdbVotes: null,
    Language: null,
    Metascore: null,
    Plot: null,
    Production: null,
    Rated: null,
    Ratings: null,
    Released: null,
    Response: null,
    Runtime: null,
    Website: null,
    Writer: null
}


export const movieReducer = createReducer(
    initalState,
    on(loadMovieByIdSuccess, (state, { payload }) => {
        return {
            ...state,
            ...payload
        };
    }),

    on(cleanMovie, (state, { }) => {
        return {
            ...initalState
        };
    }),
);