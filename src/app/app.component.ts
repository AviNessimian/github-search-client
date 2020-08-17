import { Component, OnInit } from '@angular/core';
import { AuthService } from './core/services/AuthService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  init = false;
  userName: string;
  constructor(
    private _authSrc: AuthService,
    private _router: Router) { }

  ngOnInit() {

    if (window.location.href.indexOf('?postLogout=true') != -1) {
      this._authSrc.signoutRedirectCallback().then(() => this._router.navigateByUrl('/'));
    }

    if (!this._authSrc.isLoggedIn()) {
      this._authSrc.initialize(() => {
        this.userName = this._authSrc.getUser().profile.name;
        this.init = true
      });
    }

  }

  public signout = () => this._authSrc.logout();

}
