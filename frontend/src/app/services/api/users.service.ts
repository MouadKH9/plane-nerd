import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { catchError } from "rxjs/operators";
import { NbTokenService } from "@nebular/auth";
import { Router } from "@angular/router";
import { of, Observable } from "rxjs";
import { User, Tasker } from "../../interfaces/users.interface";

@Injectable({
  providedIn: "root"
})
export class UsersService {
  constructor(
    private http: HttpClient,
    private token: NbTokenService,
    private router: Router
  ) {}

  // Customer
  getAllCustomers(): Observable<User[]> {
    return this.get(environment.base_url + `user/customers/all`);
  }
  getOneCustomer(id: number): Observable<User> {
    return this.get(environment.base_url + `user/user/${id}`);
  }
  addCustomer(user: User): Observable<any> {
    return this.post(environment.base_url + `user`, user);
  }
  updateCustomer(id: number, user: User): Observable<any> {
    return this.put(environment.base_url + `user/${id}`, user);
  }
  // Tasker
  getAllTaskers(): Observable<Tasker[]> {
    return this.get(environment.base_url + `user/taskers/all`);
  }
  getOneTasker(id: number): Observable<Tasker> {
    return this.get(environment.base_url + `user/tasker/${id}`);
  }
  addTasker(tasker: Tasker): Observable<any> {
    return this.post(environment.base_url + `user/tasker`, tasker);
  }
  updateTasker(id: number, tasker: Tasker): Observable<any> {
    return this.put(environment.base_url + `user/tasker/${id}`, tasker);
  }
  // Common
  remove(id: number): Observable<any> {
    return this.delete(environment.base_url + `user/user/${id}`);
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
