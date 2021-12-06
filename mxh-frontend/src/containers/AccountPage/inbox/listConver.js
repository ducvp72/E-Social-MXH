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
import { chatApi } from "../../../axiosApi/api/chatApi";
import { SkeletonConver } from "../../../skeletons/Skeletons";
import InfititeLoading from "../../LoadingPage/infititeLoading";
import InfiniteScroll from "react-infinite-scroll-component";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { actGetMyConver } from "../../../reducers/converReducer";
import { history } from "./../../../routes/browserRouter";
import { useHistory } from "react-router";

// const SkeletonConversation = () => {
//   let arr = [];
//   for (let i = 0; i <= 10; i++) {
//     arr = [
//       ...arr,
//       <Conversation key={i}>
//         <Conversation.Content>
//           <div>
//             <SkeletonConver />
//           </div>
//         </Conversation.Content>
//       </Conversation>,
//     ];
//   }
//   return arr;
// };

const ListConver = (props) => {
  const [cookies, , removeCookie] = useCookies(["auth"]);
  const currentUser = useSelector((state) => state.auth.data);
  const currentConver = useSelector((state) => state.myconver.data);
  const [open, setOpen] = useState(false);
  const [noMore, setnoMore] = useState(true);
  const [page, setPage] = useState(2);
  const [skt, setSkt] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const { userId } = useParams();
  // console.log("userID", userId);
  const dispatch = useDispatch();
  const history = useHistory();
  // useEffect(() => {
  //   console.log("Convers", currentConver?.results);
  // }, []);

  const handleClose = () => {
    setOpen(!open);
  };

  const getFirstPageConver = async () => {
    // setConver(currentConver?.results);
    if (!currentConver?.totalResults) setNotFound(true);
    setSkt(false);
    setnoMore(true);
    setPage(2);
  };

  // const getFirstPageConver = async () => {
  //   chatApi
  //     .getConverByToken(cookies.auth.tokens.access.token, 1, 10)
  //     .then((rs) => {
  //       // console.log("Conversation", rs.data.results);
  //       setConver(rs.data.results);
  //       if (!rs.data.totalResults) setNotFound(true);
  //       setSkt(false);
  //       setnoMore(true);
  //       setPage(2);
  //     })
  //     .catch((err) => {
  //       console.log("err", err);
  //     });
  // };

  // const handleFetchConver = () => {
  //   return new Promise((resolve, reject) => {
  //     chatApi
  //       .getConverByToken(cookies.auth.tokens.access.token, page, 10)
  //       .then((rs) => {
  //         // console.log("Conversation", rs.data);
  //         setConver(rs.data);
  //         dispatch(actGetMyConver(cookies.auth.tokens.access.token, page, 10));

  //       })
  //       .catch((err) => {
  //         console.log("err", err);
  //       });
  //   });
  // };

  const fetchData = async () => {
    dispatch(actGetMyConver(cookies.auth.tokens.access.token, page, 10));
    // if (
    //   currentConver?.results.length === 0 ||
    //   currentConver?.results.length < 10
    // ) {
    //   setnoMore(true);
    // }
    setPage(page + 1);
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
        <div as="Conversation" id="scrollableDivChat">
          {/* {skt && SkeletonConversation()} */}
          {(currentConver?.results || []).length > 0 && (
            <InfiniteScroll
              scrollableTarget="scrollableDivChat"
              refreshFunction
              dataLength={currentConver?.results.length || 0}
              next={fetchData}
              hasMore={noMore}
              loader={
                <div className=" flex justify-center">
                  <InfititeLoading />
                </div>
              }
              endMessage={
                <p className="flex justify-center font-avatar text-lg">
                  <b>Opp..! No Conversations more !</b>
                </p>
              }
            >
              {currentConver &&
                currentConver?.results.map((item) => {
                  return (
                    <Link to={`/user/inbox/${item.userId}`}>
                      <Conversation
                        key={item.id}
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
                  );
                })}
            </InfiniteScroll>
          )}
          {!currentConver?.totalResults && (
            <div className="flex justify-center items-center">
              <p className="">You have no conversations</p>
            </div>
          )}
        </div>
      </ConversationList>
    </Sidebar>
  );
};

export default ListConver;
