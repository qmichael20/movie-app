import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Movie } from '../interfaces/movie.interface';
import { MovieResponseAPI } from '../interfaces/movieResponseApi';
import { cleanMovie, loadMovieById } from '../store/actions/movie.actions';
import { cleanMovies, loadMovies } from '../store/actions/movies-list.actions';
import { selectMovie } from '../store/selectors/movie.selectors';
import { selectLoading, selectMovies, selectTotalResults } from '../store/selectors/movies-list.selectors';

@Injectable({
    providedIn: 'root'
})

export class MovieModel {
    /**
     * Observable para obtener el total de las peliculas encontradas
     */
    public totalResults$: Observable<number> = this._store.select(selectTotalResults);

    /**
    * Observable para obtener el estado del loading
    */
    public loading$: Observable<boolean> = this._store.select(selectLoading);

    /**
     * Observable para obtener las peliculas cargadas en el store
     */
    public getMovies$: Observable<Array<Movie>> = this._store.select(selectMovies);

    /**
     * Observable para obtener la pelicula cargada en el store
     */
    public getMovie$: Observable<MovieResponseAPI> = this._store.select(selectMovie);

    /**
     * Metodo constructor del model
     * @param _movieService Inyeccion de servicio de las peliculos
     * @param _store Define los atributos y propiedades de gestor de estados
     */
    constructor(private _store: Store) { }

    /**
     * Metodo para obtener las peliculas segun un nombre dado
     * @param name Nombre a buscar 
     * @param page Define la pagina de busqueda
     */
    dispatchGetMovies(nameToSearch: string, page: number = 1): void {
        this._store.dispatch(loadMovies({ nameToSearch, page }))
    }

    /**
    * Metodo para limpiar el estado de las peliculas
    */
    dispatchCleanMovies(): void {
        this._store.dispatch(cleanMovies())
    }

    /**
     * Metodo para obtener una pelicula segun su id
     * @param idMovie Id de la pelicula
     */
    dispatchGetMovieById(idMovie: string): void {
        this._store.dispatch(loadMovieById({ idMovie }))
    }

    /**
    * Metodo para limpiar el estado de la pelicula
    */
    dispatchCleanMovie(): void {
        this._store.dispatch(cleanMovie());
    }
}
