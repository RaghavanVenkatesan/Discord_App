import React from "react";
import { styled } from "@mui/system";
import MainPageButton from "./MainPageButton.component";
import CreateRoomButton from "./CreateRoomButton.component";
import ActiveRoomButton from "./ActiveRoomButton.component";
import { connect } from "react-redux";

const MainContainer = styled("div")({
  width: "72px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#202225",
});

const SideBar = ({ activeRooms, isUserInRoom }) => {
  return (
    <MainContainer>
      <MainPageButton />
      <CreateRoomButton isUserInRoom={isUserInRoom} />
      {activeRooms.map((room) => (
        <ActiveRoomButton
          roomId={room.roomId}
          creatorUsername={room.creatorUsername}
          amountOfParticipants={room.participants.length}
          key={room.roomId}
          isUserInRoom={isUserInRoom}
        />
      ))}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

export default connect(mapStoreStateToProps)(SideBar);
