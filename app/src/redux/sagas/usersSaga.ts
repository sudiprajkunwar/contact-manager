import Cookies from "js-cookie";
import { notification } from "antd";
import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import types from "../types";
import { AnyAction } from "redux";
import Axios from "../../utils/axios";
import {
  getUserDetailSuccess,
  signinUserSuccess,
  signupUserSuccess,
  UserRequestFailed,
} from "../actions/userAction";

function* signinUser(action: AnyAction) {
  try {
    const response: AxiosResponse = yield call(() =>
      Axios.post("signin/", action.payload)
    );
    Cookies.set("token", response.data.token);
    Cookies.set("userId", response.data._id);
    yield put(signinUserSuccess(response.data));
    yield call(action.payload.onSuccess);
  } catch (error: any) {
    yield put(UserRequestFailed(error));
    notification.error({
      message: "Sign in Failed",
      description: error.response.data.detail,
      duration: 2,
    });
  }
}

function* signupUser(action: AnyAction) {
  try {
    const response: AxiosResponse = yield call(() =>
      Axios.post("signup/", action.payload)
    );
    yield put(signupUserSuccess());
    yield call(action.payload.onSuccess);
  } catch (error: any) {
    yield put(UserRequestFailed(error));
    notification.error({
      message: "Sign up Failed",
      description: error.response.data.detail,
      duration: 2,
    });
  }
}

function* getUserDetail(action: AnyAction) {
  try {
    const response: AxiosResponse = yield call(() =>
      Axios.get("user-detail/", action.payload)
    );
    yield put(getUserDetailSuccess(response && response.data));
  } catch (error: any) {
    yield put(UserRequestFailed(error));
    notification.error({
      message: "loading user detail failed",
      description: error.response.data.detail,
      duration: 2,
    });
  }
}

export function* usersSaga() {
  yield takeEvery(types.SIGNIN_USER, signinUser);
  yield takeEvery(types.SIGNUP_USER, signupUser);
  yield takeEvery(types.GET_USER_DETAIL, getUserDetail);
}
