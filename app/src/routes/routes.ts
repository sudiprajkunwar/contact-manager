import { IRoutesType } from "../interfaces";
import Contacts from "../pages/Contacts";

export const routers: IRoutesType[] = [
  {
    path: "/contacts",
    title: "Contacts",
    icon: "icon-login",
    component: Contacts,
    showInMenu: false,
  },
];
