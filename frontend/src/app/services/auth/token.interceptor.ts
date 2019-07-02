import { Injectable } from "@angular/core";
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { NbAuthService } from "@nebular/auth";
@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(public auth: NbAuthService) {}
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    this.auth.getToken().subscribe(token => {
      if (!request.url.includes("/auth/"))
        request = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token.getValue()}`
          }
        });
    });
    return next.handle(request);
  }
}
