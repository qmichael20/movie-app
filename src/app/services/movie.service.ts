import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { MovieResponseAPI } from '../interfaces/movieResponseApi';
import { ResponseAPI } from '../interfaces/responseApi.interface';

@Injectable({
  providedIn: 'root'
})

export class MovieService {
  /**
   * Metodo constructor del servicio
   * @param _httpClient Inyeccion de cliente http
   */
  constructor(private _httpClient: HttpClient) { }

  /**
   * Metodo para obtener las peliculas segun un nombre dado
   * @param name Nombre a buscar 
   * @param page Define la pagina de busqueda
   * @returns Observable con la respuesta de la peticion
   */
  getMovies(name: string, page: number = 1): Observable<ResponseAPI> {
    return this._httpClient.get<ResponseAPI>(`${environment.apiOMDb}?s=${name}&type=movie&page=${page}&apikey=${environment.apiKey}`);
  }

  /**
 * Metodo para obtener una pelicula por id
 * @param idMovie Id de la pelicula
 * @returns Observable con la respuesta de la peticion
 */
  getMovieById(idMovie: string): Observable<MovieResponseAPI> {
    return this._httpClient.get<MovieResponseAPI>(`${environment.apiOMDb}?i=${idMovie}&type=movie&plot=full&apikey=${environment.apiKey}`);
  }

}
