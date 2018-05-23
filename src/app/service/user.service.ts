import { Injectable, NgZone } from '@angular/core';
import * as _ from 'lodash';
import { GoogleAuthService } from 'ng-gapi/lib/GoogleAuthService';
import GoogleUser = gapi.auth2.GoogleUser;
import { SessionService } from './session.service';
import {Router} from '@angular/router';

@Injectable()
export class UserService {
  private user: GoogleUser = undefined;

  constructor(private googleAuthService: GoogleAuthService,
    private ngZone: NgZone,
    private sessionService: SessionService,
    private router: Router) {
  }

  public signIn() {
    this.googleAuthService.getAuth().subscribe((auth) => {
      auth.signIn().then(res => this.signInSuccessHandler(res), err => this.signInErrorHandler(err));
    });
  }

  public signOut(): void {
    this.googleAuthService.getAuth().subscribe((auth) => {
      try {
        auth.signOut();
      } catch (e) {
        console.error(e);
      }
      this.sessionService.removeAccessToken();
      this.sessionService.removeCalendarId();
      this.router.navigate(['/login']);
    });
  }

  public isUserSignedIn(): boolean {
    return !_.isEmpty(this.sessionService.getAccessToken());
  }

  private signInSuccessHandler(res: GoogleUser) {
    this.ngZone.run(() => {
      this.user = res;
      this.sessionService.setAccessToken(res.getAuthResponse().access_token);
      this.router.navigate(['/home-page']);
    });
  }

  private signInErrorHandler(err) {
    console.warn(err);
  }
}
