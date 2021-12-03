import React, { useRef, useEffect } from "react";
import "./styles.css";
import {
  MessageList,
  TypingIndicator,
  MessageSeparator,
  Message,
  Avatar,
} from "@chatscope/chat-ui-kit-react";

const ListMessage = (props) => {
  const { messages } = props;
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const me = () => {
    let arr = [];
    for (let i = 0; i <= 2; i++) {
      arr = [
        ...arr,
        <Message
          key={i}
          model={{
            message: `${i}`,
            sentTime: "15 mins ago",
            sender: "localSender",
            direction: "outgoing",
            position: "single",
          }}
        />,
      ];
    }
    return arr;
  };

  const you = () => {
    let arr = [];
    for (let i = 0; i <= 5; i++) {
      arr = [
        ...arr,
        <Message
          model={{
            message: `${i}  khong co`,
            sentTime: "15 mins ago",
            sender: "Joe",
            direction: "incoming",
            position: "first",
          }}
          avatarSpacer
        />,
      ];
    }
    return arr;
  };

  return (
    <div
      className="overflow-y-auto post-show"
      style={{
        height: "525px",
      }}
    >
      <div as={MessageList} className="px-5">
        {/* Mốc thời gian */}
        <MessageSeparator content="Saturday, 30 November 2019" />
        {messages.map((m, i) => (
          <Message key={i} model={m} className="text-white" />
        ))}
        <div ref={messagesEndRef} />
        <TypingIndicator content="Duc is typing" />
      </div>
    </div>
  );
};

export default ListMessage;
