import {Injectable} from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {SessionService} from './session.service';
import {UserService} from './user.service';
import 'rxjs/add/operator/do';
import {Router} from '@angular/router';

@Injectable()
export class InterceptorService implements HttpInterceptor {

  constructor(private userService: UserService,
              private sessionService: SessionService,
              private router: Router) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    const accessToken = this.sessionService.getAccessToken();

    if (accessToken) {
      const clonedRequest = req.clone({
        headers: req.headers.set('Authorization', `Bearer ${accessToken}`)
      });

      return next.handle(clonedRequest);
    } else {
      this.userService.signOut();
      this.router.navigate(['/login']);
    }
  }
}
