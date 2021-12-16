import React, { useState, useEffect, useRef } from "react";
import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux";
import {
  Sidebar,
  Search,
  Status,
  ConversationList,
  Conversation,
  Avatar,
} from "@chatscope/chat-ui-kit-react";
import AddUserChat from "./addUser";
import { SkeletonConver } from "../../../skeletons/Skeletons";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { actLoadMore } from "./../../../reducers/converReducer";
import { actGetMess } from "./../../../reducers/messageReducer";
import { io } from "socket.io-client";

const SkeletonConversation = () => {
  let arr = [];
  for (let i = 0; i <= 10; i++) {
    arr = [
      ...arr,
      <Conversation key={i}>
        <Conversation.Content>
          <div>
            <SkeletonConver />
          </div>
        </Conversation.Content>
      </Conversation>,
    ];
  }
  return arr;
};

const ListConver = (props) => {
  const { socket } = props;
  const [cookies, ,] = useCookies(["auth"]);
  const currentUser = useSelector((state) => state.auth.data);
  const currentConvers = useSelector((state) => state.myconver);
  const [open, setOpen] = useState(false);
  const [noMore, setnoMore] = useState(true);
  const [skt, setSkt] = useState(true);
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [online, setOnline] = useState([]);

  useEffect(() => {
    socket?.current?.on("online", (users) => {
      console.log("ArrUser", users);
      setOnline(users);
    });

    socket?.current?.on("error", (err) => {
      console.log(err);
    });
  }, [socket]);

  useEffect(() => {
    console.log("LIST", currentConvers);
    let result = currentConvers?.data.map((a) => a.userId);
    socket.current?.emit("online", { users: result });
  }, [currentConvers]);

  useEffect(() => {
    if (currentConvers?.data.length > 0) {
      // setSkt(false);
      checkResults();
    } else {
      ifNull();
    }
    return () => {
      clearTimeout(ifNull());
    };
  }, []);

  const dataFrom = async () => {
    const check = currentConvers?.totalResults;
    return check;
  };

  const ifNull = async () => {
    setTimeout(() => {
      setSkt(false);
    }, 500);
  };

  const checkResults = async () => {
    const flag = await dataFrom();
    if (flag > 0) {
      setSkt(false);
    }
    return;
  };

  const handleClose = () => {
    setOpen(!open);
  };

  const fetchData = async () => {
    console.log("NextFetch");
    dispatch(
      actLoadMore(
        cookies.auth.tokens.access.token,
        currentConvers?.pageNext,
        10
      )
    );
    // console.log("NextFetch", currentConvers);
    if (currentConvers?.next?.length < 10) {
      setnoMore(false);
    }
    // setPage(page + 1);
  };

  const getIdConverRedux = (converId) => {
    dispatch(actGetMess(cookies.auth.tokens.access.token, converId));
  };

  return (
    <Sidebar position="left" scrollable={true}>
      <AddUserChat open={open} handleClose={handleClose} />
      <div className="grid grid-cols-6 mt-2 mb-2">
        <div className="flex col-start-2 col-span-4 justify-center items-center gap-2">
          <Status status="available" className="cursor-pointer" />
          <p className="font-medium cursor-pointer">{currentUser?.fullname}</p>
        </div>
        <div className=" flex justify-end mr-2 items-center">
          <i
            onClick={() => {
              handleClose();
            }}
            className="far fa-lg fa-edit cursor-pointer"
          ></i>
        </div>
      </div>
      <Search placeholder="Search..." />
      <ConversationList>
        <div as="Conversation">
          <div
            id="scrollableDiv"
            className="post-show overflow-y-auto"
            style={{ height: "35rem" }}
          >
            {skt && SkeletonConversation()}

            {(currentConvers?.data || []).length > 0 && (
              <InfiniteScroll
                scrollableTarget="scrollableDiv"
                refreshFunction
                dataLength={currentConvers?.data.length || 0}
                next={fetchData}
                hasMore={noMore}
                loader={
                  <div className=" flex justify-center">
                    <div className="lds-ring flex items-center justify-center">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                    </div>
                  </div>
                }
                endMessage={
                  <p className="flex justify-center font-thin text-base">
                    <b>Opp..! No Conversations more !</b>
                  </p>
                }
              >
                {currentConvers?.data &&
                  currentConvers?.data.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => getIdConverRedux(item.id)}
                      >
                        <Link to={`/user/inbox/${item.userId}`}>
                          <Conversation
                            lastActivityTime={moment(
                              item?.lastMessage?.createdAt
                            ).fromNow()}
                            className={
                              item.userId === userId
                                ? "bg-blue-100 hover:bg-blue-100 "
                                : ""
                            }
                          >
                            <Avatar
                              src={`https://mxhld.herokuapp.com/v1/image/${
                                item?.id === cookies.auth.user.id
                                  ? currentUser?.avatar
                                  : item?.avatar
                              }`}
                              name={item?.fullname}
                              status={online[index] ? "available" : "invisible"}
                            />
                            <Conversation.Content
                              name={
                                item?.id === cookies.auth.user.id
                                  ? currentUser?.fullname
                                  : item?.fullname
                              }
                              info={item?.lastMessage?.content?.text}
                            />
                            <Conversation.Operations />
                          </Conversation>
                        </Link>
                      </div>
                    );
                  })}
              </InfiniteScroll>
            )}

            {/* {!notFound && (
              <div className="flex justify-center items-center">
                <p className="">Loading....</p>
              </div>
            )} */}

            {currentConvers?.data?.length <= 0 && !skt && (
              <div className="flex justify-center items-center">
                <p className="">You have no conversations</p>
              </div>
            )}
          </div>
        </div>
      </ConversationList>
    </Sidebar>
  );
};

export default ListConver;
