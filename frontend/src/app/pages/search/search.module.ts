import { SearchComponent } from "./search.component";
import { NgModule } from "@angular/core";

import { ThemeModule } from "../../@theme/theme.module";
import { Ng2SmartTableModule } from "ng2-smart-table";

@NgModule({
  imports: [ThemeModule, Ng2SmartTableModule],
  declarations: [SearchComponent]
})
export class SearchModule {}
