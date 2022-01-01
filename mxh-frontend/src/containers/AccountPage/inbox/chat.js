import React, { useState } from "react";
import {
  ChatEngine,
  ChatList,
  ChatCard,
  NewChatForm,
  ChatFeed,
  ChatHeader,
  IceBreaker,
  MessageBubble,
  IsTyping,
  ConnectionBar,
  NewMessageForm,
  ChatSettings,
  ChatSettingsTop,
  PeopleSettings,
  PhotosSettings,
  OptionsSettings,
} from "react-chat-engine";
const Chat = () => {
  const [user, setUser] = useState("namlh");

  return (
    <div>
      <input
        type="text"
        onChange={(e) => {
          setUser(e.target.value);
        }}
      />
      
 
    </div>
  );
};

export default Chat;
