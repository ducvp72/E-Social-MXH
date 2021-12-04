import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import {
  Sidebar,
  Search,
  Status,
  ConversationList,
  Conversation,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import AddUserChat from "./addUser";
import { chatApi } from "./../../../axiosApi/api/chatApi";

const ListChat = () => {
  const [cookies, , removeCookie] = useCookies(["auth"]);
  const currentUser = useSelector((state) => state.auth.data);
  const [open, setOpen] = useState(false);
  const [conver, setConver] = useState([]);
  const [noMore, setnoMore] = useState(true);
  const [page, setPage] = useState(2);
  const [skt, setSkt] = useState(true);

  useEffect(() => {
    getConver();
    return () => {
      setConver([]);
    };
  }, []);

  const handleClose = () => {
    setOpen(!open);
  };

  //
  const getConver = async () => {
    chatApi
      .getConverByToken(cookies.auth.tokens.access.token)
      .then((rs) => {
        // console.log("Conversation", rs.data);
        setConver(rs.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const getFirstPage = async () => {
    chatApi
      .getConverByToken(cookies.auth.tokens.access.token)
      .then((rs) => {
        // console.log("Conversation", rs.data);
        setConver(rs.data);
        setSkt(false);
        setnoMore(true);
        setPage(2);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleFetchConver = () => {
    return new Promise((resolve, reject) => {
      chatApi
        .getConverByToken(cookies.auth.tokens.access.token, page, 5)
        .then((rs) => {
          // console.log("Conversation", rs.data);
          setConver(rs.data);
        })
        .catch((err) => {
          console.log("err", err);
        });
    });
  };

  const fetchData = async () => {
    const conversFromServer = await handleFetchConver();
    setConver([...conver, ...conversFromServer]);
    if (conversFromServer.length === 0 || conversFromServer.length < 5) {
      setnoMore(false);
    }
    setPage(page + 1);
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
            className="far fa-lg fa-edit cursor-pointer"
          ></i>
        </div>
      </div>
      <Search placeholder="Search..." />
      <ConversationList>
        <Conversation
          name="Emily"
          lastSenderName="Emily"
          info="Yes i can do it for you"
          lastActivityTime="43 min"
        >
          <Avatar
            src="/assets/image/defaultAvatar.png"
            name="Emily"
            status="available"
          />
        </Conversation>
      </ConversationList>
    </Sidebar>
  );
};

export default ListChat;
