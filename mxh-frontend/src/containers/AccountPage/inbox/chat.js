import React, { useState, useRef, useEffect } from "react";
import ListMessage from "./listMessage";
import { useOnClickOutside } from "./../../../utils/handleRefresh";
import Picker from "emoji-picker-react";
import { SideBarChatRight } from "./sideBarChatRight";
import { useCookies } from "react-cookie";
import { io } from "socket.io-client";
import { chatApi } from "./../../../axiosApi/api/chatApi";
import { base64StringToBlob } from "blob-util";
import {
  ChatContainer,
  MessageInput,
  SendButton,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import Loading from "../../LoadingPage/index";
import { useParams } from "react-router-dom";

const Chat = (props) => {
  const { setOpenSr, openSr } = props;
  const [cookies, ,] = useCookies(["auth"]);
  const inputRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [active, setActive] = useState(false);
  const [media, setMedia] = useState(false);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);
  const modalMedia = useRef(null);
  const buttonMedia = useRef(null);
  const [typing, setTyping] = useState(false);
  const socket = useRef();
  const [process, setProcess] = useState(0);
  const [msgInputValue, setMsgInputValue] = useState([]);
  const [messages, setMessages] = useState({});
  const [loading, setLoading] = useState(false);
  const [messData, setMessData] = useState("");

  useOnClickOutside(buttonRef, modalRef, () => setActive(false));
  useOnClickOutside(buttonMedia, modalMedia, () => setMedia(false));
  let { userId } = useParams();

  // useEffect(() => {
  //   document.getElementById("textAREA").focus();
  // });

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

    // #region Log Status
    socket.current.on("connect", () => {
      console.log("Connection ok !");
    });

    socket.current.on("connect_error", () => {
      console.log("connected error");
      // socket.current.io.opts.transportOptions.polling.extraHeaders.Authorization = `Bearer ${cookies.auth.tokens.access.token}`;
      // socket.current.connect();
    });

    // socket.current.emit("whoami", (data) => {
    //   console.log(data);
    // });
    //#endregion

    socket.current.on("getMessage", (data) => {
      console.log("on", data.text);
      setMessages({
        ...messages,
        content: {
          text: data.text,
        },
        conversationId: messData?.id,
        incomming: true,
        createdAt: Date.now(),
        id: Date.now(),
        sender: data.senderId,
        typeMessage: "TEXT",
      });
    });

    socket.current.on("getMedia", (data) => {
      console.log("on", data.text, " ", data.file);
      setMessages({
        ...messages,
        content: {
          text: data.text,
          file: data.file,
        },
        incomming: true,
        conversationId: messData?.id,
        createdAt: Date.now(),
        id: Date.now(),
        sender: data.senderId,
        typeMessage: data.typeMessage,
      });
    });

    socket.current.on("getIcon", (data) => {
      console.log("on", data.typeMessage);
      setMessages({
        ...messages,
        content: null,
        incomming: true,
        conversationId: messData?.id,
        createdAt: Date.now(),
        id: Date.now(),
        sender: data.senderId,
        typeMessage: data.typeMessage,
      });
    });

    socket.current.on("typing", (data) => {
      console.log("on", "typing");
      setTyping(true);
    });

    socket.current.on("untyping", (data) => {
      console.log("on", "untyping");
      setTyping(false);
    });

    socket.current.on("send-file", (data) => {
      console.log("on", "send-file");
    });
  }, []);

  useEffect(() => {
    if (userId) {
      getConverByUserId();
    }
  }, [userId]);

  useEffect(() => {
    return () => setMessages([]);
  }, []);

  const getConverByUserId = async () => {
    chatApi
      .createConver(cookies.auth.tokens.access.token, userId)
      .then((rs) => {
        console.log("RS", rs.data);
        setMessData(rs.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChatSocket = (message) => {
    console.log("socket handle");
    const onchat = {
      senderId: cookies.auth.user.id,
      receiverId: userId,
      text: message,
    };
    socket.current.emit("sendMessage", onchat);
  };

  const focusTyping = async () => {
    if (!typing && msgInputValue.length > 0) {
      const onchat = {
        senderId: cookies.auth.user.id,
        receiverId: userId,
      };
      setTimeout(() => {
        // setTyping(true);
      }, 100);
      socket.current?.emit("typing", onchat);
    }
    if (msgInputValue.length === 1) {
      setTimeout(async () => {
        await unfocusTyping();
        // setTyping(false);
      }, 100);
    }
  };

  const unfocusTyping = async () => {
    const onchat = {
      senderId: cookies.auth.user.id,
      receiverId: userId,
    };
    socket.current?.emit("untyping", onchat);
  };

  const onEmojiClick = (e, emojiObject) => {
    setMsgInputValue((prevInput) => prevInput + emojiObject.emoji);
    setActive(false);
  };

  const handleInput = (event) => {
    if (event.target.value?.length >= 2200) {
      return;
    }
    setMsgInputValue(event.target.value);
  };

  const getProcess = (progressEvent) => {
    const { loaded, total } = progressEvent;
    const percent = ((loaded / total) * 100).toFixed(2);
    setProcess(percent);
  };

  const checkDisabled = (inputText, fileMedia) => {
    if (inputText?.length >= 1 || fileMedia != null) {
      return false;
    }
    return true;
  };

  const reset = () => {
    setMsgInputValue("");
    inputRef.current.focus();
    setMedia(false);
    setSelectedImage(null);
  };

  const handleSend = (message) => {
    if (msgInputValue.length === 0 && selectedImage === null) {
      console.log("Return");
      reset();
      return;
    }
    if (msgInputValue.length > 0) {
      // console.log("Text");
      sendTextOnly();
      unfocusTyping();
      reset();
    }
    if (selectedImage != null) {
      setLoading(true);
      // console.log("File");
      sendMediaFile();
      unfocusTyping();
      reset();
    }
  };

  const press = async (event) => {
    if (event.keyCode === 13 && !event.shiftKey && msgInputValue.length === 0) {
      console.log("Return");
      event.preventDefault();
    }
    if (
      event.keyCode === 13 &&
      !event.shiftKey &&
      (msgInputValue.length > 0 || selectedImage !== null)
    ) {
      handleSend(msgInputValue);

      event.preventDefault();
    }
  };

  const imageFileHandler = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    // const x = (window.URL || window.webkitURL).createObjectURL(file);
    // console.log("tren", x);
  };

  const sendTextOnly = async () => {
    chatApi
      .createMessText(
        cookies.auth.tokens.access.token,
        messData?.id,
        msgInputValue
      )
      .then((rs) => {
        handleChatSocket(msgInputValue);
        // console.log(rs.data);
        const data = rs.data;
        setMessages({
          ...messages,
          content: data?.content,
          conversationId: messData,
          incomming: false,
          createdAt: Date.now(),
          id: data?.id,
          sender: cookies.auth.user.id,
          typeMessage: data?.typeMessage,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChatSocketMedia = (content) => {
    console.log("socket handle Media");
    const onchat = {
      senderId: cookies.auth.user.id,
      receiverId: userId,
      text: content.text,
      file: content.file,
      typeMessage: content.typeMessage,
    };
    socket.current.emit("sendMedia", onchat);
  };

  const handleChatSocketIcon = (typeMessage) => {
    console.log("socket handle Media");
    const onchat = {
      senderId: cookies.auth.user.id,
      receiverId: userId,
      text: null,
      file: null,
      typeMessage,
    };
    socket.current.emit("sendIcon", onchat);
  };

  const sendMediaFile = async () => {
    let formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("conversationId", messData?.id);
    console.log("tren1", formData.get("file"));
    console.log("tren2", formData.get("conversationId"));
    chatApi
      .createMessMedia(cookies.auth.tokens.access.token, formData, getProcess)
      .then((rs) => {
        setLoading(false);
        // console.log(rs.data);
        const data = rs.data;
        setMessages({
          ...messages,
          content: data.content,
          conversationId: messData?.id,
          incomming: false,
          createdAt: Date.now(),
          id: data?.id,
          sender: cookies.auth.user.id,
          typeMessage: data?.typeMessage,
        });
        handleChatSocketMedia(data.content);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

  const handleEmotion = async (emotion) => {
    if (emotion === "like") {
      chatApi
        .likeMess(cookies.auth.tokens.access.token, messData?.id)
        .then((data) => {
          setMessages({
            ...messages,
            conversationId: messData?.id,
            incomming: false,
            createdAt: Date.now(),
            id: data?.id,
            sender: cookies.auth.user.id,
            typeMessage: "LIKE",
          });
          handleChatSocketIcon("LIKE");
        });
    } else {
      chatApi
        .loveMess(cookies.auth.tokens.access.token, messData?.id)
        .then((data) => {
          setMessages({
            ...messages,
            conversationId: messData?.id,
            incomming: false,
            createdAt: Date.now(),
            id: data?.id,
            sender: cookies.auth.user.id,
            typeMessage: "LOVE",
          });
          handleChatSocketIcon("LOVE");
        });
    }
  };

  return (
    <>
      {userId ? (
        <>
          {/* <div className="z-50">{loading && <Loading process={process} />}</div> */}
          {loading ? (
            <>
              <div className=" bg-transparent post-show opacity-50 fixed w-full h-screen z-40 top-0 left-0 flex justify-end items-start">
                <div className=" flex justify-center items-center justify-items-center rounded-full bg-none "></div>
              </div>
              <div className="fixed  z-50 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                <div className="lds-ring flex items-center justify-center">
                  <div></div>
                  <div></div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </>
          ) : null}

          <ChatContainer>
            {/* List chat here */}
            <div as={MessageList}>
              <ListMessage
                typing={typing}
                messages={messages}
                messData={messData?.id}
                setOpenSr={setOpenSr}
                openSr={openSr}
              />
            </div>

            <div
              as={MessageInput}
              style={{
                display: "flex",
                flexDirection: "row",
                borderTop: "1px dashed #d1dbe4",
              }}
            >
              {active ? (
                <div
                  ref={modalRef}
                  className="absolute transform -translate-y-full"
                  style={{ width: "20%" }}
                >
                  <Picker onEmojiClick={onEmojiClick} />
                </div>
              ) : null}
              <div
                style={{
                  fontSize: "1.2em",
                  paddingLeft: "0.2em",
                  paddingRight: "0.2em",
                }}
                className="flex items-center"
              >
                <img
                  className="rounded w-7 h-7 cursor-pointer"
                  src={"/assets/image/emoji.png"}
                  alt="emokiimg"
                  onClick={() => setActive(!active)}
                  ref={buttonRef}
                />
              </div>

              {media && (
                <div
                  // ref={modalMedia}
                  // as={AttachmentButton}
                  style={{
                    fontSize: "1.2em",
                    paddingLeft: "0.2em",
                    paddingRight: "0.2em",
                  }}
                  className="flex items-center absolute transform translate-x-16 -translate-y-7 "
                >
                  <input
                    className="cursor-pointer font-medium  text-blue-500 text-sm "
                    type="file"
                    accept="video/*,audio/*,image/gif,image/jpeg,image/png,.gif,.jpeg,.jpg,.png"
                    onChange={imageFileHandler}
                    id="fileChoosen"
                  />
                </div>
              )}

              <div
                style={{
                  fontSize: "1.2em",
                  paddingLeft: "0.2em",
                  paddingRight: "0.2em",
                }}
                className="flex items-center"
              >
                <img
                  className="rounded w-7 h-7 cursor-pointer"
                  src={"/assets/image/attach.png"}
                  alt="emokiimg"
                  onClick={() => {
                    setSelectedImage(null);
                    setMedia(!media);
                  }}
                  // ref={buttonMedia}
                />
              </div>

              <div
                as={MessageInput}
                style={{
                  flexGrow: 2,
                  borderTop: 0,
                  flexShrink: "initial",
                }}
              >
                <textarea
                  id="textAREA"
                  cols=""
                  rows="1"
                  className="border-2 rounded-md border-gray-200 ml-1 focus:outline-none relative break-words overflow-visible  py-3 px-2 text-sm resize-none w-full mt-2 font-normal text-gray-base"
                  onChange={handleInput}
                  value={msgInputValue}
                  ref={inputRef}
                  maxLength={2200}
                  placeholder="Add a comment..."
                  type="text"
                  autoComplete="off"
                  onKeyDown={press}
                  // onFocus={focusTyping}
                  // onBlur={unfocusTyping}
                  onInput={focusTyping}
                />
              </div>

              <div
                style={{
                  fontSize: "1.2em",
                  marginLeft: "0.4em",
                  paddingLeft: "0.2em",
                  paddingRight: "0.2em",
                }}
                className="flex items-center"
              >
                <img
                  className="rounded w-7 h-7 cursor-pointer"
                  src={"/assets/image/like.png"}
                  alt="emokiimg"
                  onClick={() => handleEmotion("like")}
                />
              </div>

              <div
                style={{
                  fontSize: "1.2em",
                  marginLeft: "0.2em",
                  paddingLeft: "0.2em",
                  paddingRight: "0.2em",
                }}
                className="flex items-center"
              >
                <img
                  className="rounded w-8 h-8 cursor-pointer"
                  src={"/assets/image/heart.png"}
                  alt="emokiimg"
                  onClick={() => handleEmotion("love")}
                />
              </div>

              <SendButton
                onClick={() => handleSend(msgInputValue)}
                // disabled={msgInputValue.length === 0}
                disabled={checkDisabled(msgInputValue, selectedImage)}
                style={{
                  fontSize: "1.2em",
                  marginLeft: "0.2em",
                  paddingLeft: "0.2em",
                  paddingRight: "0.2em",
                }}
              />
            </div>
          </ChatContainer>
        </>
      ) : (
        <>
          <div className="w-full h-full flex items-center justify-center">
            <div className=" z-20 mt-10">
              <div className="flex-col items-center justify-center">
                <div className=" flex justify-center">
                  <p className=" font-avatar text-2xl">
                    Hello ! {cookies.auth.user.fullname}
                  </p>
                </div>
                <div className=" flex justify-center mb-2">
                  <p className="">
                    Send private photos and messages to a friend.
                  </p>
                </div>
                <div className=" flex">
                  <img
                    src="/assets/image/chat1.gif"
                    alt="chat1"
                    width="700"
                    height="700"
                  />
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Chat;
