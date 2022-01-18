import types from "../types";
import {
  IParamsUserId,
  ISigninUser,
  ISignupUser,
  IUser,
  IUserID,
} from "../../interfaces";

// sign in user
export function signinUser(payload: ISigninUser) {
  return {
    type: types.SIGNIN_USER,
    payload,
  };
}

export function signinUserSuccess(payload: IParamsUserId) {
  return {
    type: types.SIGNIN_USER_SUCCESS,
    payload,
  };
}

// sign up user
export function signupUser(payload: ISignupUser) {
  return {
    type: types.SIGNUP_USER,
    payload,
  };
}

export function signupUserSuccess() {
  return {
    type: types.SIGNUP_USER_SUCCESS,
  };
}

// get user detail
export function getUserDetail(payload: IUserID) {
  return {
    type: types.GET_USER_DETAIL,
    payload,
  };
}

export function getUserDetailSuccess(payload: IUser) {
  return {
    type: types.GET_USER_DETAIL_SUCCESS,
    payload,
  };
}

// request use failed
export function UserRequestFailed(payload: string) {
  return {
    type: types.USER_REQUEST_FAILED,
    payload,
  };
}
