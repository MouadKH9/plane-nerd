import { map } from "rxjs/operators";
import { ApiService } from "./../../services/api/api.service";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "add-page",
  templateUrl: "./add.component.html",
  styleUrls: ["./add.style.scss"]
})
export class AddComponent {
  dataSource = [];
  allFlights = [];
  form: FormGroup;
  constructor(private builder: FormBuilder, private api: ApiService) {
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
      milesTravelled: ["", [Validators.required]]
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
    console.log(this.form.value);
  }
}
