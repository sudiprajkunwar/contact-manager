import { combineReducers } from "redux";
import { usersReducer } from "./usersReducer";
import { contactsReducer } from "./contactsReducer";

export const RootReducer = combineReducers({
  users: usersReducer,
  contacts: contactsReducer,
});
