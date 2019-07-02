import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class UtilsService {
  constructor() {}

  getTable(columns: any, add: boolean = true) {
    return {
      columns,
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmEdit: true
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true
      },
      actions: {
        position: "right",
        add
      }
    };
  }
}
