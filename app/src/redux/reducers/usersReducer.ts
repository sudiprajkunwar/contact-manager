import types from "../types";
import { AnyAction } from "redux";

const initialState = {
  isLoading: false,
  data: [],
  error: null,
};

export const usersReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.SIGNIN_USER:
    case types.SIGNUP_USER:
    case types.GET_USER_DETAIL:
      return {
        ...state,
        isLoading: true,
      };
    case types.SIGNIN_USER_SUCCESS:
    case types.SIGNUP_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
        data: action.payload,
      };
    case types.GET_USER_DETAIL_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
    case types.USER_REQUEST_FAILED:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    case types.SIGNOUT_USER:
      return {
        ...state,
        error: null,
        isLoading: false,
      };
    default:
      return { ...state };
  }
};
