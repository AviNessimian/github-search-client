import { Injectable } from '@angular/core';
import { UserManager, User, WebStorageStateStore, Log, UserManagerSettings } from 'oidc-client';
import { environment } from '../../../environments/environment';

@Injectable()
export class AuthService {
  private _userManager: UserManager;
  private _user: User;

  private _config: UserManagerSettings;

  constructor() {
    if (!environment.production) Log.logger = console;

    this._config = {
      authority: environment.authority,
      client_id: environment.client_id,

      scope: environment.scope,
      response_type: environment.response_type,

      redirect_uri: environment.redirect_uri,
      post_logout_redirect_uri: environment.post_logout_redirect_uri,

      //filterProtocolClaims: true, //prevents protocol level claims such as nbf, iss, at_hash, and nonce
      //loadUserInfo: true, //allows the library to automatically call the OpenID Connect Provider’s User Info endpoint

      userStore: new WebStorageStateStore({ store: window.sessionStorage }),
      // automaticSilentRenew: true,
      // silent_redirect_uri: `${_appSettingsSrc.appSettings.clientRoot}assets/silent-redirect.html`
      //silent_redirect_uri: "http://localhost:4200/assets/silent-redirect.html"
    } as UserManagerSettings;

    this._userManager = new UserManager(this._config);

    let _selfUserManager = this._userManager;

    //Removes stale state entries in storage for incomplete authorize requests.
    _selfUserManager.clearStaleState();

    // When a user logs in successfully or a token is renewed, the `userLoaded`
    // event is fired. the `addUserLoaded` method allows to register a callback to
    // that event
    _selfUserManager.events.addUserLoaded(args => {
      _selfUserManager.getUser().then(user => {
        this._user = user;
      });
    });


    // When the automatic session management feature detects a change in
    // the user session state, the `userSignedOut` event is fired.
    _selfUserManager.events.addUserSignedOut(function () {
      if (!environment.production) console.log('The user has signed out');
      _selfUserManager.signoutRedirect();
    });

    // Same mechanism for when the automatic renewal of a token fails
    _selfUserManager.events.addSilentRenewError(function (error) {
      if (!environment.production) console.error('error while renewing the access token', error);
    });

  }

  public initialize(callBack: Function): void {
    this._userManager.getUser().then(user => {
      if (user && !user.expired) {
        if (!environment.production) console.log(user);
        this._user = user;
        setTimeout(() => { callBack(); }, 300);
      }
      else {
        setTimeout(() => {
          this._userManager.signinRedirect().catch((err) => {
            if (!environment.production) console.log(err);
          });
        }, 300);
      }
    });

  }

  public getUser(): User {
    return this._user;
  }

  public login(): Promise<any> {
    return this._userManager.signinRedirect();
  }

  public logout(): Promise<any> {
    return this._userManager.signoutRedirect();
  }

  public isLoggedIn(): boolean {
    return this._user && this._user.access_token && !this._user.expired;
  }

  public getAccessToken(): string {
    return this._user ? this._user.access_token : '';
  }

  public signoutRedirectCallback(): Promise<any> {
    return this._userManager.signoutRedirectCallback();
  }

}
