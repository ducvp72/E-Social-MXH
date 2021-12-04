import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import Chat from "./chat";
import ListChat from "./listChat";
import { MainContainer } from "@chatscope/chat-ui-kit-react";
import { io } from "socket.io-client";

const Inbox = () => {
  // let { userName } = useParams();
  const currentUser = useSelector((state) => state.auth.data);
  const [cookies, , removeCookie] = useCookies(["auth"]);
  const [openSr, setOpenSr] = useState(true);
  const socket = useRef();

  useEffect(() => {
    socket.current = io("https://mxhld.herokuapp.com/", {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${cookies.auth.tokens.access.token}`,
          },
        },
      },
    });

    // socket.current.on("connect", () => {
    //   console.log("Connection ok !");
    // });

    // socket.current.on("connect_error", () => {
    //   console.log("connected error");
    // });

    // socket.current.emit("whoami", (data) => {
    //   console.log(data);
    // });

    // socket.current.on("getMessage", (data) => {
    //   console.log("on", data.text);
    // });
  }, [socket]);

  const handleChatSocket = () => {
    const onchat = {
      senderId: cookies.auth.user.id,
      receiverId: "61ab0f520011d000240f9a3d",
      text: "ok",
    };
    socket.current.emit("sendMessage", onchat);
  };

  return (
    <div className=" absolute w-full top-16">
      <Helmet>
        <title>Inbox - Direct</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className=" w-full h-full">
        <div
          style={{
            height: "656px",
            position: "relative",
          }}
        >
          <MainContainer responsive>
            <ListChat />
            <Chat setOpenSr={setOpenSr} openSr={openSr} />
          </MainContainer>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
