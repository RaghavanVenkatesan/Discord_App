import React from "react";
import { styled } from "@mui/system";
import AddFriendButton from "./AddFriendButton.component";
import FriendsTitle from "./FriendsTitle.component";
import FriendsList from "./FriendsList/FriendList.component";
import PendingInvitationsList from "./PendingInvitationsList/PendingInvitationsList.component";

const MainContainer = styled("div")({
  width: "224px",
  height: "100%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#2F3136",
});

const FriendsSideBar = () => {
  return (
    <MainContainer>
      <AddFriendButton />
      <FriendsTitle title="Private Messages" />
      <FriendsList />
      <FriendsTitle title="Invitations" />
      <PendingInvitationsList />
    </MainContainer>
  );
};

export default FriendsSideBar;
