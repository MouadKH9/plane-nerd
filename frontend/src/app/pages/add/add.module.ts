import { AddComponent } from "./add.component";
import { NgModule } from "@angular/core";

import { ThemeModule } from "../../@theme/theme.module";
import {
  NbInputModule,
  NbDatepickerModule,
  NbListModule
} from "@nebular/theme";
import { NbMomentDateModule } from "@nebular/moment";
import { ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    ReactiveFormsModule,
    ThemeModule,
    NbInputModule,
    NbDatepickerModule,
    NbListModule,
    NbMomentDateModule
  ],
  declarations: [AddComponent]
})
export class AddModule {}
