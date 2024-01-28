import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/interfaces/movie.interface';
import { MovieModel } from 'src/app/models/movie.model';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit, OnDestroy {

  /**
   * Define las peliculas encontradas
   */
  public movies: Array<Movie> = [];

  /**
   * Define la pagina de la consulta
   */
  public page: number = 1;

  /**
   * Define la pagina maxima
   */
  private maxPage: number;

  /**
   * Define el nombre a buscar 
   */
  public nameToSearch: string = 'spider';

  /**
   * Define el estado del loading
   */
  public loading: boolean = false;

  /**
   * Define el estado del loading
   */
  public totalResults: number;

  /**
   * Instancia de suscripciones
   */
  private _suscription = new Subscription();

  /**
   * Metodo constructor del componente
   * @param _movieModel Servicio de peliculas
   */
  constructor(public _movieModel: MovieModel) { }

  /**
   * Metodo destructor del componente
   */
  ngOnDestroy(): void {
    this._suscription.unsubscribe();
  }

  /**
   * Metodo inicializador del componente
   */
  ngOnInit(): void {
    this._getMovies();
  }


  /**
   * Metodo para obtener las peliculas
   */
  private _getMovies(): void {
    const movies$ = this._movieModel.getMovies$.subscribe(movies => {
      this.movies = movies?.length > 0 ? [...movies] : [];
      let nameToSearch = localStorage.getItem("nameTosearch") || 'spider';
      this.nameToSearch = nameToSearch;
    });
    this._suscription.add(movies$);

    const totalResults$ = this._movieModel.totalResults$.subscribe(totalResults => {
      this.totalResults = totalResults;
      this.maxPage = this.totalResults / 10;
    });
    this._suscription.add(totalResults$);
  }

  /**
   * Metodo para activar el scroll infinito
   */
  public onScroll(): void {
    if (this.nameToSearch && this.page < this.maxPage) {
      this.page++
      this._movieModel.dispatchGetMovies(this.nameToSearch, this.page)
    }
  }
}
