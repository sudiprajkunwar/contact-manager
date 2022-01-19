import types from "../types";
import { AnyAction } from "redux";

const initialState = {
  isLoading: false,
  data: [],
  error: null,
};

export const contactsReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.GETALL_CONTACTS:
    case types.CREATE_CONTACT:
    case types.UPDATE_CONTACT:
    case types.DELETE_CONTACT:
    case types.UPDATE_FAVOURITE_CONTACT:
      return {
        ...state,
        isLoading: true,
      };

    case types.GETALL_CONTACTS_SUCCESS:
    case types.CREATE_CONTACT_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        error: null,
      };

    case types.UPDATE_FAVOURITE_CONTACT_SUCCESS:
    case types.DELETE_CONTACT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };

    case types.CONTACTS_REQUEST_FAILED:
      return {
        ...state,
        error: action.error,
        isLoading: false,
      };

    default:
      return { ...state };
  }
};
