import { NbMenuItem } from "@nebular/theme";

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: "Users",
    icon: "nb-person",
    children: [
      {
        title: "Customers",
        link: "/pages/users/customers"
      },
      {
        title: "Taskers",
        link: "/pages/users/taskers"
      }
    ]
  }
];
