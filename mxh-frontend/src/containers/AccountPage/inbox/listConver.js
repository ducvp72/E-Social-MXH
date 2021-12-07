import React, { useState, useEffect } from "react";
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
  const [cookies, ,] = useCookies(["auth"]);
  const currentUser = useSelector((state) => state.auth.data);
  const currentConver = useSelector((state) => state.myconver.data);
  const totalFromRedux = useSelector((state) => state.myconver.totalPages);
  const resultsFromRedux = useSelector((state) => state.myconver.totalResults);
  const loadingRedux = useSelector((state) => state.myconver.loading);
  const [open, setOpen] = useState(false);
  const [noMore, setnoMore] = useState(true);
  const [page, setPage] = useState(2);
  const [skt, setSkt] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { userId } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {}, []);

  useEffect(() => {
    console.log("CurrentConver", totalFromRedux);
    console.log("resultsFromRedux", resultsFromRedux);
    console.log("loadingRedux", resultsFromRedux);
    if (resultsFromRedux === 0) setNotFound(true);
    setSkt(false);
  }, []);

  const handleClose = () => {
    setOpen(!open);
  };

  const fetchData = async () => {
    console.log("Fetch");
    dispatch(actLoadMore(cookies.auth.tokens.access.token, page, 10));
    // if (currentConver?.length === 0 || currentConver?.length < 10)
    if (totalFromRedux >= page) {
      setnoMore(false);
    }
    setPage(page + 1);
  };
  console.log("noMore", noMore);

  // const sktLoad = () => {
  //   if (resultsFromRedux === 0) {
  //     setSkt(false);
  //   }
  // };

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

            {(currentConver || []).length > 0 && (
              <InfiniteScroll
                scrollableTarget="scrollableDiv"
                refreshFunction
                dataLength={currentConver?.length || 0}
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
                  <p className="flex justify-center font-avatar text-lg">
                    <b>Opp..! No Conversations more !</b>
                  </p>
                }
              >
                {currentConver &&
                  currentConver?.map((item, index) => {
                    return (
                      <div key={index}>
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
                              src={`https://mxhld.herokuapp.com/v1/image/${item?.avatar}`}
                              name={item?.fullname}
                              status="available"
                            />
                            <Conversation.Content
                              name={item?.fullname}
                              info={item?.lastMessage?.content?.text}
                            />
                            <Conversation.Operations
                              onClick={() => alert("option")}
                            />
                          </Conversation>
                        </Link>
                      </div>
                    );
                  })}
              </InfiniteScroll>
            )}
            {notFound && (
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
