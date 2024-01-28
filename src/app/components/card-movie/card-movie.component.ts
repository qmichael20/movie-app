import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Movie } from 'src/app/interfaces/movie.interface';

@Component({
  selector: 'app-card-movie',
  templateUrl: './card-movie.component.html',
  styleUrls: ['./card-movie.component.scss']
})
export class CardMovieComponent {
  /**
   * Define la informacion de la pelicula
   */
  @Input() movie: Movie;

  /**
   * Metodo constructor del componente
   * @param _router Define los atributos y propiedades de las rutas
   * @param _movieModel Modelo de peliculas
   */
  constructor(private _router: Router) { }

  /**
   * Metodo para controlar cuando la imagen no cargue
   * @param $event Evento de error
   */
  public handleImageError($event: any) {
    $event.target.src = 'assets/images/imageNoFound.png';
  }

  /**
   * Metodo para ir a la vista de la pelicula
   * @param id Id de la pelicula
   */
  public goToMovie(id: string): void {
    this._router.navigate([`/movie/${id}`]);
  }
}
