// import { GoogleChartsModule } from "angular-google-charts";
import { DashboardComponent } from "./dashboard.component";
import { NgModule } from "@angular/core";

import { ThemeModule } from "../../@theme/theme.module";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { Ng2GoogleChartsModule } from "ng2-google-charts";
import { CountUpModule } from "countup.js-angular2";

@NgModule({
  imports: [
    ThemeModule,
    Ng2SmartTableModule,
    Ng2GoogleChartsModule,
    CountUpModule
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule {}
