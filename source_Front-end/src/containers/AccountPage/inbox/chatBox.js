import React, { useState, useRef, useEffect } from "react";
import { useOnClickOutside } from "./../../../utils/handleRefresh";
import Picker from "emoji-picker-react";
import { useCookies } from "react-cookie";
import { chatApi } from "./../../../axiosApi/api/chatApi";
import { actGetMyConver } from "../../../reducers/converReducer";
import {
  ChatContainer,
  MessageInput,
  SendButton,
  MessageList,
} from "@chatscope/chat-ui-kit-react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import ListMessBox from "./listMessBox";
import { actAddMessage } from "../../../reducers/messageReducer";
import LoadingMedia from "./../../LoadingPage/LoadingChat/indexMedia";
import RecordingVideo from "./Media/recordingVideo";
import RecordingAudio from "./Media/recordingAudio";
import { actRecallMessage } from "./../../../reducers/messageReducer";
import RecordingScreen from "./Media/recordingScreen";
import { toast, ToastContainer, Zoom } from "react-toastify";
import { actAddFile, actGetFileByConver } from "../../../reducers/fileReducer";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import { userApi } from "./../../../axiosApi/api/userApi";
import {
  actAddMedia,
  actGetMediaByConver,
} from "../../../reducers/mediaReducer";
import { v1 as uuid } from "uuid";
import { setWindowCall } from "../../../reducers/callReducer";

const NotifyCall = ({ notify, reject, userInfo, answerCall }) => {
  return (
    <>
      <Dialog
        open={notify}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        maxWidth="sm"
      >
        <DialogTitle id="alert-dialog-title">
          <div className="flex flex-col items-center justify-center">
            <img
              className="w-32 h-32"
              src={`https://mxhld.herokuapp.com/v1/image/${userInfo?.avatar}`}
              alt="friend"
            />

            <div className="flex">
              <p className="">{userInfo?.fullname} is calling you...</p>
            </div>

            <div className=" z-50">
              <audio autoPlay preload="auto" loop>
                <source src="/assets/image/ringtone.mp3" type="audio/ogg" />
              </audio>
            </div>

            <img
              className="w-32 h-32 object-cover"
              src="https://i.pinimg.com/originals/20/b6/86/20b6860e2f5560e6fae086a51051bdbc.gif"
              alt="callyou"
            />
          </div>
          <DialogActions>
            <div className="flex items-center justify-center gap-28">
              <Button onClick={answerCall} color="success" variant="outlined">
                Accept
              </Button>
              <Button onClick={reject} color="error" variant="outlined">
                Reject
              </Button>
            </div>
          </DialogActions>
        </DialogTitle>
      </Dialog>
    </>
  );
};

