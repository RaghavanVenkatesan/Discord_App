import React from "react";
import { styled } from "@mui/system";
import FriendsListItem from "./FriendsListItem.component";
import { connect } from "react-redux";

const MainContainer = styled("div")({
  flexGrow: 1,
  width: "100%",
});

const checkOnlineUsers = (friends = [], onlineUsers = []) => {
  return friends.map((f) => {
    const isUserOnline = onlineUsers.find((user) => user.userId === f.id);
    // Return a new friend object with the updated isOnline property
    return {
      ...f, // Spread the original properties
      isOnline: isUserOnline ? true : false, // Add or update isOnline
    };
  });
};

const FriendsList = ({ friends, onlineUsers }) => {
  return (
    <MainContainer>
      {checkOnlineUsers(friends, onlineUsers).map((f) => (
        <FriendsListItem
          username={f.username}
          id={f.id}
          key={f.id}
          isOnline={f.isOnline}
        />
      ))}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ friends }) => {
  return {
    ...friends,
  };
};

export default connect(mapStoreStateToProps)(FriendsList);
