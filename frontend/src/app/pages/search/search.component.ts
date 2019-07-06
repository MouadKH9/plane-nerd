import { NbMenuService, NbSidebarService } from "@nebular/theme";
import { ApiService } from "./../../services/api/api.service";
import { Component } from "@angular/core";
import { LocalDataSource } from "ng2-smart-table";
@Component({
  selector: "search-page",
  templateUrl: "./search.component.html"
})
export class SearchComponent {
  settings = {
    actions: {
      add: false,
      edit: false,
      delete: false
    },
    columns: {
      // id: {
      //   title: "id",
      //   type: "number",
      //   editable: false
      // },
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
  source: LocalDataSource;
  constructor(private api: ApiService, private side: NbSidebarService) {
    this.api.getAllFlights().subscribe((res: any) => {
      console.log(res);
      this.source = new LocalDataSource(res);
      this.side.collapse("menu-sidebar");
    });
  }
}
