import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useParams } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useSelector } from "react-redux";
import Chat from "./chat";
import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

import ListChat from "./listChat";
import { MainContainer } from "@chatscope/chat-ui-kit-react";

const Inbox = () => {
  // let { userName } = useParams();
  const [cookies, , removeCookie] = useCookies(["auth"]);
  const currentUser = useSelector((state) => state.auth.data);
  const [openSr, setOpenSr] = useState(true);
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
