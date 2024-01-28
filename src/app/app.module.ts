import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StarRatingModule } from 'angular-star-rating';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CardMovieComponent } from './components/card-movie/card-movie.component';
import { MovieInfoComponent } from './components/movie-info/movie-info.component';
import { MovieListComponent } from './components/movie-list/movie-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MovieService } from './services/movie.service';
import { MovieEffects } from './store/effects/movie.effects';
import { MoviesListEffects } from './store/effects/movies-list.effects';
import { movieReducer } from './store/reducers/movie.reducer';
import { moviesListReducer } from './store/reducers/movies-list.reducer';

@NgModule({
  declarations: [
    AppComponent,
    CardMovieComponent,
    NavbarComponent,
    MovieListComponent,
    MovieInfoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    FormsModule,
    StarRatingModule.forRoot(),
    StoreModule.forRoot({ movies: moviesListReducer, movie: movieReducer }),
    EffectsModule.forRoot([MoviesListEffects, MovieEffects]),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() })
  ],
  providers: [MovieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
