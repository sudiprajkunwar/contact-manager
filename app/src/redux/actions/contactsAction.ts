import types from "../types";
import { IContact, IDeleteContact, IUserID } from "../../interfaces";

export function getAllContacts(payload: IUserID) {
  return {
    type: types.GETALL_CONTACTS,
    payload,
  };
}

export function getAllContactsSuccess(payload: IContact) {
  return {
    type: types.GETALL_CONTACTS_SUCCESS,
    payload,
  };
}

export function createContacts(payload: IContact) {
  return {
    type: types.CREATE_CONTACT,
    payload,
  };
}

export function createContactsSuccess(payload: any) {
  return {
    type: types.DELETE_CONTACT_SUCCESS,
    payload,
  };
}

export function deleteContact(payload: any) {
  return {
    type: types.DELETE_CONTACT,
    payload,
  };
}

export function deleteContactSuccess(payload: IDeleteContact) {
  return {
    type: types.DELETE_CONTACT_SUCCESS,
    payload,
  };
}

export function updateFavouriteContact(payload: any) {
  return {
    type: types.UPDATE_FAVOURITE_CONTACT,
    payload,
  };
}

export function updateFavouriteContactSuccess(payload: IDeleteContact) {
  return {
    type: types.UPDATE_FAVOURITE_CONTACT_SUCCESS,
    payload,
  };
}

export function updateContact(payload: IContact) {
  return {
    type: types.UPDATE_CONTACT,
    payload,
  };
}

export function updateContactSuccess(payload: IContact) {
  return {
    type: types.UPDATE_CONTACT_SUCCESS,
    payload,
  };
}

export function contactsRequestFailed(payload: string) {
  return {
    type: types.CONTACTS_REQUEST_FAILED,
    payload,
  };
}
