const serverStore = require("../serverStore");
const roomsUpdate = require("./updates/rooms");

const roomLeaveHandler = (socket, data) => {
  const { roomId } = data;

  const activeRoom = serverStore.getActiveRoom(roomId);

  if (activeRoom) {
    serverStore.leaveActiveRoom(roomId, socket.id);

    const updatedActiveRoom = serverStore.getActiveRoom(roomId);

    if (updatedActiveRoom) {
      updatedActiveRoom.participants.forEach((participant) => {
        console.log("Left user Socket ID: ", socket.id);
        console.log("participant id: ", participant.socketId);
        socket.to(participant.socketId).emit("room-participant-left", {
          connUserSocketId: socket.id,
        });
      });
    }

    roomsUpdate.updateRooms();
  }
};

module.exports = roomLeaveHandler;
