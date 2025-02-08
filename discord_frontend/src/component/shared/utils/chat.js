import store from "../../../store/store";
import { setMessages } from "../../../store/chat/chat.slice";

export const updateDirectChatHistoryIfActive = (data) => {
  const { participants, messages } = data;

  // find id of user from token and id from active conversation
  const receiverId = store.getState().chats.chosenChatDetails?.id;
  const userId = store.getState().auth.userDetails._id;

  console.log("receive id: ", receiverId);
  console.log("user id: ", userId);

  if (receiverId && userId) {
    const usersInCoversation = [receiverId, userId];

    updateChatHistoryIfSameConversationActive({
      participants,
      usersInCoversation,
      messages,
    });
  }
};

const updateChatHistoryIfSameConversationActive = ({
  participants,
  usersInCoversation,
  messages,
}) => {
  const result = participants.every(function (participantId) {
    return usersInCoversation.includes(participantId);
  });

  console.log("result: ", result);

  if (result) {
    store.dispatch(setMessages(messages));
  }
};
