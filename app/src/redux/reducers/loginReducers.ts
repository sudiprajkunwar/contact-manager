import types from "../types";

const initialState = {
  isLoading: false,
  data: [],
  error: null,
};

export const loginReducer = (state = initialState, action: any) => {
  switch (action.types) {
    case types.LOGIN_USER:
      return {
        ...state,
        isLoading: true,
      };
    case types.LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        error: null,
      };
    case types.LOGIN_USER_FAILED:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };
    default:
      return { ...state };
  }
};
