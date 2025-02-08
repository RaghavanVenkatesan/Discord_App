import { createSlice } from "@reduxjs/toolkit";

// Define initial state
const initialState = {
  friends: [],
  pendingFriendsInvitations: [],
  onlineUsers: [],
};

// Create slice
const friendsSlice = createSlice({
  name: "friends",
  initialState,
  reducers: {
    setPendingFriendsInvitations(state, action) {
      state.pendingFriendsInvitations = action.payload;
    },
    setFriends(state, action) {
      state.friends = action.payload;
    },
    setOnlineUsers(state, action) {
      state.onlineUsers = action.payload;
    },
  },
});

// Export actions
export const { setPendingFriendsInvitations, setFriends, setOnlineUsers } =
  friendsSlice.actions;

// Export reducer
export default friendsSlice.reducer;
