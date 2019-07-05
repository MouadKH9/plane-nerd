import { AddModule } from "./add/add.module";
import { DashboardModule } from "./dashboard/dashboard.module";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { PagesRoutingModule } from "./pages-routing.module";
import { ThemeModule } from "../@theme/theme.module";
import { MiscellaneousModule } from "./miscellaneous/miscellaneous.module";
import { SearchModule } from "./search/search.module";

const PAGES_COMPONENTS = [PagesComponent];

@NgModule({
  imports: [
    PagesRoutingModule,
    ThemeModule,
    DashboardModule,
    MiscellaneousModule,
    AddModule,
    SearchModule
  ],
  declarations: [...PAGES_COMPONENTS]
})
export class PagesModule {}
