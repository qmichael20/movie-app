import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, take } from 'rxjs';
import { MovieResponseAPI } from 'src/app/interfaces/movieResponseApi';
import { MovieModel } from 'src/app/models/movie.model';

@Component({
  selector: 'app-movie-info',
  templateUrl: './movie-info.component.html',
  styleUrls: ['./movie-info.component.scss']
})
export class MovieInfoComponent implements OnInit, OnDestroy {
  /**
   * Define el id de la pelicula
   */
  public idMovie: string;

  /**
   * Define la informacion de la pelicula
   */
  public movie: MovieResponseAPI;

  public currentVotes: number = 0;

  /**
   * Instancia de suscripciones
   */
  private _suscription = new Subscription();

  private intervalId: any;

  /**
   * Metodo constructor del componente
   * @param _movieModel Modelo de peliculas
   * @param _activatedRoute Define las propiedades y atributos de la ruta activa
   * @param _router Define las propiedades y atributos de las rutas
   */
  constructor(private _movieModel: MovieModel,
    private _activatedRoute: ActivatedRoute,
    private _router: Router) { }

  /**
   * Metodo destructor del componente
   */
  ngOnDestroy(): void {
    this._movieModel.dispatchCleanMovie();
    this._suscription.unsubscribe();
  }

  /**
   * Metodo inicializador del componente
   */
  ngOnInit(): void {
    this._dispatchGetMovieById();
  }

  /**
   * Metodo para obtener un pelicula por su id
   */
  private _dispatchGetMovieById(): void {
    this._activatedRoute.params.pipe(take(1)).subscribe(params => {
      this.idMovie = params['id'];
      if (this.idMovie) {
        this._movieModel.dispatchGetMovieById(this.idMovie);
        this._getInfoMovie();
      }
    });
  }

  /**
   * Metodo para obtener la informacion de la pelicula
   */
  private _getInfoMovie(): void {
    const movie$ = this._movieModel.getMovie$.subscribe(movie => {
      if (movie?.imdbID) {
        this.movie = { ...movie };
        this.startCounting();
      }
    });
    this._suscription.add(movie$);
  }

  /**
  * Metodo para obtener el rating de la pelicula
  * @param rating Rating de la pelicula segun la api
  * @returns Resultado del rating
  */
  public getRating(rating: number): number {
    return (rating) / 2
  }

  /**
   * Metodo para obtener el array de generos de la pelicula
   * @param genre Generos enviados por la api
   * @returns Array de generos
   */
  public getGenres(genre: string): Array<string> {
    if (genre) {
      return genre.split(',').map(genre => genre.trim());
    } else {
      return []
    }

  }

  /**
   * Metodo para ir hacia atras
   */
  public goToBack(): void {
    this._router.navigate(['/movies']);
  }

  /**
   * Metodo para controlar cuando la imagen no cargue
   * @param $event Evento de error
   */
  public handleImageError($event: any) {
    $event.target.src = 'assets/images/imageNoFound.png';
  }

  /**
   * Metodo para empezar el conteo
   */
  private startCounting(): void {
    const votes: string = this.movie?.imdbVotes ?? '0';
    let realVotes: number = parseFloat(votes.replace(/,/g, ""));

    if (realVotes <= 0) return;

    const totalSteps = 3000;
    let currentStep = Math.ceil(realVotes / totalSteps);

    this.intervalId = setInterval(() => {
      this.currentVotes += currentStep;

      if (this.currentVotes < realVotes) {
        currentStep += Math.ceil((realVotes - this.currentVotes) / totalSteps);
      }

      if (this.currentVotes >= realVotes) {
        this.currentVotes = realVotes;
        this.stopCounting();
      }
    }, 30);
  }

  /**
   * Metodo para parar el conteo
   */
  private stopCounting(): void {
    clearInterval(this.intervalId);
  }
}
