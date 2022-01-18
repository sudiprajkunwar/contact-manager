import { all } from "redux-saga/effects";
import { contactsSaga } from "./contactsSaga";

import { usersSaga } from "./usersSaga";

export default function* RootSaga() {
  yield all([usersSaga(), contactsSaga()]);
}
