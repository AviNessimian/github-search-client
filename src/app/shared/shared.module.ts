import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr'

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { OverlayModule } from '@angular/cdk/overlay';

import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';


@NgModule({
  imports: [CommonModule,
    ToastrModule.forRoot({
      preventDuplicates: false, timeOut: 10000, extendedTimeOut: 10000, progressBar: true, iconClasses: {
        error: 'toast-error',
        info: 'toast-info',
        success: 'toast-success',
        warning: 'toast-warning'
      }
    }),
    NgbModule,
    OverlayModule,
    FontAwesomeModule],

  declarations: [],

  exports: [NgbModule,
    OverlayModule,
    FontAwesomeModule],

  entryComponents: [
  ]
})
export class SharedModule {

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, fab, far);
  }


}
