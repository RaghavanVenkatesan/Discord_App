import React from "react";
import { styled } from "@mui/system";
import ScreenShareButton from "./ScreenShareButton.component";
import MicButton from "./MicButton.component";
import CloseRoomButton from "./CloseRoomButton.component";
import CameraButton from "./CameraButton.component";
import { connect } from "react-redux";
import { getActions } from "../../../../store/rooms/rooms.slice";

const MainContainer = styled("div")({
  height: "15%",
  width: "100%",
  backgroundColor: "#5865f2",
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const RoomButtons = (props) => {
  const { localStream, isUserJoinedWithOnlyAudio } = props;
  return (
    <MainContainer>
      {!isUserJoinedWithOnlyAudio && <ScreenShareButton {...props} />}
      <MicButton localStream={localStream} />
      <CloseRoomButton />
      {!isUserJoinedWithOnlyAudio && <CameraButton localStream={localStream} />}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

const mapActionToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStoreStateToProps, mapActionToProps)(RoomButtons);
