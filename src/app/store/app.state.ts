import { MovieState } from "./reducers/movie.reducer";
import { MoviesListState } from "./reducers/movies-list.reducer";

export interface AppState {
    movies: MoviesListState;
    movie: MovieState
}