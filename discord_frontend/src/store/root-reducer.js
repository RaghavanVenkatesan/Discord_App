import { combineReducers } from "redux";

import authSlice from "./auth/auth.slice";
import alertSlice from "./alert/alert.slice";
import friendsSlice from "./friends/friends.slice";
import chatSlice from "./chat/chat.slice";
import rooms from "./rooms/rooms.slice";

export const rootReducer = combineReducers({
  auth: authSlice,
  alert: alertSlice,
  friends: friendsSlice,
  chats: chatSlice,
  room: rooms,
});
