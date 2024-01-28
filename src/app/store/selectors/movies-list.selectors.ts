import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState } from '../app.state';
import { MoviesListState } from '../reducers/movies-list.reducer';

export const selectMovieState = createFeatureSelector<MoviesListState>('movies');

export const selectMoviesIds = (appState: AppState) => appState.movies.ids;
export const selectMoviesEntities = (appState: AppState) => appState.movies.entities;
export const selectTotalResults = (appState: AppState) => appState.movies.totalResults;
export const selectStatus = (appState: AppState) => appState.movies.status;
export const selectLoading = (appState: AppState) => appState.movies.loading;

export const selectMovies = createSelector(
    selectMoviesEntities,
    (entities) => Object.values(entities)
)