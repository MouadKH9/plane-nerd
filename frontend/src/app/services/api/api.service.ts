import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";
import { catchError } from "rxjs/operators";
import { NbTokenService } from "@nebular/auth";
import { Router } from "@angular/router";
import { of } from "rxjs";
import { NbToastrService } from "@nebular/theme";

@Injectable({
  providedIn: "root"
})
export class ApiService {
  constructor(
    private http: HttpClient,
    private token: NbTokenService,
    private router: Router,
    private toast: NbToastrService
  ) {}

  getAllFlights() {
    return this.http.get(environment.base_url + "flight/all").pipe(
      catchError(err => {
        if (err.status === 401) this.logout();
        else this.toast.danger("There was an error getting flights!", "Error");
        return of(err);
      })
    );
  }
  addFlight(flight: any) {
    return this.post(environment.base_url + "flight/add", flight);
  }

  getStats() {
    return this.http.get(environment.base_url + "stats").pipe(
      catchError(err => {
        if (err.status === 401) this.logout();
        else
          this.toast.danger(
            "There was an error connecting to the server!",
            "Error"
          );
        return of(err);
      })
    );
  }

  getCoordinates(city: string) {
    return this.get(
      `https://eu1.locationiq.com/v1/search.php?key=${
        environment.geocodingAPI
      }&format=json&limit=1&q=${city}`
    );
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
