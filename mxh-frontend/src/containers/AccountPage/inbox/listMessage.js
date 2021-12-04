import React, { useRef, useEffect } from "react";
import "./styles.css";
import WasTyping from "./wasTyping";
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

        {/* Only Text */}
        <Message
          model={{
            message: "",
            sentTime: "15 mins ago",
            sender: "Eliot",
            direction: "incoming",
            position: "last",
          }}
          avatarSpacer={true}
        >
          <Message.CustomContent>
            <div className=" max-w-xs">
              {`Hello my friend! Do you want to buy sunglasses? Hello myfriend! Do you want to buy sunglasses? Hello my friend!Do youwant to buy sunglasses?`}
            </div>
          </Message.CustomContent>
        </Message>

        {/* Text and Avatar */}
        <Message
          model={{
            message:
              "Hello my friend!Do you want to buy sunglasses?Hello my friend!Do you want to buy sunglasses?Hello my friend!Do you want to buy sunglasses?",
            sentTime: "15 mins ago",
            sender: "Eliot",
            direction: "incoming",
            position: "last",
          }}
          width={"200px"}
          className=" max-w-sm"
        >
          <Avatar src={"https://icotar.com/avatar/craig"} name="Joe" />
        </Message>

        {/* Only img from other */}
        <Message
          model={{
            message: ``,
            sentTime: "15 mins ago",
            sender: "Joe",
            direction: "incoming",
            position: "first",
          }}
          // avatarSpacer={true}
        >
          <Avatar src={"https://icotar.com/avatar/craig"} name="Akane" />
          <Message.ImageContent
            src={"https://icotar.com/avatar/tt"}
            alt="Akane avatar"
            width={200}
          />
        </Message>

        {/* IMG and TEXT From other */}
        <Message
          model={{
            message: ``,
            sentTime: "15 mins ago",
            sender: "Joe",
            direction: "incoming",
            position: "first",
          }}
        >
          <Avatar src={"https://icotar.com/avatar/craig"} name="Akane" />
          <Message.CustomContent>
            <Message.ImageContent
              src={"https://icotar.com/avatar/tt"}
              alt="Akane avatar"
              width={200}
            />
            <div className=" max-w-xs ">
              {
                "Hello my friend!Do you want to buy sunglasses?Hello my friend!Do you want to buy sunglasses?Hello my friend!Do you want to buy sunglasses?"
              }
            </div>
          </Message.CustomContent>
        </Message>

        {/* me text */}
        <Message
          model={{
            message: "",
            sentTime: "just now",
            sender: "Akane",
            direction: "outgoing",
            position: "single",
          }}
        >
          <Message.CustomContent>
            <div className=" max-w-xs ">
              {`Hello my friend! Do you want to buy sunglasses? Hello myfriend! Do you want to buy sunglasses? Hello my friend!Do youwant to buy sunglasses?`}
            </div>
          </Message.CustomContent>
        </Message>

        {/* me image */}
        <Message
          model={{
            message: "",
            sentTime: "just now",
            sender: "Akane",
            direction: "outgoing",
            position: "single",
          }}
        >
          <Message.ImageContent
            src={"https://icotar.com/avatar/tt"}
            alt="Akane avatar"
            width={200}
          />
        </Message>

        {/* me Image and text */}
        <Message
          model={{
            message: "",
            sentTime: "just now",
            sender: "Akane",
            direction: "outgoing",
            position: "single",
          }}
        >
          <Message.CustomContent>
            <div className=" max-w-xs ">
              <div className=" flex justify-end">
                <img
                  src={"https://icotar.com/avatar/tt"}
                  alt="Akane avatar"
                  width={200}
                />
              </div>
              <div className="flex justify-end">
                {/* {`Hello my friend! Do you want to buy sunglasses? Hello myfriend! Do you want to buy sunglasses? Hello my friend!Do youwant to buy sunglasses?
              `} */}
                a
              </div>
            </div>
          </Message.CustomContent>
        </Message>

        {messages.map((m, i) => (
          <Message key={i} model={m}></Message>
        ))}

        <WasTyping />

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default ListMessage;
