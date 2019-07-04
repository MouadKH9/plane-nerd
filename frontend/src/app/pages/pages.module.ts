import { AddModule } from "./add/add.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { CustomersModule } from "./users/customers/customers.module";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { ThemeModule } from "../@theme/theme.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { TaskersModule } from "./users/taskers/taskers.module";

const PAGES_COMPONENTS = [PagesComponent];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    TaskersModule,
    CustomersModule,
    MiscellaneousModule,
    AddModule
  ],
  declarations: [...PAGES_COMPONENTS]
})
export class PagesModule {}
