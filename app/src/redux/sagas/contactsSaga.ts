import { notification } from "antd";
import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

import types from "../types";
import { AnyAction } from "redux";
import Axios from "../../utils/axios";
import {
  contactsRequestFailed,
  createContactsSuccess,
  deleteContactSuccess,
  getAllContactsSuccess,
  updateContactSuccess,
} from "../actions/contactsAction";

function* getAllContacts(action: AnyAction) {
  try {
    const response: AxiosResponse = yield call(() =>
      Axios.get("fetch-contacts/", action.payload)
    );
    yield put(getAllContactsSuccess(response.data));
  } catch (error: any) {
    yield put(contactsRequestFailed(error));
    notification.error({
      message: "Loading contacts failed.",
      description:
        error.response && error.response.data && error.response.data.detail,
      duration: 2,
    });
  }
}

function* createContacts(action: AnyAction) {
  try {
    const response: AxiosResponse = yield call(() =>
      Axios.post("create-contact/", action.payload)
    );
    yield put(createContactsSuccess(response && response.data));
    yield call(action.payload.onSuccess);
  } catch (error: any) {
    console.log(error);
    yield put(contactsRequestFailed(error));
    notification.error({
      message: "creating contacts failed.",
      description:
        error.response && error.response.data && error.response.data.detail,
      duration: 2,
    });
  }
}

function* updateContact(action: AnyAction) {
  try {
    const response: AxiosResponse = yield call(() =>
      Axios.put("update-contact/", action.payload)
    );
    yield put(updateContactSuccess(response.data));
    yield call(action.payload.onSuccess);
  } catch (error: any) {
    console.log(error);
    yield put(contactsRequestFailed(error));
    notification.error({
      message: "updating contacts failed.",
      description:
        error.response && error.response.data && error.response.data.detail,
      duration: 2,
    });
  }
}

function* deleteContact(action: AnyAction) {
  try {
    const response: AxiosResponse = yield call(() =>
      Axios.delete("remove-contact/", action.payload)
    );
    yield put(deleteContactSuccess(response.data));
    yield call(action.payload.onSuccess);
  } catch (error: any) {
    console.log(error);
    yield put(contactsRequestFailed(error));
    notification.error({
      message: "Deleting contacts failed.",
      description:
        error.response && error.response.data && error.response.data.detail,
      duration: 2,
    });
  }
}

export function* contactsSaga() {
  yield takeEvery(types.GETALL_CONTACTS, getAllContacts);
  yield takeEvery(types.CREATE_CONTACT, createContacts);
  yield takeEvery(types.DELETE_CONTACT, deleteContact);
  yield takeEvery(types.UPDATE_CONTACT, updateContact);
}
