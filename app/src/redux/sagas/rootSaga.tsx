import { loginSaga } from "./loginSaga";
import { all } from "redux-saga/effects";

export default function* RootSaga() {
  yield all([loginSaga()]);
}
