import React, { useRef, useEffect, useState } from "react";
import "./styles.css";
import WasTyping from "./wasTyping";
import InfiniteScroll from "react-infinite-scroll-component";
import { chatApi } from "./../../../axiosApi/api/chatApi";
import { useCookies } from "react-cookie";
import { useParams } from "react-router-dom";
import { userApi } from "./../../../axiosApi/api/userApi";
import { useDispatch, useSelector } from "react-redux";
import {
  Avatar,
  ConversationHeader,
  EllipsisButton,
  VideoCallButton,
  VoiceCallButton,
  Message,
} from "@chatscope/chat-ui-kit-react";
import { actGetMoreMess } from "./../../../reducers/messageReducer";
import axios from "axios";

const ChatElement = React.memo(({ data, userInfo, socket }) => {
  // const { data, userInfo, socket } = props;
  const [cookies, ,] = useCookies("auth");
  const [fake, setFake] = useState(null);
  const [srcData, setSrcData] = useState(null);
  // console.log("Render chat element");

  useEffect(() => {}, [data]);

  // useEffect(() => {
  //   console.log(data);
  // }, [data]);

  const handleRecall = async () => {
    chatApi
      .recallMess(
        cookies.auth.tokens.access.token,
        fake.conversationId,
        fake.id
      )
      .then((rs) => {
        console.log("CheckXoa", rs);
        setFake({
          // ...data,
          id: rs.data.id,
          createdAt: Date.now(),
          sender: cookies.auth.user.id,
          typeMessage: "RECALL",
        });
        socket.current.emit("sendRecall", {
          senderId: cookies.auth.user.id,
          receiverId: userInfo?.id,
          messageId: rs.data.id,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showRecall = () => {
    if (
      fake?.sender === cookies.auth.user.id &&
      fake?.typeMessage !== "RECALL"
    ) {
      return (
        <div
          className=" text-sm"
          onClick={() => {
            handleRecall();
          }}
        >
          <i className="fas fa-2x fa-backspace cursor-pointer group-hover:block hidden" />
        </div>
      );
    } else {
      return null;
    }
  };

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
        {data?.sender !== cookies.auth.user.id && (
          <Avatar
            src={`https://mxhld.herokuapp.com/v1/image/${userInfo?.avatar}`}
            name="Joe"
          />
        )}

        <Message.CustomContent
          style={{
            background: "none!important",
          }}
        >
          {/* Neu la from thi la justify-end */}
          <div className="flex items-center gap-2 group">
            <div className="">
              <div
                className={`${
                  data?.sender !== cookies.auth.user.id
                    ? "justify-start"
                    : "justify-end"
                } flex  `}
              >
                {data?.typeMessage === "LIKE" && (
                  <div className="flex items-center w-10 h-10 bg-none">
                    <svg
                      aria-labelledby="js_1l"
                      viewBox="0 0 16 16"
                      height="80%"
                      width="80%"
                    >
                      <title id="js_1l">Ký hiệu giơ ngón tay cái</title>
                      <path
                        fill="#0084ff"
                        d="M16,9.1c0-0.8-0.3-1.1-0.6-1.3c0.2-0.3,0.3-0.7,0.3-1.2c0-1-0.8-1.7-2.1-1.7h-3.1c0.1-0.5,0.2-1.3,0.2-1.8 c0-1.1-0.3-2.4-1.2-3C9.3,0.1,9,0,8.7,0C8.1,0,7.7,0.2,7.6,0.4C7.5,0.5,7.5,0.6,7.5,0.7L7.6,3c0,0.2,0,0.4-0.1,0.5L5.7,6.6 c0,0-0.1,0.1-0.1,0.1l0,0l0,0L5.3,6.8C5.1,7,5,7.2,5,7.4v6.1c0,0.2,0.1,0.4,0.2,0.5c0.1,0.1,1,1,2,1h5.2c0.9,0,1.4-0.3,1.8-0.9 c0.3-0.5,0.2-1,0.1-1.4c0.5-0.2,0.9-0.5,1.1-1.2c0.1-0.4,0-0.8-0.2-1C15.6,10.3,16,9.9,16,9.1z"
                      ></path>
                      <path
                        fill="#0084ff"
                        d="M3.3,6H0.7C0.3,6,0,6.3,0,6.7v8.5C0,15.7,0.3,16,0.7,16h2.5C3.7,16,4,15.7,4,15.3V6.7C4,6.3,3.7,6,3.3,6z"
                      ></path>
                    </svg>
                  </div>
                )}
                {data?.typeMessage === "LOVE" && (
                  <>
                    <img
                      alt="❤️"
                      className="_5zft img"
                      draggable="false"
                      height="28"
                      src="https://static.xx.fbcdn.net/images/emoji.php/v9/tf2/1.5/28/2764.png"
                      width="28"
                    />
                  </>
                )}
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
                  {data?.sender !== cookies.auth.user.id ? (
                    <div className=" max-w-xs text-white font-normal italic">
                      {userInfo?.fullname} was recall
                    </div>
                  ) : (
                    <div className=" max-w-xs">
                      <p className=" text-white font-normal italic">
                        You was recall message
                      </p>
                    </div>
                  )}
                </>
              )}
              {data?.typeMessage === "TEXT" && (
                <div className=" max-w-xs">{data?.content.text}</div>
              )}
            </div>
            {showRecall()}
          </div>
        </Message.CustomContent>
      </Message>
    </>
  );
});

const ListMess = React.memo(({ listMess, userInfo, socket }) => {
  return (
    <>
      {listMess &&
        listMess.map((item, index) => {
          return (
            <div key={index}>
              <ChatElement userInfo={userInfo} data={item} socket={socket} />
            </div>
          );
        })}
    </>
  );
});

const ListMessBox = (props) => {
  const { messages, setOpenSr, openSr, typing, socket } = props;
  const messagesEndRef = useRef(null);
  const [cookies, ,] = useCookies(["auth"]);
  const [noMore, setnoMore] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userInfo, setUserInfo] = useState("");
  const currentMessage = useSelector((state) => state.messConver);

  const dispatch = useDispatch();
  let { userId } = useParams();
  const scrollToBottom = () => {
    if (messagesEndRef?.current) {
      messagesEndRef?.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  };

  // useEffect(() => {
  //   console.log("Render");
  // }, [currentMessage]);

  useEffect(() => {
    scrollToBottom();
  }, [currentMessage]);

  useEffect(() => {
    getUserInfo();
  }, [userId]);

  const getUserInfo = () => {
    userApi
      .getUserById(userId)
      .then((rs) => {
        setUserInfo(rs.data);
        // console.log("header", rs.data);
      })
      .catch((err) => {
        console.log("header", err);
      });
  };

  const fetchData = async () => {
    console.log("nexFetch");
    dispatch(
      actGetMoreMess(
        cookies.auth.tokens.access.token,
        currentMessage?.data[0]?.conversationId,
        currentMessage?.pageNext,
        10
      )
    );
    // console.log("NextFetch", currentMessage);
    if (currentMessage?.next?.length < 20) {
      setnoMore(false);
    }
  };

  return (
    <>
      <ConversationHeader>
        <ConversationHeader.Back />
        <Avatar
          src={`https://mxhld.herokuapp.com/v1/image/${userInfo?.avatar}`}
          status="available"
        />
        <ConversationHeader.Content
          userName={`${userInfo?.fullname}`}
          // info="Active 10 mins ago"
        />
        <ConversationHeader.Actions>
          <VoiceCallButton />
          <VideoCallButton />
          <EllipsisButton
            orientation="vertical"
            onClick={() => setOpenSr(!openSr)}
          />
        </ConversationHeader.Actions>
      </ConversationHeader>

      <div
        className="post-show px-5 pb-2"
        id="scrollableDivChat"
        style={{
          overflow: "auto",
          display: "flex",
          flexDirection: "column-reverse",
          height: 520,
        }}
      >
        <div ref={messagesEndRef} />

        {/* {currentMessage?.data &&
          currentMessage?.data.reverse().map((item, index) => {
            console.log(item.id);
            return (
              <div key={index}>
                <ChatElement userInfo={userInfo} data={item} socket={socket} />
              </div>
            );
          })} */}
        <ListMess
          userInfo={userInfo}
          listMess={currentMessage?.data}
          socket={socket}
        />

        {notFound && (
          <div className="fixed  z-50 transform -translate-x-1/2 mr-5 -translate-y-1/2 left-1/2 top-1/2 mt-5 ">
            <p className=""></p>
          </div>
        )}

        {/* <MessageSeparator content="Saturday, 30 November 2019" /> */}
        {typing && <WasTyping userInfo={userInfo} />}
      </div>
    </>
  );
};

export default ListMessBox;
