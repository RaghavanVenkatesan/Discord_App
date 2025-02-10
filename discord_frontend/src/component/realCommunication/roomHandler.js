import store from "../../store/store";
import {
  setOpenRoom,
  setRoomDetails,
  setActiveRooms,
  setLocalStream,
  setRemoteStreams,
  setScreenSharingStream,
  setIsUserJoinedOnlyWithAudio,
} from "../../store/rooms/rooms.slice";
import * as socketConnection from "./socketConnection";
import * as webRTCHandler from "./webRTCHandler";

export const createNewRoom = () => {
  const successCallbackFunc = () => {
    store.dispatch(
      setOpenRoom({ isUserRoomCreator: true, isUserInRoom: true })
    );

    const audioOnly = store.getState().room.audioOnly;
    store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
    socketConnection.createNewRoom();
  };

  const onlyAudio = store.getState().room.audioOnly;
  webRTCHandler.getLocalStreamPreview(onlyAudio, successCallbackFunc);
};

export const newRoomCreated = (data) => {
  const { roomDetails } = data;

  store.dispatch(setRoomDetails(roomDetails));
};

export const updateActiveRooms = (data) => {
  const { activeRooms } = data;
  // console.log("new active rooms came from store");
  // console.log(activeRooms);

  const friends = store.getState().friends.friends;
  const rooms = [];

  const userId = store.getState().auth.userDetails?._id;

  activeRooms.forEach((room) => {
    const isRoomCreatedByMe = room.roomCreator.userId === userId;

    if (isRoomCreatedByMe) {
      rooms.push({ ...room, creatorUsername: "Me" });
    } else {
      friends.forEach((f) => {
        if (f.id === room.roomCreator.userId) {
          rooms.push({ ...room, creatorUsername: f.username });
        }
      });
    }
  });

  store.dispatch(setActiveRooms(rooms));
};

export const joinRoom = (roomId) => {
  const successCallbackFunc = () => {
    store.dispatch(setRoomDetails({ roomId }));
    store.dispatch(
      setOpenRoom({ isUserRoomCreator: false, isUserInRoom: true })
    );
    const audioOnly = store.getState().room.audioOnly;
    store.dispatch(setIsUserJoinedOnlyWithAudio(audioOnly));
    socketConnection.joinRoom({ roomId });
  };

  const onlyAudio = store.getState().room.audioOnly;
  webRTCHandler.getLocalStreamPreview(onlyAudio, successCallbackFunc);
};

// export const leaveRoom = () => {
//   const roomId = store.getState().room.roomDetails.roomId;

//   const localStream = store.getState().room.localStream;
//   if (localStream) {
//     localStream.getTracks().forEach((track) => track.stop());
//     store.dispatch(setLocalStream(null));
//   }

//   const screenSharingStream = store.getState().room.screenSharingStream;
//   if (screenSharingStream) {
//     screenSharingStream.getTracks().forEach((track) => track.stop());
//     store.dispatch(setScreenSharingStream(null));
//   }

//   store.dispatch(setRemoteStreams([]));
//   webRTCHandler.closeAllConnections();

//   socketConnection.leaveRoom({ roomId });
//   store.dispatch(setRoomDetails(null));
//   store.dispatch(
//     setOpenRoom({ isUserRoomCreator: false, isUserInRoom: false })
//   );
// };

export const leaveRoom = () => {
  const roomId = store.getState().room.roomDetails.roomId;

  // Close local stream
  const localStream = store.getState().room.localStream;
  // console.log("localStream: ", localStream);
  if (localStream) {
    // console.log("Stopping local stream", localStream);
    localStream.getTracks().forEach((track) => {
      // console.log("Stopping track", track);
      track.stop();
    });
    store.dispatch(setLocalStream(null));
  } else {
    console.warn("No local stream found");
  }

  // Close screen sharing stream
  const screenSharingStream = store.getState().room.screenSharingStream;
  if (screenSharingStream) {
    // console.log("Stopping screen sharing stream", screenSharingStream);
    screenSharingStream.getTracks().forEach((track) => {
      // console.log("Stopping track", track);
      track.stop();
    });
    store.dispatch(setScreenSharingStream(null));
  } else {
    console.warn("No screen sharing stream found");
  }

  // Close all peer connections
  store.dispatch(setRemoteStreams([]));
  webRTCHandler.closeAllConnections();

  // Leave the room and clean up
  socketConnection.leaveRoom({ roomId });
  store.dispatch(setRoomDetails(null));
  store.dispatch(
    setOpenRoom({ isUserRoomCreator: false, isUserInRoom: false })
  );
};
