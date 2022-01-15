import Cookies from "js-cookie";
import { notification } from "antd";
import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import types from "../types";
import Axios from "../../utils/axios";
import { loginUserFailed, loginUserSuccess } from "../actions/loginActions";

function* loginUser(action: any) {
  try {
    const response: AxiosResponse = yield call(() =>
      Axios.post("signin/", action.payload)
    );
    Cookies.set("token", response.data.access);
    yield put(loginUserSuccess());
    yield call(action.payload.onSuccess);
  } catch (error: any) {
    yield put(loginUserFailed(error));
    notification.error({
      message: "Login Failed",
      description: error.response.data.detail,
      duration: 2,
    });
  }
}

export function* loginSaga() {
  yield takeEvery(types.LOGIN_USER, loginUser);
}
