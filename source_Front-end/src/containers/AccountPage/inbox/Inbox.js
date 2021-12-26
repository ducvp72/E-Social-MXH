import React, { useState, useRef, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import ListConver from "./listConver";
import { MainContainer } from "@chatscope/chat-ui-kit-react";
import { SideBarChatRight } from "./sideBarChatRight";
import ChatBox from "./chatBox";
import { io } from "socket.io-client";
import { useCookies } from "react-cookie";

const Inbox = () => {
  const [openSr, setOpenSr] = useState(false);
  const [cookies, ,] = useCookies(["auth"]);
  const socket = useRef();
  useEffect(() => {
    socket.current = io("https://socket-mxhld.herokuapp.com/", {
      // transports: ["websocket", "polling"],
      // pingTimeout: 60000,
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${cookies.auth.tokens.access.token}`,
          },
        },
      },
    });
  }, []);

  return (
    <div className=" absolute w-full top-16 overflow-y-hidden">
      <Helmet>
        <title>Inbox - Direct</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className=" w-full h-full ">
        <div
          style={{
            height: "656px",
            position: "relative",
          }}
        >
          <MainContainer responsive>
            <ListConver socket={socket} />
            {/* <Chat setOpenSr={setOpenSr} openSr={openSr}  /> */}
            <ChatBox setOpenSr={setOpenSr} openSr={openSr} socket={socket} />
            {openSr && <SideBarChatRight />}
          </MainContainer>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
