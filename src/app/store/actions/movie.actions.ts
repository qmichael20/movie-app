import { createAction, props } from '@ngrx/store';
import { MovieResponseAPI } from 'src/app/interfaces/movieResponseApi';

enum MoviesActions {
    LoadMovieById = '[Movie] Load Movie',
    LoadMovieByIdSuccess = '[Movie] Load Movie Success',
    LoadMovieByIdError = '[Movies] Load Movie Error',
    CleanMovie = '[Movie] Clean Movie'
}

export const loadMovieById = createAction(MoviesActions.LoadMovieById, props<{ idMovie: string }>());
export const loadMovieByIdSuccess = createAction(MoviesActions.LoadMovieByIdSuccess, props<{ payload: MovieResponseAPI }>());
export const loadMovieByIdError = createAction(MoviesActions.LoadMovieByIdError);
export const cleanMovie = createAction(MoviesActions.CleanMovie);