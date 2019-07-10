import { ApiService } from "./../../services/api/api.service";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbToastrService } from "@nebular/theme";
import { environment } from "../../../environments/environment.prod";

declare var $: any;
declare var google: any;

@Component({
  selector: "add-page",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.style.scss"]
})
export class AddComponent {
  dataSource = [];
  allFlights = [];
  form: FormGroup;
  constructor(
    private builder: FormBuilder,
    private api: ApiService,
    private toast: NbToastrService
  ) {
    this.form = this.builder.group({
      travelDate: ["", [Validators.required]],
      airline: ["", [Validators.required]],
      flightNumber: ["", [Validators.required]],
      aircraftRegistration: ["", [Validators.required]],
      seatNumber: ["", [Validators.required]],
      departurePoint: ["", [Validators.required]],
      arrivalPoint: ["", [Validators.required]],
      captain: ["", [Validators.required]],
      firstOfficer: ["", [Validators.required]],
      customerServiceManager: ["", [Validators.required]],
      milesTravelled: ["", []]
    });
    this.api.getAllFlights().subscribe((res: any) => {
      this.allFlights = res;
    });
  }

  refresh() {
    if (this.condition()) {
      this.dataSource = [];
      return;
    }
    this.dataSource = this.allFlights.filter(el => {
      return (
        el.airline == this.form.value.airline ||
        el.flightNumber === this.form.value.flightNumber ||
        el.aircraftRegistration == this.form.value.aircraftRegistration
      );
    });
  }

  condition() {
    return (
      this.form.value.airline.length == 0 &&
      this.form.value.flightNumber.length == 0 &&
      this.form.value.aircraftRegistration.length == 0
    );
  }

  submit() {
    var settings = {
      async: true,
      crossDomain: true,
      url: `https://us1.locationiq.com/v1/search.php?key=${
        environment.geocodingAPI
      }&q=${this.form.value.departurePoint}&format=json&limit=1`,
      method: "GET"
    };

    $.ajax(settings).done((dep: any) => {
      settings.url = `https://us1.locationiq.com/v1/search.php?key=${
        environment.geocodingAPI
      }&q=${this.form.value.arrivalPoint}&format=json&limit=1`;
      $.ajax(settings).done((arr: any) => {
        if (dep.length > 0 && arr.length > 0) {
          let departurePoint = new google.maps.LatLng(dep[0].lat, dep[0].lon);
          let arrivalPoint = new google.maps.LatLng(arr[0].lat, arr[0].lon);
          this.form.patchValue({
            travelDate: this.getDate(this.form.value.travelDate),
            milesTravelled:
              google.maps.geometry.spherical.computeDistanceBetween(
                departurePoint,
                arrivalPoint
              ) / 1609.344
          });
          this.api.addFlight(this.form.value).subscribe((res: any) => {
            if (!res.success)
              return this.toast.danger(
                "There was an error saving this flight!",
                "Error"
              );
            this.toast.success("Flight added successfully", "Success");
            this.form.reset();
          });
        }
      });
    });
  }

  getDate(date: any) {
    return `${date.getFullYear()}-${this.fixMe(
      date.getMonth() + 1
    )}-${this.fixMe(date.getDate())}`;
  }

  fixMe(n: number) {
    return n < 10 ? "0" + n : n + "";
  }
}
