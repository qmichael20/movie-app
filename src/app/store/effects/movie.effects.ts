import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { map, mergeMap } from "rxjs";
import { MovieService } from "src/app/services/movie.service";
import { loadMovieById, loadMovieByIdError, loadMovieByIdSuccess } from "../actions/movie.actions";

@Injectable()
export class MovieEffects {
    constructor(
        private actions$: Actions,
        private _moviesService: MovieService
    ) { }

    loadMovies$ = createEffect(() => this.actions$.pipe(
        ofType(loadMovieById),
        mergeMap(({ idMovie }) => this._moviesService.getMovieById(idMovie)
            .pipe(
                map(payload => {
                    return payload?.Response === 'True' ?
                        loadMovieByIdSuccess({ payload }) :
                        loadMovieByIdError()
                })
            )
        )
    ));


}
