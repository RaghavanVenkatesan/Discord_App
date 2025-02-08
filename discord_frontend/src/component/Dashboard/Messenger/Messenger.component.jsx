import React from "react";
import { styled } from "@mui/system";
import { connect } from "react-redux";
import WelcomeMessage from "./WelcomeMessage.Component";
import MessengerContent from "./MessengerContent.Component";

const MainContainer = styled("div")({
  flexGrow: 1,
  backgroundColor: "#36393f",
  marginTop: "48px",
  display: "flex",
});

const Messenger = ({ chosenChatDetails }) => {
  console.log("test", chosenChatDetails);

  return (
    <MainContainer>
      {!chosenChatDetails ? (
        <WelcomeMessage />
      ) : (
        <MessengerContent chosenChatDetails={chosenChatDetails} />
      )}
    </MainContainer>
  );
};

const mapStoreStateToProps = ({ chats }) => {
  return {
    ...chats,
  };
};

export default connect(mapStoreStateToProps)(Messenger);
