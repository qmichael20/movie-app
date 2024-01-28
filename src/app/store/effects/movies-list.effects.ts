import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { MovieService } from "src/app/services/movie.service";
import { loadMovies, loadMoviesError, loadMoviesSuccess } from "../actions/movies-list.actions";

@Injectable()
export class MoviesListEffects {
    constructor(
        private actions$: Actions,
        private _moviesService: MovieService
    ) { }

    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType(loadMovies),
        mergeMap(({ nameToSearch, page }) => this._moviesService.getMovies(nameToSearch, page)
            .pipe(
                map(payload => {
                    return payload?.Response === 'True' ?
                        loadMoviesSuccess({ payload }) :
                        loadMoviesError()
                })
            )
        )
    ));


}
