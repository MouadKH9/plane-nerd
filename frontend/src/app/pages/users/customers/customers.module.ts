import { NgModule } from "@angular/core";

import { ThemeModule } from "../../../@theme/theme.module";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { CustomersComponent } from "./customers.component";

@NgModule({
  imports: [ThemeModule, Ng2SmartTableModule],
  declarations: [CustomersComponent]
})
export class CustomersModule {}
