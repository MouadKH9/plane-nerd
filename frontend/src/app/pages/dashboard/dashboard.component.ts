import { ApiService } from "./../../services/api/api.service";
import { Component } from "@angular/core";
import { GoogleChartInterface } from "ng2-google-charts/google-charts-interfaces";
@Component({
  selector: "dashboard-page",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.style.scss"]
})
export class DashboardComponent {
  stats: any;
  ok: boolean = false;
  pieChart: GoogleChartInterface;
  constructor(private api: ApiService) {
    this.api.getStats().subscribe((res: any) => {
      this.stats = res;
      if (this.stats.flightsCount == 0) return;
      let dataTable = [["Days", "Flights Per Day"]];
      this.stats.flightsPerDay.forEach(el => {
        let date = Object.keys(el)[0];
        let count: string = Object.values(el)[0] as string;
        dataTable.push([date.substr(5, date.length), count]);
      });

      this.pieChart = {
        chartType: "LineChart",
        dataTable,
        options: { title: "Flights Per Day" }
      };
      this.ok = true;
    });
  }
}
