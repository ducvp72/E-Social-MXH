import React, { useRef, useEffect, useState } from "react";
import "./styles.css";
import WasTyping from "./wasTyping";
import InfiniteScroll from "react-infinite-scroll-component";
import { chatApi } from "./../../../axiosApi/api/chatApi";
import { useCookies } from "react-cookie";
import InfititeLoading from "./../../LoadingPage/infititeLoading";
import { useParams } from "react-router-dom";
import {
  MessageList,
  TypingIndicator,
  MessageSeparator,
  Message,
  Avatar,
} from "@chatscope/chat-ui-kit-react";

const ChatElement = (props) => {
  const { data } = props;
  const [cookies, ,] = useCookies("auth");
  console.log("userID", cookies.auth.user.id);
  console.log("SenderId", data);
  return (
    <>
      <Message
        model={{
          message: "",
          sentTime: "",
          sender: "",
          direction: `${
            data?.sender !== cookies.auth.user.id ? "incoming" : "outgoing"
          }`,
          position: "last",
        }}
        // avatarSpacer={true}
      >
        {/* Gui lien tuc thi tat avatar */}
        <Avatar src={"/assets/image/defaultAvatar.png"} name="Joe" />
        <Message.CustomContent>
          {/* Neu la from thi la justify-end */}
          <div className=" flex justify-end">
            {data?.typeMessage === "IMAGE" && (
              <>
                <img
                  src={`https://mxhld.herokuapp.com/v1/file/${data?.content.file}`}
                  alt="Akane avatar"
                  width={200}
                />
                {data?.content.text === "TEXT" && (
                  <div className=" max-w-xs">{data?.content.text}</div>
                )}
              </>
            )}
            {data?.typeMessage === "VIDEO" && (
              <>
                <video
                  style={{
                    width: "400px",
                    height: "400px",
                  }}
                  // className="z-30"
                  controls
                >
                  <source
                    src={`https://mxhld.herokuapp.com/v1/file/${data?.content.file}`}
                  />
                </video>
                {data?.content.text === "TEXT" && (
                  <div className=" max-w-xs">{data?.content.text}</div>
                )}
              </>
            )}
            {data?.typeMessage === "AUDIO" && (
              <>
                <audio controls>
                  <source
                    src={`https://mxhld.herokuapp.com/v1/file/${data?.content.file}`}
                  />
                </audio>
                {data?.content.text === "TEXT" && (
                  <div className=" max-w-xs">{data?.content.text}</div>
                )}
              </>
            )}
          </div>

          {data?.typeMessage === "RECALL" && (
            <>
              <div className=" max-w-xs">RECALL</div>
            </>
          )}
          {data?.typeMessage === "TEXT" && (
            <div className=" max-w-xs">{data?.content.text}</div>
          )}
        </Message.CustomContent>
      </Message>
    </>
  );
};

const ListMessage = (props) => {
  const { messages, messData } = props;
  const messagesEndRef = useRef(null);
  const [cookies, , removeCookie] = useCookies(["auth"]);
  const [page, setPage] = useState(2);
  const [noMore, setnoMore] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [listMess, setListMess] = useState([]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (messData) {
      console.log("child", messData);
      getFirstPageMess();
    }
  }, [messData]);

  useEffect(() => {
    setListMess([messages, ...listMess]);
    scrollToBottom();
  }, [messages]);

  const getFirstPageMess = async () => {
    chatApi
      .getMessByIdConver(cookies.auth.tokens.access.token, messData, 1, 20)
      .then((rs) => {
        console.log("ALL chat", rs.data);
        setListMess(rs.data.results);
        setnoMore(true);
        setPage(2);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleFetchMess = () => {
    return new Promise((resolve, reject) => {
      chatApi
        .getMessByIdConver(cookies.auth.tokens.access.token, messData, page, 20)
        .then((rs) => {
          resolve(rs.data.results);
        })
        .catch((err) => {
          console.log("err", err);
        });
    });
  };

  const fetchData = async () => {
    const messFromServer = await handleFetchMess();
    setListMess([...listMess, ...messFromServer]);
    if (messFromServer.length === 0 || messFromServer.length < 20) {
      setnoMore(false);
    }
    setPage(page + 1);
  };

  return (
    <div
      className="post-show px-5 pb-2"
      id="scrollableDiv"
      style={{
        overflow: "auto",
        display: "flex",
        flexDirection: "column-reverse",
        height: 520,
      }}
    >
      <div ref={messagesEndRef} />
      <InfiniteScroll
        dataLength={listMess?.length}
        next={fetchData}
        style={{ display: "flex", flexDirection: "column-reverse" }}
        inverse={true}
        scrollThreshold={0.1}
        hasMore={noMore}
        loader={
          <div className=" flex justify-center">
            <InfititeLoading />
          </div>
        }
        scrollableTarget="scrollableDiv"
      >
        {listMess.map((data, i) => {
          return (
            <>
              <ChatElement key={i} data={data} />
            </>
          );
        })}
      </InfiniteScroll>

      {notFound && (
        <div className="flex justify-center items-center">
          <p className=""></p>
        </div>
      )}

      {/* {messages.map((m, i) => (
        <Message key={i} model={m}></Message>
      ))} */}

      {/* <MessageSeparator content="Saturday, 30 November 2019" /> */}

      {/* <WasTyping /> */}
    </div>
  );
};

export default ListMessage;
