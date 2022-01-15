import types from "../types";
import { ILogin } from "../../interfaces";

export function loginUser(payload: any) {
  return {
    type: types.LOGIN_USER,
    payload,
  };
}

export function loginUserSuccess() {
  return {
    type: types.LOGIN_USER_SUCCESS,
  };
}

export function loginUserFailed(payload: ILogin) {
  return {
    type: types.LOGIN_USER_SUCCESS,
    payload,
  };
}
