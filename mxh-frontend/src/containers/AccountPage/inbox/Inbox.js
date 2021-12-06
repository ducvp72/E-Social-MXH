import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import Chat from "./chat";
import ListConver from "./listConver";
import { MainContainer } from "@chatscope/chat-ui-kit-react";

const Inbox = () => {
  const [openSr, setOpenSr] = useState(true);

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
            <ListConver />
            <Chat setOpenSr={setOpenSr} openSr={openSr} />
          </MainContainer>
        </div>
      </div>
    </div>
  );
};

export default Inbox;
