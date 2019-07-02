import { UtilsService } from "./../../../services/utils/utils.service";
import { Component } from "@angular/core";
import { UsersService } from "../../../services/api/users.service";
import { LocalDataSource } from "ng2-smart-table";

@Component({
  selector: "taskers-page",
  templateUrl: "./taskers.component.html"
})
export class TaskersComponent {
  source: LocalDataSource;
  settings: any;
  constructor(private utils: UtilsService, private usersApi: UsersService) {
    this.settings = this.utils.getTable(
      {
        id: {
          title: "ID",
          type: "number"
        },
        firstName: {
          title: "First Name",
          type: "string"
        },
        lastName: {
          title: "Last Name",
          type: "string"
        },
        email: {
          title: "Email",
          type: "string"
        },
        hourly: {
          title: "Hourly",
          type: "number"
        },
        rating: {
          title: "Rating",
          type: "number"
        }
      },
      false
    );
    this.usersApi.getAllTaskers().subscribe((res: any) => {
      this.source = new LocalDataSource(res.body);
    });
  }

  refresh() {
    this.usersApi.getAllTaskers().subscribe((res: any) => {
      this.source.load(res.data.clients);
    });
  }
  onCreateConfirm(event) {
    this.usersApi.addTasker(event.newData).subscribe((res: any) => {
      if (res.errors) return;
      event.newData.id = res.data.id;
      event.confirm.resolve(event.newData);
    });
  }

  onEditConfirm(event: any) {
    this.usersApi
      .updateTasker(event.data.id, event.newData)
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
