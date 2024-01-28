import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/interfaces/movie.interface';
import { MovieModel } from 'src/app/models/movie.model';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  /**
   * Define las peliculas encontradas
   */
  public movies: Array<Movie> = [];

  /**
   * Define el nombre de la pelicula a buscar
   */
  public nameToSearch: string;

  /**
   * Metodo constructor del componente
   * @param _movieModel Modelo de las peliculas
   */
  constructor(private _movieModel: MovieModel) { }

  /**
   * Metodo inicializador del componente
   */
  ngOnInit(): void {
    let nameToSearch = localStorage.getItem("nameTosearch") || 'spider';
    this.nameToSearch = nameToSearch;
    this.getMovies(nameToSearch);
  }

  /**
   * Metodo para obtener las peliculas
   */
  public getMovies(nameToSearch: string): void {
    const trimmedName = nameToSearch.trim();
    if (trimmedName.length > 2) {
      localStorage.setItem("nameTosearch", trimmedName);
      this._movieModel.dispatchCleanMovies();
      this._movieModel.dispatchGetMovies(trimmedName);
    }
  }
}
