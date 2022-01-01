import React, { useRef, useEffect, useState } from "react";
import "./styles.css";
import WasTyping from "./wasTyping";
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
import {
  actGetMess,
  actRecallMessage,
} from "./../../../reducers/messageReducer";
import { actGetMyConver } from "../../../reducers/converReducer";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { actGetMediaByConver } from "../../../reducers/mediaReducer";
import { actGetFileByConver } from "../../../reducers/fileReducer";

const MediaDetail = ({ popup, handleCloses, item }) => {
  const checkMedia = (item) => {
    if (item) {
      if (item?.typeMessage === "IMAGE") {
        return (
          <>
            <div
              className="flex  items-center justify-center cursor-pointer outline-none"
              style={{ border: "1px solid #efefef" }}
            >
              <img
                src={`https://mxhld.herokuapp.com/v1/file/${item?.content.file}`}
                alt="userpost"
                className="w-full object-cover h-full"
              />
            </div>
          </>
        );
      }
      if (item?.typeMessage === "VIDEO") {
        return (
          <div className="flex outline-none items-center justify-center object-cover cursor-pointer bg-black ">
            <video
              style={{ width: "700px" }}
              className="outline-none h-full w-full "
              controls
            >
              <source
                src={`https://mxhld.herokuapp.com/v1/file/${item?.content.file}`}
              />
            </video>
          </div>
        );
      }
      if (item?.typeMessage === "AUDIO") {
        return (
          <div
            style={{ width: "400px" }}
            className=" items-center justify-center cursor-pointer outline-none "
          >
            <audio className=" flex w-full items-center z-30 mt-2 " controls>
              <source
                src={`https://mxhld.herokuapp.com/v1/file/${item?.content.file}`}
                type="audio/mp3"
              />
            </audio>
          </div>
        );
      }
    }
  };
  return (
    <>
      <Dialog
        open={popup}
        onClose={handleCloses}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">
          <DialogActions>
            <Button onClick={handleCloses} color="error" variant="outlined">
              Close
            </Button>
          </DialogActions>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {checkMedia(item)}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </>
  );
};

