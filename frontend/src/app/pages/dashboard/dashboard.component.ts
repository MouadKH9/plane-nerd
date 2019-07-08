import { ApiService } from "./../../services/api/api.service";
import { Component } from "@angular/core";
@Component({
  selector: "dashboard-page",
  templateUrl: "./dashboard.component.html",
  styleUrls: ["./dashboard.style.scss"]
})
export class DashboardComponent {
  stats: any;
  constructor(private api: ApiService) {
    this.api.getStats().subscribe((res: any) => {
      this.stats = res;
    });
  }
}
