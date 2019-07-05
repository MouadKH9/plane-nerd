import { Component } from "@angular/core";
@Component({
  selector: "search-page",
  templateUrl: "./search.component.html"
})
export class SearchComponent {
  settings = {
    columns: {
      id: {
        title: "id",
        type: "number",
        editable: false
      },
      travelDate: {
        title: "Date Of Travel",
        type: "string"
      },
      airline: {
        title: "Airline",
        type: "string"
      },
      flightNumber: {
        title: "Flight Number",
        type: "number"
      },
      aircraftRegistration: {
        title: "Aircraft Registration",
        type: "string"
      },
      seatNumber: {
        title: "Seat Number",
        type: "number"
      },
      departurePoint: {
        title: "Departure Point",
        type: "string"
      },
      arrivalPoint: {
        title: "Arrival Point",
        type: "string"
      },
      captain: {
        title: "Captain",
        type: "string"
      },
      firstOfficer: {
        title: "First Officer",
        type: "string"
      },
      customerServiceManager: {
        title: "Customer Service Manager",
        type: "string"
      },
      milesTravelled: {
        title: "Miles Travelled",
        type: "number"
      }
    }
  };
  constructor() {}
}
