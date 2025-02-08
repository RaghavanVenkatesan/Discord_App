import React, { useEffect } from "react";
import { styled } from "@mui/system";
import SideBar from "./SideBar/SideBar.component";
import FriendsSideBar from "./FriendsSideBar/FriendsSideBar.component";
import Messenger from "./Messenger/Messenger.component";
import AppBar from "./AppBar/AppBar.component";
import { logout } from "../shared/utils/auth";
import { connect } from "react-redux";
import { getActions } from "../../store/auth/auth.action";
import { connectWithSocketServer } from "../realCommunication/socketConnection";
import Room from "./Room/Room.component";

const Wrapper = styled("div")({
  width: "100%",
  height: "100vh",
  display: "flex",
});

const Dashboard = ({ setUserDetails, isUserInRoom }) => {
  useEffect(() => {
    const userDetails = localStorage.getItem("user");

    if (!userDetails) {
      logout();
    } else {
      setUserDetails(JSON.parse(userDetails));
      connectWithSocketServer(JSON.parse(userDetails));
    }
  }, [setUserDetails]);

  return (
    <Wrapper>
      <SideBar />
      <FriendsSideBar />
      <Messenger />
      <AppBar />
      {isUserInRoom && <Room />}
    </Wrapper>
  );
};

const mapStoreStateToProps = ({ room }) => {
  return {
    ...room,
  };
};

const mapActionsToProps = (dispatch) => {
  return {
    ...getActions(dispatch),
  };
};

export default connect(mapStoreStateToProps, mapActionsToProps)(Dashboard);