const ChatBox = (props) => {
  const { setOpenSr, openSr, socket } = props;
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
  const [process, setProcess] = useState(0);
  const [msgInputValue, setMsgInputValue] = useState([]);
  const [loading, setLoading] = useState(false);
  const [recordVideo, setRecordVideo] = useState(false);
  const [recordAudio, setRecordAudio] = useState(false);
  const [recordScreen, setRecordScreen] = useState(false);
  const [notify, setShowNotify] = useState(false);
  const [roomIder, setRoomIder] = useState(null);
  const [scroll, setScroll] = useState(Date.now());
  //Biến dùng đẻ set Nội dung tin nhắn và thêm vào mảng tin nhắn hiện có
  const [messages, setMessages] = useState({});

  //Biến dùng đề tạo tin nhăn => luu len DB
  const [messData, setMessData] = useState("");

  //Danh sach doan chat theo id lay tu redux

  const [recallMess, setRecallMess] = useState(null);
  const dispatch = useDispatch();
  let { userId } = useParams();
  useOnClickOutside(buttonRef, modalRef, () => setActive(false));
  useOnClickOutside(buttonMedia, modalMedia, () => setMedia(false));

  useEffect(() => {
    setRoomIder(roomIder);
  }, [roomIder]);

  useEffect(() => {
    if (!socket.current) return;

    // #region Log Status
    socket.current.on("connect", () => {
      console.log("Connection ok !");
    });

    socket.current.on("connect_error", () => {
      console.log("connected error");
    });
    socket.current.on("error", (err) => {
      // console.log(err);
    });

    //Nhận cuộc gọi
    socket.current.on("getCallUser", async (data) => {
      console.log("show", data);
      setRoomIder(data.roomId);
      setShowNotify(true);
    });

    // Nhận tin nhắn
    socket.current.on("getMessage", async (data) => {
      dispatch(actGetMyConver(cookies.auth.tokens.access.token, 1, 10));

      setScroll(Date.now());
      // console.log("onSender", data.senderId);
      // console.log("userId", userId);
      // console.log(userId !== data.senderId);

      if (userId !== data.senderId) return;
      dispatch(
        actAddMessage({
          content: {
            text: data.text,
          },
          conversationId: messData?.id,
          incomming: true,
          createdAt: Date.now(),
          id: data?.messageId,
          sender: data.senderId,
          typeMessage: "TEXT",
        })
      );
    });

    // Nhận hình ảnh hoặc ảnh kèm tin nhắn
    socket.current.on("getMedia", (data) => {
      // console.log("on", data.text, " ", data.file);
      setScroll(Date.now());
      if (userId !== data.senderId) return;
      dispatch(
        actAddMessage({
          content: {
            text: data.text,
            file: data.file,
          },
          incomming: true,
          conversationId: messData?.id,
          createdAt: Date.now(),
          id: data.messageId,
          sender: data.senderId,
          typeMessage: data.typeMessage,
        })
      );
      if (data.typeMessage === "DOWNLOAD") {
        dispatch(
          actAddFile({
            content: {
              text: data.text,
              file: data.file,
            },
            incomming: true,
            conversationId: messData?.id,
            createdAt: Date.now(),
            id: data.messageId,
            sender: data.senderId,
            typeMessage: data.typeMessage,
          })
        );
      } else {
        dispatch(
          actAddMedia({
            content: {
              text: "",
              file: data.file,
            },
            incomming: true,
            conversationId: messData?.id,
            createdAt: Date.now(),
            id: data.messageId,
            sender: data.senderId,
            typeMessage: data.typeMessage,
          })
        );
      }
    });
    //Thu hồi tin nhẵn
    socket.current.on(
      "getRecall",
      (data) => {
        // console.log("on", "getRecall");
        dispatch(
          actRecallMessage(
            {
              content: null,
              incomming: true,
              conversationId: messData?.id,
              createdAt: Date.now(),
              id: data?.messageId,
              sender: data.senderId,
              typeMessage: "RECALL",
            },
            data.index
          )
        );
        setTimeout(() => {
          dispatch(
            actGetFileByConver(
              cookies.auth.tokens.access.token,
              messData?.id,
              1,
              10,
              "DOWNLOAD"
            )
          );

          dispatch(
            actGetMediaByConver(
              cookies.auth.tokens.access.token,
              messData?.id,
              1,
              10,
              "MEDIA"
            )
          );
        });
      },
      4000
    );

    //Nhận Icon
    socket.current.on("getIcon", (data) => {
      // console.log("on", data.typeMessage);

      setScroll(Date.now());
      dispatch(
        actAddMessage({
          content: null,
          incomming: true,
          conversationId: messData?.id,
          createdAt: Date.now(),
          id: data?.messageId,
          sender: data.senderId,
          typeMessage: data.typeMessage,
        })
      );
    });
    // Đang gõ
    socket.current.on("typing", (data) => {
      // console.log("on", "typing");
      // console.log(idCheck, "+", data.senderId);
      if (userId === data.senderId) {
        setTyping(true);
      }
    });
    //Hết gõ
    socket.current.on("untyping", (data) => {
      if (userId === data.senderId) {
        setTyping(false);
      }
    });

    //Hiển thị recall tin nhắn theo ID
    socket.current.on("getRecall", (item) => {
      setRecallMess(item.messageId);
    });

    return () => {
      // console.log(socket.current);
      socket.current.off("getMessage");
      socket.current.off("getMedia");
      socket.current.off("typing");
      socket.current.off("untyping");
      socket.current.off("getIcon");
    };
  }, [userId, socket]);

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
        // console.log("RS", rs.data);
        setMessData(rs.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChatSocket = (message, id) => {
    // console.log("socket handle" + message + " " + id);
    const onchat = {
      senderId: cookies.auth.user.id,
      receiverId: userId,
      text: message,
      messageId: id,
    };
    socket.current.emit("sendMessage", onchat);

    setScroll(Date.now());
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

  const handleSend = async (message) => {
    if (msgInputValue.length === 0 && selectedImage === null) {
      reset();
      return;
    }
    if (msgInputValue.length > 0) {
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

    setTimeout(() => {
      dispatch(actGetMyConver(cookies.auth.tokens.access.token, 1, 10));
    }, 2000);
  };

  const press = async (event) => {
    if (event.keyCode === 13 && !event.shiftKey && msgInputValue.length === 0) {
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
    let file_size = event.target.files[0]?.size;
    if (file_size > 500000000) {
      console.log("size", file_size);
      toast.error(`File size under 500000000`, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2000,
        hideProgressBar: true,
      });
      setSelectedImage(null);
      document.getElementById("fileChoosen").value = "";
    } else {
      const file = event.target.files[0];
      setSelectedImage(file);
    }

    // const x = (window.URL || window.webkitURL).createObjectURL(file);
  };

  const sendTextOnly = async () => {
    chatApi
      .createMessText(
        cookies.auth.tokens.access.token,
        messData?.id,
        msgInputValue
      )
      .then((rs) => {
        handleChatSocket(rs.data?.content.text, messData?.id);

        dispatch(
          actAddMessage({
            content: rs.data?.content,
            conversationId: messData?.id,
            incomming: false,
            createdAt: Date.now(),
            id: rs?.data?.id,
            sender: cookies.auth.user.id,
            typeMessage: rs?.data?.typeMessage,
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChatSocketMedia = (data) => {
    const onchat = {
      senderId: cookies.auth.user.id,
      receiverId: userId,
      text: data.content.text,
      file: data.content.file,
      typeMessage: data.typeMessage,
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

    setScroll(Date.now());
  };

  const sendMediaBlood = async () => {
    // const blob = await dataURItoBlob(selectedImage);
    console.log("ok", selectedImage?.type);
    let filex;
    if (selectedImage) {
      if (selectedImage?.type === "video/mp4") {
        filex = new File([selectedImage], "nameFile.mp4", {
          type: "video/mp4",
        });
      } else {
        filex = new File([selectedImage], "nameFile.mp3", {
          type: "audio/mp3",
        });
      }
      var formData = new FormData();
      console.log("ok2", filex);
      formData.append("file", filex);
      formData.append("conversationId", messData?.id);
      chatApi
        .createMessMedia(cookies.auth.tokens.access.token, formData, getProcess)
        .then((rs) => {
          setLoading(false);
          console.log("ImgSend", rs.data.typeMessage);
          const value = {
            content: {
              text: Date.now(),
              file: rs.data.content.file,
            },
            conversationId: messData?.id,
            incomming: false,
            createdAt: Date.now(),
            id: rs.data?.id,
            sender: cookies.auth.user.id,
            typeMessage: rs.data?.typeMessage,
          };
          dispatch(actAddMessage(value));
          handleChatSocketMedia(value);

          setScroll(Date.now());
        })
        .catch((err) => {
          setLoading(false);
          console.log(err);
        });
      setScroll(Date.now());
    } else {
      console.log("TRY AGIAN");
    }
  };

  const sendMediaFile = async () => {
    let formData = new FormData();
    formData.append("file", selectedImage);
    formData.append("conversationId", messData?.id);
    chatApi
      .createMessMedia(cookies.auth.tokens.access.token, formData, getProcess)
      .then((rs) => {
        setLoading(false);

        const value = {
          content: rs.data.content,
          conversationId: messData?.id,
          incomming: false,
          createdAt: Date.now(),
          id: rs.data?.id,
          sender: cookies.auth.user.id,
          typeMessage: rs.data?.typeMessage,
        };
        dispatch(actAddMessage(value));

        if (value?.typeMessage === "DOWNLOAD") {
          dispatch(actAddFile(value));
        } else {
          dispatch(actAddMedia(value));
        }

        handleChatSocketMedia(value);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
    setScroll(Date.now());
  };

  const handleEmotion = async (emotion) => {
    if (emotion === "like") {
      chatApi
        .likeMess(cookies.auth.tokens.access.token, messData?.id)
        .then((rs) => {
          dispatch(
            actAddMessage({
              conversationId: messData?.id,
              incomming: false,
              createdAt: Date.now(),
              id: rs?.data.id,
              sender: cookies.auth.user.id,
              typeMessage: "LIKE",
            })
          );
          handleChatSocketIcon("LIKE");
        });
    } else {
      chatApi
        .loveMess(cookies.auth.tokens.access.token, messData?.id)
        .then((rs) => {
          dispatch(
            actAddMessage({
              conversationId: messData?.id,
              incomming: false,
              createdAt: Date.now(),
              id: rs?.data.id,
              sender: cookies.auth.user.id,
              typeMessage: "LOVE",
            })
          );
          handleChatSocketIcon("LOVE");
        });
    }

    setScroll(Date.now());
  };

  const answerCall = () => {
    const onchat = {
      senderId: cookies.auth.user.id,
      receiverId: userId,
    };
    socket.current.emit("answerCall", onchat);
    setShowNotify(false);
    handleCall();
  };

  const reject = () => {
    const onchat = {
      senderId: cookies.auth.user.id,
      receiverId: userId,
    };
    socket.current.emit("rejectCall", onchat);
    setShowNotify(false);
  };

  const handleCall = (w, h) => {
    const left = window.screen.width / 2 - w / 2;
    const top = window.screen.height / 2 - h / 2;
    let callPopup = window.open(
      `/contact/videocall/${roomIder}`,
      `ContactDirect`,
      `toolbar=no, location=no, directories=no, 
          status=no, menubar=no, scrollbars=no,
         resizable=no, copyhistory=no, 
         width=${w}, height=${h}, top=${
        top - 50
      }, left=${left}, alwaysRaised=yes`
    );
    dispatch(setWindowCall({ show: true, check: callPopup }));
  };

  const [userInfo, setUserInfo] = useState(null);
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
      <NotifyCall
        notify={notify}
        reject={reject}
        userInfo={userInfo}
        answerCall={answerCall}
      />
      ;
      {userId ? (
        <>
          <ToastContainer transition={Zoom} />
          <ChatContainer>
            {/* List chat here */}
            <div as={MessageList}>
              <ListMessBox
                typing={typing}
                messages={messages}
                messData={messData?.id}
                setMessData={setMessData}
                setOpenSr={setOpenSr}
                openSr={openSr}
                socket={socket}
                recallMess={recallMess}
                scroll={scroll}
              />
              {/* <div className=" flex items-center justify-center bg-gray-400"> */}
              <div className="w-full" style={{ height: "10px" }}>
                {loading && <LoadingMedia process={process} />}
                {/* <LoadingMedia process={process} /> */}
              </div>
              <RecordingVideo
                open={recordVideo}
                onClose={() => setRecordVideo(false)}
                setSelectedImage={setSelectedImage}
                selectedImage={setSelectedImage}
                sendMediaBlood={sendMediaBlood}
              />
              <RecordingAudio
                open={recordAudio}
                onClose={() => setRecordAudio(false)}
                setSelectedImage={setSelectedImage}
                selectedImage={setSelectedImage}
                sendMediaBlood={sendMediaBlood}
              />
              <RecordingScreen
                open={recordScreen}
                onClose={() => setRecordScreen(false)}
                setSelectedImage={setSelectedImage}
                selectedImage={setSelectedImage}
                sendMediaBlood={sendMediaBlood}
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
                    // accept="video/*,audio/*,image/gif,image/jpeg,image/png,.gif,.jpeg,.jpg,.png"
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
                  alt="emoji"
                  onClick={() => {
                    setSelectedImage(null);
                    setMedia(!media);
                  }}
                  // ref={buttonMedia}
                />
              </div>

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
                  src={"/assets/image/mic.png"}
                  alt="record"
                  onClick={() => {
                    setRecordAudio(true);
                  }}
                />
              </div>

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
                  src={"/assets/image/video.png"}
                  alt="video"
                  onClick={() => {
                    setRecordVideo(true);
                  }}
                  // ref={buttonMedia}
                />
              </div>

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
                  src={"/assets/image/present.png"}
                  alt="video"
                  onClick={() => {
                    setRecordScreen(true);
                  }}
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
                  onFocus={focusTyping}
                  onBlur={unfocusTyping}
                  // onInput={focusTyping}
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
export default ChatBox;
