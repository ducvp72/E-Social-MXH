import React, { useState, useRef, useEffect } from "react";
import ListMessage from "./listMessage";
import { useOnClickOutside } from "./../../../utils/handleRefresh";
import Picker from "emoji-picker-react";
import { SideBarChatRight } from "./sideBarChatRight";
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
  InputToolbox,
} from "@chatscope/chat-ui-kit-react";

const Chat = (props) => {
  const [openSr, setOpenSr] = useState(true);
  const inputRef = useRef();
  const [msgInputValue, setMsgInputValue] = useState("");
  const [messages, setMessages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [userImage, setUserImage] = useState();
  const [active, setActive] = useState(false);
  const [media, setMedia] = useState(false);
  const modalRef = useRef(null);
  const buttonRef = useRef(null);
  const modalMedia = useRef(null);
  const buttonMedia = useRef(null);

  useEffect(() => {
    document.getElementById("textAREA").focus();
  });

  useEffect(() => {
    // console.log("userImage", userImage);
    // console.log("Check", checkDisabled());
    // console.log("selectedImage", selectedImage);
    // return () => {
    //   userImage && URL.revokeObjectURL(userImage);
    //   setSelectedImage(null);
    // };
  }, [selectedImage, userImage]);

  useOnClickOutside(buttonRef, modalRef, () => setActive(false));
  useOnClickOutside(buttonMedia, modalMedia, () => setMedia(false));

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

  const handleSend = (message) => {
    let formData = new FormData();
    formData.append("text", msgInputValue);
    formData.append("file", selectedImage);
    console.log("texts", formData.get("text"));
    console.log("files", formData.get("file"));

    if (msgInputValue.length === 0) {
      return;
    }

    setMessages([
      ...messages,
      {
        message,
        direction: "outgoing",
      },
    ]);
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
      handleSend(event.target.value);
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
            onSend={handleSend}
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
              onClick={() => setActive(!active)}
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
              onClick={() => setActive(!active)}
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
