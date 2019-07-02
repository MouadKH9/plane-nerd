import { UtilsService } from "./../../../services/utils/utils.service";
import { Component } from "@angular/core";
import { UsersService } from "../../../services/api/users.service";
import { LocalDataSource } from "ng2-smart-table";

@Component({
  selector: "customers-page",
  templateUrl: "./customers.component.html"
})
export class CustomersComponent {
  source: LocalDataSource;
  settings: any;
  constructor(private utils: UtilsService, private usersApi: UsersService) {
    this.settings = this.utils.getTable(
      {
        id: {
          title: "ID"
        },
        firstName: {
          title: "First Name"
        },
        lastName: {
          title: "Last Name"
        },
        email: {
          title: "Email"
        }
      },
      false
    );
    this.usersApi.getAllCustomers().subscribe((res: any) => {
      this.source = new LocalDataSource(res.body);
    });
  }

  refresh() {
    this.usersApi.getAllCustomers().subscribe((res: any) => {
      this.source.load(res.data.clients);
    });
  }
  onCreateConfirm(event) {
    this.usersApi.addCustomer(event.newData).subscribe((res: any) => {
      if (res.errors) return;
      event.newData.id = res.data.id;
      event.confirm.resolve(event.newData);
    });
  }

  onEditConfirm(event: any) {
    this.usersApi
      .updateCustomer(event.data.id, event.newData)
      .subscribe((res: any) => {
        if (res.errors) return;

        event.confirm.resolve(event.newData);
      });
  }

  onDeleteConfirm(event: any) {
    const id = event.data.id;
    let c = confirm("Are you sure you want to delete user #" + id + " ?");
    if (!c) return;
    this.usersApi.remove(id).subscribe((res: any) => {
      if (res.errors) return;
      event.confirm.resolve(event.data);
    });
  }
}
