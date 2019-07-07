import { map } from "rxjs/operators";
import { ApiService } from "./../../services/api/api.service";
import { Component } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbToastrService } from "@nebular/theme";

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
    this.form.patchValue({
      travelDate: this.getDate(this.form.value.travelDate)
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

  getDate(date: any) {
    return `${date.getFullYear()}-${this.fixMe(
      date.getMonth() + 1
    )}-${this.fixMe(date.getDate())}`;
  }

  fixMe(n: number) {
    return n < 10 ? "0" + n : n + "";
  }
}
