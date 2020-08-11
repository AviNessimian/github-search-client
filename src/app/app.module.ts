import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';

import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { RepositoryDetailsComponent } from './repository-details/repository-details.component';
import { FavoriteDetailsModalComponent } from './favorite-details-modal/favorite-details-modal.component';


@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    FavoritesComponent,
    RepositoryDetailsComponent,
    FavoriteDetailsModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    CoreModule, // Singleton objects (services, components that are loaded only once, etc.)
    SharedModule
  ],
  providers: [],
  entryComponents: [FavoriteDetailsModalComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
