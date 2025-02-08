import { createAsyncThunk } from "@reduxjs/toolkit";
import { openAlertMessage } from "../alert/alert.slice";
import * as api from "../../api";

// createAsyncThunk for sending a friend invitation
export const sendFriendInvitation = createAsyncThunk(
  "friends/sendFriendInvitation",
  async ({ data, closeDialogHandler }, { dispatch, rejectWithValue }) => {
    try {
      console.log(data);
      const response = await api.sendFriendInvitation(data);
      if (response.error) {
        dispatch(openAlertMessage(response.exception?.response?.data));
        return rejectWithValue(response.exception?.response?.data);
      } else {
        dispatch(openAlertMessage("Invitation has been sent!"));
        closeDialogHandler();
        return response;
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// createAsyncThunk for accepting a friend invitation
export const acceptFriendInvitation = createAsyncThunk(
  "friends/acceptFriendInvitation",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.acceptFriendInvitation(data);
      if (response.error) {
        dispatch(openAlertMessage(response.exception?.response?.data));
        return rejectWithValue(response.exception?.response?.data);
      } else {
        dispatch(openAlertMessage("Invitation accepted!"));
        return response;
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

// createAsyncThunk for rejecting a friend invitation
export const rejectFriendInvitation = createAsyncThunk(
  "friends/rejectFriendInvitation",
  async (data, { dispatch, rejectWithValue }) => {
    try {
      const response = await api.rejectFriendInvitation(data);
      if (response.error) {
        dispatch(openAlertMessage(response.exception?.response?.data));
        return rejectWithValue(response.exception?.response?.data);
      } else {
        dispatch(openAlertMessage("Invitation rejected!"));
        return response;
      }
    } catch (err) {
      return rejectWithValue(err.response?.data || err.message);
    }
  }
);

export const getActions = (dispatch) => {
  return {
    sendFriendInvitation: (data, closeDialogHandler) =>
      dispatch(sendFriendInvitation({ data, closeDialogHandler })),
    acceptFriendInvitation: (data) => dispatch(acceptFriendInvitation(data)),
    rejectFriendInvitation: (data) => dispatch(rejectFriendInvitation(data)),
  };
};
