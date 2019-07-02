import { NgModule } from "@angular/core";

import { ThemeModule } from "../../../@theme/theme.module";
import { Ng2SmartTableModule } from "ng2-smart-table";
import { TaskersComponent } from "./taskers.component";

@NgModule({
  imports: [ThemeModule, Ng2SmartTableModule],
  declarations: [TaskersComponent]
})
export class TaskersModule {}
