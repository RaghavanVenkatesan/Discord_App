import { createSlice } from "@reduxjs/toolkit";

const alertSlice = createSlice({
  name: "alert",
  initialState: {
    showAlertMessage: false,
    alertMessageContent: null,
  },
  reducers: {
    openAlertMessage: (state, action) => {
      state.showAlertMessage = true;
      state.alertMessageContent = action.payload;
    },
    closeAlertMessage: (state) => {
      state.showAlertMessage = false;
      state.alertMessageContent = null;
    },
  },
});

// Exporting the actions
export const { openAlertMessage, closeAlertMessage } = alertSlice.actions;

// Exporting the reducer
export default alertSlice.reducer;
