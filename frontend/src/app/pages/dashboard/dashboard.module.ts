import { GoogleChartsModule } from "angular-google-charts";
import { DashboardComponent } from "./dashboard.component";
import { NgModule } from "@angular/core";

import { ThemeModule } from "../../@theme/theme.module";
import { Ng2SmartTableModule } from "ng2-smart-table";

@NgModule({
  imports: [ThemeModule, Ng2SmartTableModule, GoogleChartsModule],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
