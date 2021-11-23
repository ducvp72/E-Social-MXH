import * as React from "react";
import { Helmet } from "react-helmet-async";
// import { useParams } from "react-router-dom";
import Chat from "./chat";

const Inbox = () => {
  // let { userName } = useParams();
  return (
    // <div className=" absolute left-1/2 transform -translate-x-1/2   border-2 w-2/3 top-20">
    <div className=" absolute w-full px-5 top-20">
      <Helmet>
        <title>Inbox - Direct</title>
        <meta name="description" content="Helmet application" />
      </Helmet>
      <div className=" w-full h-full">
        <Chat />
      </div>
    </div>
  );
};

export default Inbox;
