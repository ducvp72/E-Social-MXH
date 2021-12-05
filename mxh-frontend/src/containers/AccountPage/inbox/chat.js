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
  AttachmentButton,
  SendButton,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import { date } from "yup";

const Chat = (props) => {
  const [cookies, , removeCookie] = useCookies(["auth"]);
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

  useOnClickOutside(buttonRef, modalRef, () => setActive(false));
  useOnClickOutside(buttonMedia, modalMedia, () => setMedia(false));

  // useEffect(() => {
  //   document.getElementById("textAREA").focus();
  // });

  useEffect(() => {
    return () => setMessages([]);
  }, []);

  const handleChatSocket = (message) => {
    const onchat = {
      senderId: cookies.auth.user.id,
      receiverId: "61ab0f520011d000240f9a3d",
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

  // const getMess = async (idConver) => {
  //   chatApi
  //     .getMessByIdConver(
  //       cookies.auth.tokens.access.token,
  //       "61a86e9b7b73519cfa85890b",
  //       1,
  //       5
  //     )
  //     .then((rs) => {
  //       console.log("Mess", rs.data);
  //       setMess(rs.data);
  //     })
  //     .then((err) => {
  //       console.log(err);
  //     });
  // };

  const handleSend = (message) => {
    // console.log("-----------------------------");
    // console.log("Chat", msgInputValue);
    // console.log("-----------------------------");
    // let formData = new FormData();
    // formData.append("text", message);
    // formData.append("file", selectedImage);

    // console.log("texts", formData.get("text"));
    // console.log("files", formData.get("file"));
    if (msgInputValue.length === 0) {
      return;
    }
    // if (selectedImage != null && msgInputValue.length > 0 )
    sendMediaFile();
    // setMessages({
    //   ...messages,
    //   content: message,
    //   conversationId: "61a86e9b7b73519cfa85890b",
    //   createdAt: Date.now(),
    //   id: Date.now(),
    //   sender: cookies.auth.user.id,
    // });

    // handleChatSocket(message);
    setMsgInputValue("");
    inputRef.current.focus();
    setMedia(false);
    setSelectedImage(null);
  };

  const press = async (event) => {
    if (event.keyCode === 13 && !event.shiftKey && msgInputValue.length === 0) {
      event.preventDefault();
    }
    if (event.keyCode === 13 && !event.shiftKey && msgInputValue.length > 0) {
      // handleChatSocket(msgInputValue);
      handleSend(msgInputValue);
      event.preventDefault();
    }
  };

  const imageFileHandler = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
    // setUserImage(window.URL.createObjectURL(event.target.files[0]));
    setUserImage(
      (window.URL || window.webkitURL).createObjectURL(event.target.files[0])
    );
  };

  const checkDisabled = (inputText, fileMedia) => {
    if (inputText?.length >= 1 || fileMedia != null) {
      return false;
    }
    return true;
  };

  const sendTextOnly = (id) => {
    chatApi
      .createMessText(cookies.auth.tokens.access.token, id, msgInputValue)
      .then((rs) => {
        console.log(rs.data);
        const data = rs.data;
        setMessages({
          ...messages,
          content: data?.content,
          conversationId: "61a86e9b7b73519cfa85890b",
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

  const sendMediaFile = () => {
    let formData = new FormData();
    // formData.append("text", msgInputValue);
    formData.append("file", selectedImage);
    formData.append("conversationId", "61a86e9b7b73519cfa85890b");
    chatApi
      .createMessMedia(cookies.auth.tokens.access.token, formData)
      .then((rs) => {
        console.log(rs.data);
        const data = rs.data;
        setMessages({
          ...messages,
          content: data?.content,
          conversationId: "61a86e9b7b73519cfa85890b",
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
          <ListMessage messages={messages} />
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
              as={AttachmentButton}
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
              onClick={() => setMedia(!media)}
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
