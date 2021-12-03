import React, { useState } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  Sidebar,
  Search,
  Status,
  ConversationList,
  Conversation,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import AddUserChat from "./addUser";

const ListChat = () => {
  const [cookies, , removeCookie] = useCookies(["auth"]);
  const currentUser = useSelector((state) => state.auth.data);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(!open);
  };
  return (
    <Sidebar position="left" scrollable={true}>
      <AddUserChat open={open} handleClose={handleClose} />
      <div className="grid grid-cols-6 mt-2 mb-2">
        <div className="flex col-start-2 col-span-4 justify-center items-center gap-2">
          <Status status="available" className="cursor-pointer" />
          <p className="font-medium cursor-pointer">{currentUser?.fullname}</p>
        </div>
        <div className=" flex justify-end mr-2 items-center">
          <i
            onClick={() => {
              handleClose();
            }}
            class="far fa-lg fa-edit cursor-pointer"
          ></i>
        </div>
      </div>
      <Search placeholder="Search..." />
      <ConversationList>
        <Conversation
          name="Lilly"
          lastSenderName="Lilly"
          info="Yes i can do it for you"
        >
          <Avatar
            src="/assets/image/defaultAvatar.png"
            name="Lilly"
            status="available"
          />
        </Conversation>

        <Conversation
          name="Emily"
          lastSenderName="Emily"
          info="Yes i can do it for you"
          unreadCnt={3}
        >
          <Avatar
            src="/assets/image/defaultAvatar.png"
            name="Emily"
            status="available"
          />
        </Conversation>

        <Conversation
          name="Kai"
          lastSenderName="Kai"
          info="Yes i can do it for you"
          unreadDot
        >
          <Avatar
            src="/assets/image/defaultAvatar.png"
            name="Kai"
            status="unavailable"
          />
        </Conversation>

        <Conversation
          name="Akane"
          lastSenderName="Akane"
          info="Yes i can do it for you"
        >
          <Avatar
            src="/assets/image/defaultAvatar.png"
            name="Akane"
            status="eager"
          />
        </Conversation>

        <Conversation
          name="Eliot"
          lastSenderName="Eliot"
          info="Yes i can do it for you"
        >
          <Avatar
            src="/assets/image/defaultAvatar.png"
            name="Eliot"
            status="away"
          />
        </Conversation>

        <Conversation
          name="Zoe"
          lastSenderName="Zoe"
          info="Yes i can do it for you"
        >
          <Avatar
            src="/assets/image/defaultAvatar.png"
            name="Zoe"
            status="dnd"
          />
        </Conversation>

        <Conversation
          name="Patrik"
          lastSenderName="Patrik"
          info="Yes i can do it for you"
        >
          <Avatar
            src="/assets/image/defaultAvatar.png"
            name="Patrik"
            status="invisible"
          />
        </Conversation>
      </ConversationList>
    </Sidebar>
  );
};

export default ListChat;
