import React, { useState, useRef, useEffect } from "react";
import ListMessage from "./listMessage";
import { useOnClickOutside } from "./../../../utils/handleRefresh";
import Picker from "emoji-picker-react";
import { SideBarChatRight } from "./sideBarChatRight";
import { useCookies } from "react-cookie";
import { io } from "socket.io-client";
import { chatApi } from "./../../../axiosApi/api/chatApi";
import {
  ChatContainer,
  MessageInput,
  Avatar,
  ConversationHeader,
  EllipsisButton,
  VideoCallButton,
  VoiceCallButton,
  SendButton,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import Loading from "../../LoadingPage/index";
import { useParams } from "react-router-dom";

const Chat = (props) => {
  const [cookies, ,] = useCookies(["auth"]);
  const [openSr, setOpenSr] = useState(true);
  const inputRef = useRef();
  const [selectedImage, setSelectedImage] = useState(null);
  const [userImage, setUserImage] = useState();
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

  useEffect(() => {
    document.getElementById("textAREA").focus();
  });

  useEffect(() => {
    socket.current = io("https://mxhld.herokuapp.com/", {
      // transports: ["websocket", "polling"],
      pingTimeout: 60000,
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${cookies.auth.tokens.access.token}`,
          },
        },
      },
    });

    //#region Log Status
    socket.current.on("connect", () => {
      console.log("Connection ok !");
    });

    // socket.current.on("connect_error", () => {
    //   console.log("connected error");
    //   // socket.current.io.opts.transportOptions.polling.extraHeaders.Authorization = `Bearer ${cookies.auth.tokens.access.token}`;
    //   // socket.current.connect();
    // });

    // socket.current.emit("whoami", (data) => {
    //   console.log(data);
    // });
    //#endregion

    socket.current.on("getMessage", (data) => {
      console.log("on", data.text);
      setMessages({
        ...messages,
        content: data.content,
        conversationId: messData,
        incomming: true,
        createdAt: Date.now(),
        id: Date.now(),
        sender: data.senderId,
        typeMessage: "TEXT",
      });
    });

    socket.current.on("getMedia", (data) => {
      console.log("on", data.text);
      setMessages({
        ...messages,
        content: data.content,
        incomming: true,
        conversationId: messData,
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
    getConverByUserId();
  }, [userId]);

  useEffect(() => {
    return () => setMessages([]);
  }, []);

  const getConverByUserId = async () => {
    chatApi
      .createConver(cookies.auth.tokens.access.token, userId)
      .then((rs) => {
        console.log("RS", rs.data);
        setMessData(rs.data.id);
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
        receiverId: "61ab0f520011d000240f9a3d",
      };
      setTimeout(() => {
        setTyping(true);
      }, 100);
      socket.current?.emit("typing", onchat);
    }
    if (msgInputValue.length === 1) {
      setTimeout(async () => {
        await unfocusTyping();
        setTyping(false);
      }, 100);
    }
  };

  const unfocusTyping = async () => {
    const onchat = {
      senderId: cookies.auth.user.id,
      receiverId: "61ab0f520011d000240f9a3d",
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
      reset();
    }
    if (selectedImage != null) {
      setLoading(true);
      // console.log("File");
      sendMediaFile();
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
    // setUserImage(window.URL.createObjectURL(event.target.files[0]));
    // setUserImage(
    //   (window.URL || window.webkitURL).createObjectURL(event.target.files[0])
    // );
  };

  const checkDisabled = (inputText, fileMedia) => {
    if (inputText?.length >= 1 || fileMedia != null) {
      return false;
    }
    return true;
  };

  const sendTextOnly = async () => {
    chatApi
      .createMessText(cookies.auth.tokens.access.token, messData, msgInputValue)
      .then((rs) => {
        handleChatSocket(msgInputValue);
        console.log(rs.data);
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

  const getProcess = (progressEvent) => {
    const { loaded, total } = progressEvent;
    const percent = ((loaded / total) * 100).toFixed(2);
    setProcess(percent);
  };

  const sendMediaFile = async () => {
    let formData = new FormData();
    // formData.append("text", msgInputValue);
    formData.append("file", selectedImage);
    formData.append("conversationId", messData);
    chatApi
      .createMessMedia(cookies.auth.tokens.access.token, formData, getProcess)
      .then((rs) => {
        setLoading(false);
        console.log(rs.data);
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

  return (
    <>
      <div className="z-50"> {loading && <Loading process={process} />}</div>
      <ChatContainer>
        <ConversationHeader>
          <ConversationHeader.Back />
          <Avatar
            src="/assets/image/defaultAvatar.png"
            status="available"
            name="Zoe"
          />
          <ConversationHeader.Content
            userName="Zoe"
            info="Active 10 mins ago"
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

        {/* List chat here */}
        <div as={MessageList}>
          <ListMessage messages={messages} messData={messData} />
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
      {openSr && <SideBarChatRight />}
    </>
  );
};
export default Chat;
