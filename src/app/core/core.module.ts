import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';

import { EnsureModuleLoadedOnceGuard } from './ensure-module-loaded-once.guard';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/AuthService';
import { SearchService } from './services/SearchService';
import { FavoritesService } from './services/FavoritesService';


import { SidebarComponent } from './sidebar/sidebar.component'

import { NotFoundComponent } from './not-found/not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { InternalServerErrorComponent } from './internal-server-error/internal-server-error.component';


@NgModule({
  declarations: [
    SidebarComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    InternalServerErrorComponent,
  ],
  imports: [CommonModule,
     RouterModule,
      ReactiveFormsModule,
       SharedModule],
  exports: [
    SidebarComponent,
    NotFoundComponent,
    UnauthorizedComponent,
    InternalServerErrorComponent,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AuthService,
    SearchService,
    FavoritesService
  ]
})
export class CoreModule extends EnsureModuleLoadedOnceGuard {    // Ensure that CoreModule is only loaded into AppModule

  // Looks for the module in the parent injector to see if it's already been loaded (only want it loaded once)
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    super(parentModule);
  }

}
