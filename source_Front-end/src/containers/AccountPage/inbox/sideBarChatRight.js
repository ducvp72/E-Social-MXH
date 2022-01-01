import React, { useState, useEffect } from "react";
import { Sidebar, ExpansionPanel } from "@chatscope/chat-ui-kit-react";
import { styles } from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import Dropdown from "@material-tailwind/react/Dropdown";
import DropdownItem from "@material-tailwind/react/DropdownItem";
import DropdownLink from "@material-tailwind/react/DropdownLink";
import AddMoreUser from "./addMoreUser";
import ChangeNameChat from "./changeNameChat";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";
import { actLoadMoreFile } from "./../../../reducers/fileReducer";
import { useCookies } from "react-cookie";
import "./styles.css";
import { actLoadMoreMedia } from "./../../../reducers/mediaReducer";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

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

export const SideBarChatRight = () => {
  const [open, setOpen] = useState(false);
  const [cookies, ,] = useCookies(["auth"]);
  const [openChangeName, setOpenChangeName] = useState(false);
  const currentFile = useSelector((state) => state.fileConver);
  const currentMedia = useSelector((state) => state.mediaConver);
  const [popup, setPopup] = useState(false);
  const [temp, setTemp] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    setTemp(temp);
  }, [temp]);

  // useEffect(() => {
  //   console.log("currentFile", currentFile);
  //   console.log("currentMedia", currentMedia);
  // }, [currentMedia]);

  const handleClose = () => {
    setOpen(!open);
  };
  const handleCloseChangeName = () => {
    setOpenChangeName(!openChangeName);
  };

  const fetchData = async () => {
    console.log("NextFetch");
    dispatch(
      actLoadMoreFile(
        cookies.auth.tokens.access.token,
        currentFile?.data[0]?.conversationId,
        currentFile?.pageNext,
        10,
        "DOWNLOAD"
      )
    );
  };

  const fetchMedia = async () => {
    console.log("NextFetchMedia");
    dispatch(
      actLoadMoreMedia(
        cookies.auth.tokens.access.token,
        currentFile?.data[0]?.conversationId,
        currentFile?.pageNext,
        10,
        "MEDIA"
      )
    );
  };

  const checkFile = (item) => {
    if (currentMedia) {
      if (item?.typeMessage === "IMAGE") {
        return (
          <>
            <div
              className="flex  items-center justify-center cursor-pointer"
              style={{ border: "1px solid #efefef" }}
            >
              <img
                src={`https://mxhld.herokuapp.com/v1/file/${item?.content.file}`}
                alt="userpost"
                className="w-full object-cover h-full"
                // style={{
                //   height: " 250px",
                // }}
              />
            </div>
          </>
        );
      }
      if (item?.typeMessage === "VIDEO") {
        return (
          <div className="flex  items-center justify-center object-cover cursor-pointer bg-black ">
            <video className="outline-none h-full w-full " controls>
              <source
                src={`https://mxhld.herokuapp.com/v1/file/${item?.content.file}`}
              />
            </video>
          </div>
        );
      }
      if (item?.typeMessage === "AUDIO") {
        return (
          <div className=" items-center justify-center cursor-pointer">
            <img
              src="/assets/image/audio.png"
              className="h-full w-full"
              alt="nocaption"
            />
          </div>
        );
      }
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
    <Sidebar position="right">
      {<MediaDetail item={temp} popup={popup} handleCloses={handleCloses} />}
      <ChangeNameChat
        openChangeName={openChangeName}
        handleCloseChangeName={handleCloseChangeName}
      />
      <AddMoreUser open={open} handleClose={handleClose} />

      <ExpansionPanel title="Media" className="text-2xl">
        <div
          style={{
            height: `${currentMedia?.data?.length <= 0 ? `100%` : `350px`}`,
          }}
          className="post-show overflow-y-auto overflow-x-hidden cursor-pointer rounded text-blue-600  "
          id="scrollableDivMedia"
        >
          {/* {skt && SkeletonConversation()} */}

          {(currentMedia?.data || []).length > 0 && (
            <InfiniteScroll
              scrollableTarget="scrollableDivMedia"
              refreshFunction
              dataLength={currentMedia?.data.length || 0}
              next={fetchMedia}
              hasMore={currentMedia.more}
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
                  {/* <b>Opp..! No Conversations more !</b> */}
                </p>
              }
            >
              <div className="grid grid-cols-3 xl:gap-4 gap-2 lg:gap-4 p-2 md:gap-4">
                {currentMedia?.data &&
                  currentMedia?.data.map((item, index) => {
                    return (
                      <div
                        key={index}
                        onClick={() => {
                          handleClickOpens();
                          setTemp(item);
                        }}
                        className=" relative"
                      >
                        <div className="bg-none h-full w-full top-0 left-0 opacity-50 absolute z-10 " />
                        {checkFile(item)}
                      </div>
                    );
                  })}
              </div>
            </InfiniteScroll>
          )}
          {currentMedia?.data?.length <= 0 && (
            <div className="flex justify-center items-center text-gray-500 text-md font-avatar">
              <p className="">You have no file</p>
            </div>
          )}
        </div>
      </ExpansionPanel>
      {/* File DownLoad */}
      <ExpansionPanel title="File" className="text-2xl p-0">
        <div
          style={{
            height: `${currentFile?.data?.length <= 0 ? `100%` : `350px`}`,
          }}
          className="post-show overflow-y-auto overflow-x-hidden cursor-pointer rounded text-blue-600  "
          id="scrollableDivFile"
        >
          {/* {skt && SkeletonConversation()} */}

          {(currentFile?.data || []).length > 0 && (
            <InfiniteScroll
              scrollableTarget="scrollableDivFile"
              refreshFunction
              dataLength={currentFile?.data.length || 0}
              next={fetchData}
              hasMore={currentFile.more}
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
                  {/* <b>Opp..! No Conversations more !</b> */}
                </p>
              }
            >
              {currentFile?.data &&
                currentFile?.data.map((item, index) => {
                  return (
                    <div
                      key={index}
                      onClick={() => {
                        window.open(
                          `https://mxhld.herokuapp.com/v1/file/${item?.content.file}`,
                          "_blank"
                        );
                      }}
                    >
                      <p className=" font-normal text-base p-2 hover:opacity-80 hover:bg-gray-200">
                        {item?.content.text}
                      </p>
                    </div>
                  );
                })}
            </InfiniteScroll>
          )}

          {currentFile?.data?.length <= 0 && (
            <div className="flex justify-center items-center text-gray-500 text-md font-avatar">
              <p className="">You have no file</p>
            </div>
          )}
        </div>
      </ExpansionPanel>
      <ExpansionPanel
        title="Options (will be update its to next version, it's just UI)"
        className="text-2xl"
      >
        <div className=" cursor-pointer rounded  hover:bg-gray-200 hover:opacity-80">
          <div className="flex items-center gap-2 text-gray-600">
            <i className="fas fa-trash ml-1"></i>
            <p className=" font-medium text-base p-2">Delete</p>
          </div>
        </div>
        <div className=" cursor-pointer rounded  hover:bg-gray-200 hover:opacity-80">
          <div className="flex items-center gap-2 text-gray-600">
            <i className="fas fa-minus-circle ml-1"></i>
            <p className=" font-medium text-base p-2">Block</p>
          </div>
        </div>
        <div className=" cursor-pointer rounded  hover:bg-gray-200 hover:opacity-80">
          <div className="flex items-center gap-2 text-gray-600">
            <i className="fas fa-exclamation-triangle ml-1"></i>
            <p className=" font-medium text-base p-2">Report</p>
          </div>
        </div>
        <div className=" cursor-pointer rounded  hover:bg-gray-200 hover:opacity-80">
          <div className="flex items-center gap-2 text-gray-600">
            <i className="fas fa-sign-out-alt ml-1" />
            <p className=" font-medium text-base p-2">Leave Group</p>
          </div>
        </div>
      </ExpansionPanel>
    </Sidebar>
  );
};
