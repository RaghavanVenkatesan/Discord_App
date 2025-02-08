import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userDetails: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserDetails(state, action) {
      state.userDetails = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addDefaultCase((state, action) => {
      return state;
    });
  },
});

export const { setUserDetails } = authSlice.actions;

export default authSlice.reducer;
