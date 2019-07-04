import { AddComponent } from "./add/add.component";
import { RouterModule, Routes } from "@angular/router";
import { NgModule } from "@angular/core";

import { PagesComponent } from "./pages.component";
import { CustomersComponent } from "./users/customers/customers.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { TaskersComponent } from "./users/taskers/taskers.component";

const routes: Routes = [
  {
    path: "",
    component: PagesComponent,
    children: [
      {
        path: "dashboard",
        component: DashboardComponent
      },
      {
        path: "add",
        component: AddComponent
      },
      {
        path: "users/customers",
        component: CustomersComponent
      },
      {
        path: "users/taskers",
        component: TaskersComponent
      },
      {
        path: "",
        redirectTo: "dashboard",
        pathMatch: "full"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule {}
