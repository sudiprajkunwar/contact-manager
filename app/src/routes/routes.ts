import { IRoutesType } from "../interfaces";
import Contacts from "../pages/Contacts";
import ContactForm from "../pages/Contacts/ContactForm";
import NotFound from "../pages/NotFound";

export const routers: IRoutesType[] = [
  {
    path: "/contact",
    title: "Contact",
    component: Contacts,
  },
  {
    path: "/contact/add",
    title: "AddContact",
    component: ContactForm,
  },
  {
    path: "/contact/edit",
    title: "EditContact",
    component: ContactForm,
  },
  {
    path: "*",
    title: "notFouind",
    component: NotFound,
  },
];
