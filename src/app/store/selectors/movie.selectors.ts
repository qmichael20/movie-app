import { createFeatureSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { MovieState } from '../reducers/movie.reducer';

export const selectMovieState = createFeatureSelector<MovieState>('movie');
export const selectMovie = (appState: AppState) => appState.movie;