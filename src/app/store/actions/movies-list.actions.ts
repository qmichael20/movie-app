import { createAction, props } from '@ngrx/store';
import { ResponseAPI } from 'src/app/interfaces/responseApi.interface';

enum MoviesActions {
    LoadMovies = '[Movies] Load Movies',
    LoadMoviesSuccess = '[Movies] Load Movies Success',
    LoadMoviesError = '[Movies] Load Movies Error',
    CleanMovies = '[Movies] Clean Movies'
}

export const loadMovies = createAction(MoviesActions.LoadMovies, props<{ nameToSearch: string, page: number }>());
export const loadMoviesSuccess = createAction(MoviesActions.LoadMoviesSuccess, props<{ payload: ResponseAPI }>());
export const loadMoviesError = createAction(MoviesActions.LoadMoviesError);
export const cleanMovies = createAction(MoviesActions.CleanMovies);