import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JwtUtil } from '../utils/jwt.util';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private router: Router) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const currentPath = this.router.url;
    const isPublicRoute = ['/login', '/criar-conta'].some(
      (path) => currentPath === path || currentPath.startsWith(`${path}/`),
    );
    const isPublicEndpoint =
      req.url.includes('/auth/login') ||
      req.url.includes('/auth/register') ||
      req.url.includes('/auth/signup');

    if (isPublicRoute || isPublicEndpoint) {
      return next.handle(req);
    }

    const token = JwtUtil.getBearerToken();

    if (!token) {
      return next.handle(req);
    }

    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next.handle(authReq).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 403) {
          JwtUtil.removeToken();

          if (!this.router.url.startsWith('/login')) {
            this.router.navigate(['/login']);
          }
        }

        return throwError(() => error);
      }),
    );
  }
}
