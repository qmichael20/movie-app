import { EntityAdapter, EntityState, createEntityAdapter } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';
import { Movie } from 'src/app/interfaces/movie.interface';
import { cleanMovies, loadMovies, loadMoviesError, loadMoviesSuccess } from '../actions/movies-list.actions';


export interface MoviesListState extends EntityState<Movie> {
    loading: boolean;
    status: boolean;
    totalResults: number;
}

export const adapter: EntityAdapter<Movie> = createEntityAdapter<Movie>({
    selectId: (movie) => movie.imdbID
});

const initalState: MoviesListState = {
    ids: null,
    entities: {},
    loading: null,
    status: null,
    totalResults: null
}

export const initialState: MoviesListState = adapter.getInitialState(initalState);

export const moviesListReducer = createReducer(
    initialState,
    on(loadMovies, (state, { }) => {
        return {
            ...state,
            loading: true,
            totalResults: null,
            status: false
        };
    }),

    on(loadMoviesSuccess, (state, { payload }) => {
        return adapter.addMany(payload?.Search || [], {
            ...state,
            loading: false,
            totalResults: +payload?.totalResults || 0,
            status: true
        });
    }),

    on(loadMoviesError, (state) => {
        return {
            ids: null,
            entities: {},
            loading: false,
            totalResults: 0,
            status: false
        };
    }),


    on(cleanMovies, (state) => {
        return adapter.removeAll(state);
    })
);