import { createSlice } from "@reduxjs/toolkit";

export const chatTypes = {
  DIRECT: "DIRECT",
  GROUP: "GROUP",
};

const chatSlice = createSlice({
  name: "chat",
  initialState: {
    chosenChatDetails: null,
    chatType: null,
    messages: [],
  },
  reducers: {
    setChosenChatDetails: (state, action) => {
      state.chosenChatDetails = action.payload.chatDetails;
      state.chatType = action.payload.chatType;
      state.messages = [];
    },
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
  },
});

export const { setChosenChatDetails, setMessages } = chatSlice.actions;

export const getActions = (dispatch) => {
  return {
    setChosenChatDetails: (details, chatType) =>
      dispatch(setChosenChatDetails({ chatDetails: details, chatType })),
  };
};

export default chatSlice.reducer;
