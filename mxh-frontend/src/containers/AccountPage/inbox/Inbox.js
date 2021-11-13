import * as React from "react";
import { Helmet } from "react-helmet-async";
import Chat from "./chat";
import { useParams } from "react-router-dom";

const Inbox = () => {
  let { userName } = useParams();
  return (
    <div className=" absolute left-1/2 transform -translate-x-1/2  shadow-md border-2 w-2/3 top-20">
      <Helmet>
        <title>Inbox - Direct</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className=" w-full h-full">
        {/* <Chat /> */}
        Day la chat
      </div>
    </div>
  );
};

export default Inbox;
