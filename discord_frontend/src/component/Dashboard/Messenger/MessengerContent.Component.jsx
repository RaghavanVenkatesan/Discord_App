import React, { useEffect } from "react";
import { styled } from "@mui/system";
import Messages from "./Messages/Messages.component";
import NewMessageInput from "./NewMessageInput.Component";
import { getDirectChatHistory } from "../../realCommunication/socketConnection";

const Wrapper = styled("div")({
  flexGrow: 1,
});

const MessengerContent = ({ chosenChatDetails }) => {
  console.log("test 2", chosenChatDetails);
  useEffect(() => {
    getDirectChatHistory({
      receiverUserId: chosenChatDetails.id,
    });
  }, [chosenChatDetails]);

  return (
    <Wrapper>
      <Messages />
      <NewMessageInput />
    </Wrapper>
  );
};

export default MessengerContent;
