import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserInRoom: false,
  isUserRoomCreator: false,
  roomDetails: null,
  activeRooms: [],
  localStream: null,
  remoteStreams: [],
  audioOnly: false,
  screenSharingStream: null,
  isScreenSharingActive: false,
  isUserJoinedWithOnlyAudio: false,
};

const roomssSlice = createSlice({
  name: "rooms",
  initialState,
  reducers: {
    setOpenRoom(state, action) {
      state.isUserRoomCreator = action.payload.isUserRoomCreator;
      state.isUserInRoom = action.payload.isUserInRoom;
    },
    setRoomDetails(state, action) {
      state.roomDetails = action.payload;
    },
    setActiveRooms(state, action) {
      state.activeRooms = action.payload;
    },
    setLocalStream(state, action) {
      state.localStream = action.payload;
    },
    setAudioOnly(state, action) {
      state.audioOnly = action.payload;
    },
    setRemoteStreams(state, action) {
      state.remoteStreams = action.payload;
    },
    setScreenSharingStream(state, action) {
      state.isScreenSharingActive = action.payload.isScreenSharingActive;
      state.screenSharingStream = action.payload.screenSharingStream;
    },
    setIsUserJoinedOnlyWithAudio(state, action) {
      state.isUserJoinedWithOnlyAudio = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addDefaultCase((state, action) => {
      return state;
    });
  },
});

// Export actions
export const {
  setOpenRoom,
  setRoomDetails,
  setActiveRooms,
  setLocalStream,
  setAudioOnly,
  setRemoteStreams,
  setScreenSharingStream,
  setIsUserJoinedOnlyWithAudio,
} = roomssSlice.actions;

export const getActions = (dispatch) => {
  return {
    setAudioOnly: (audioOnly) => dispatch(setAudioOnly(audioOnly)),
    setScreenSharingStream: (stream) =>
      dispatch(
        setScreenSharingStream({
          isScreenSharingActive: stream ? true : false,
          screenSharingStream: stream || null,
        })
      ),
  };
};

// Export reducer
export default roomssSlice.reducer;