const ChatElement = React.memo(({ data, userInfo, socket, index }) => {
  const [cookies, ,] = useCookies("auth");
  const dispatch = useDispatch();
  const [popup, setPopup] = useState(false);
  const [temp, setTemp] = useState(null);
  const handleRecall = async () => {
    chatApi
      .recallMess(
        cookies.auth.tokens.access.token,
        data?.conversationId,
        data?.id
      )
      .then((rs) => {
        // console.log("CheckXoa", rs.data);
        dispatch(
          actRecallMessage(
            {
              id: rs?.data?.id,
              createdAt: rs?.data?.createdAt,
              conversationId: rs?.data?.conversationId,
              sender: cookies.auth.user.id,
              typeMessage: "RECALL",
            },
            index
          )
        );

        dispatch(
          actGetFileByConver(
            cookies.auth.tokens.access.token,
            rs?.data?.conversationId,
            1,
            10,
            "DOWNLOAD"
          )
        );

        dispatch(
          actGetMediaByConver(
            cookies.auth.tokens.access.token,
            rs?.data?.conversationId,
            1,
            10,
            "MEDIA"
          )
        );

        socket.current.emit("sendRecall", {
          senderId: cookies.auth.user.id,
          receiverId: userInfo?.id,
          messageId: rs.data.id,
          index,
        });
        setTimeout(() => {
          dispatch(actGetMyConver(cookies.auth.tokens.access.token, 1, 10));
        }, 2000);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const showRecall = () => {
    if (
      data?.sender === cookies.auth.user.id &&
      data?.typeMessage !== "RECALL"
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

  const handleClickOpens = () => {
    setPopup(true);
  };

  const handleCloses = () => {
    setPopup(false);
    setTemp(null);
  };

  return (
    <>
      <MediaDetail item={temp} popup={popup} handleCloses={handleCloses} />
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
                      onClick={() => {
                        handleClickOpens();
                        setTemp(data);
                      }}
                      src={`https://mxhld.herokuapp.com/v1/file/${data?.content?.file}`}
                      alt="Akane avatar"
                      width={200}
                      className=" cursor-pointer"
                    />
                  </>
                )}
                {data?.typeMessage === "VIDEO" && (
                  <>
                    <video
                      onClick={() => {
                        handleClickOpens();
                        setTemp(data);
                      }}
                      style={{
                        width: "400px",
                        height: "400px",
                      }}
                      // className="z-30"
                      className=" cursor-pointer"
                      controls
                    >
                      <source
                        src={`https://mxhld.herokuapp.com/v1/file/${data?.content.file}`}
                      />
                    </video>
                  </>
                )}
                {data?.typeMessage === "AUDIO" && (
                  <>
                    <div>
                      <audio
                        onClick={() => {
                          handleClickOpens();
                          setTemp(data);
                        }}
                        controls
                        className=" cursor-pointer"
                      >
                        <source
                          src={`https://mxhld.herokuapp.com/v1/file/${data?.content.file}`}
                        />
                      </audio>
                    </div>
                  </>
                )}
              </div>

              {data?.typeMessage === "RECALL" && (
                <>
                  {data?.sender !== cookies.auth.user.id ? (
                    <div className=" max-w-xs text-gray-500  font-bold italic">
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

              {data?.typeMessage === "DOWNLOAD" && (
                <div className=" max-w-xs">
                  <td
                    className={`
                    ${
                      data?.sender !== cookies.auth.user.id
                        ? "text-blue-700"
                        : "text-yellow-200"
                    }
                    cursor-pointer   underline decoration-1 italic`}
                    onClick={() => {
                      window.open(
                        `https://mxhld.herokuapp.com/v1/file/${data?.content.file}`,
                        "_blank"
                      );
                    }}
                  >
                    {data?.content.text}
                  </td>
                </div>
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

const ListMess = ({
  listMess,
  userInfo,
  socket,
  scrollDown,
  scroll,
  userId,
  currentMessage,
}) => {
  const [cookies, ,] = useCookies(["auth"]);
  const [wait, setWatting] = useState(true);
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  useEffect(() => {
    getConverMess();
    setWatting(true);
  }, []);

  const getConverMess = () => {
    chatApi
      .createConver(cookies.auth.tokens.access.token, userId)
      .then((rs) => {
        dispatch(actGetMess(cookies.auth.tokens.access.token, rs.data.id));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    setWatting(true);
  }, [userId]);

  useEffect(() => {
    scrollToBottom();
  }, []);

  useEffect(() => {
    if (listMess?.length >= 0) {
      setWatting(false);
    }
    scrollToBottom();
  }, [listMess]);

  useEffect(() => {
    scrollToBottom();
  }, [scroll]);

  const scrollToBottom = () => {
    var height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight;
    window.scroll(1, height);
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="relative">
      {wait && (
        <div
          className=" object-cover absolute w-full h-full z-50 bg-white  flex items-center justify-center"
          style={{
            overflow: "hidden",
          }}
        >
          <img className="w-16 h-16" src="/assets/image/spin.gif" alt="spin" />
        </div>
      )}
      <div
        id="messDiv"
        className=" post-show relative "
        style={{
          height: "520px",
          overflow: "auto",
        }}
      >
        {listMess?.length > 0 && (
          <div className="px-5 pt-5 relative">
            {listMess &&
              listMess.map((item, index) => {
                return (
                  <div key={index}>
                    <ChatElement
                      index={index}
                      userInfo={userInfo}
                      data={item}
                      socket={socket}
                    />
                  </div>
                );
              })}
          </div>
        )}
        <div
          className={`${listMess?.length > 0 && "mt-20"}`}
          ref={messagesEndRef}
        />
      </div>
    </div>
  );
};

const ListMessBox = (props) => {
  const { setOpenSr, openSr, typing, socket, scroll } = props;
  const [userInfo, setUserInfo] = useState(null);
  const currentMessage = useSelector((state) => state.messConver);
  let { userId } = useParams();

  useEffect(() => {
    getUserInfo();
  }, [userId]);

  const getUserInfo = async () => {
    // console.log("UserId", userId, " ", userInfo?.avatar);
    await userApi
      .getUserById(userId)
      .then((rs) => {
        setUserInfo(rs.data);

        // setAva(false);
      })
      .catch((err) => {
        console.log("header", err);
        // setAva(false);
      });
  };

  return (
    <>
      <ConversationHeader>
        <ConversationHeader.Back />

        <Avatar
          src={`https://mxhld.herokuapp.com/v1/image/${userInfo?.avatar}`}
        />

        <ConversationHeader.Content userName={`${userInfo?.fullname}`} />
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
        className="post-show"
        style={{
          overflow: "hidden",
          height: 510,
        }}
      >
        <ListMess
          userInfo={userInfo}
          listMess={currentMessage?.data}
          currentMessage={currentMessage}
          socket={socket}
          scroll={scroll}
          userId={userId}
        />

        {/* <MessageSeparator content="Saturday, 30 November 2019" /> */}
        {typing && <WasTyping userInfo={userInfo} />}
      </div>
    </>
  );
};

export default ListMessBox;
