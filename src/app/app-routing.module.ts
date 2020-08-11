import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UnauthorizedComponent } from './core/unauthorized/unauthorized.component';
import { InternalServerErrorComponent } from './core/internal-server-error/internal-server-error.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { SearchComponent } from './search/search.component';


const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'search' },
  {
    path: 'search',
    component: SearchComponent,
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
  },
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: 'internal-server-error', component: InternalServerErrorComponent },
  { path: '**', component: NotFoundComponent }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
