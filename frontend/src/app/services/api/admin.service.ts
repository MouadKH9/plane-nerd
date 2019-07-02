import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { catchError } from "rxjs/operators";
import { NbTokenService } from "@nebular/auth";
import { Router } from "@angular/router";
import { of, Observable } from "rxjs";
import { User } from "../../interfaces/users.interface";

@Injectable({
  providedIn: "root"
})
export class AdminService {
  constructor(
    private http: HttpClient,
    private token: NbTokenService,
    private router: Router
  ) {}
  profile() {
    return this.get(environment.base_url + "user/profile");
  }
  // functions

  get(url: string) {
    return this.http.get(url).pipe(
      catchError(err => {
        if (err.status === 401) this.logout();
        else {
          console.log("Response Error caught:");
          console.log(err);
        }
        return of(err);
      })
    );
  }

  post(url: string, data: any) {
    return this.http.post(url, data).pipe(
      catchError(err => {
        if (err.status === 401) this.logout();
        else {
          console.log("Response Error caught:");
          console.log(err);
        }
        return of(err);
      })
    );
  }

  put(url: string, data: any) {
    return this.http.put(url, data).pipe(
      catchError(err => {
        if (err.status === 401) this.logout();
        else {
          console.log("Response Error caught:");
          console.log(err);
        }
        return of(err);
      })
    );
  }

  delete(url: string) {
    return this.http.delete(url).pipe(
      catchError(err => {
        if (err.status === 401) this.logout();
        else {
          console.log("Response Error caught:");
          console.log(err);
        }
        return of(err);
      })
    );
  }

  logout() {
    this.token.clear();
    this.router.navigate(["auth/login"]);
  }
}
