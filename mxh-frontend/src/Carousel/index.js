import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import AddCommentCrs from "./addComment-Crs";
import { ActionCrs } from "./actionCrs";
import CaptionCrs from "./captionCrs";
import { ListCommentCrs } from "./listCommentCrs";
import { SkeletonImagePostProfile } from "../skeletons/Skeletons";
import moment from "moment";
import DialogActionPost from "./../components/post/dialogAction";
import { useSelector, useDispatch } from "react-redux";
import { setDialogCloseAll } from "../reducers/changePostDialog";
import { setDialogAction } from "./../reducers/changePostDialog";
const CarouselElement = (props) => {
  const { setPopup, popup, item, otherItem, getUserPost, getSummary } = props;
  const [comment, setComment] = useState({ text: "", realtime: null });
  const [state, setState] = useState();
  const [skt, setSkt] = useState(true);
  const [action, setAction] = useState(false);
  const actionCurrent = useSelector((state) => state.changePost);
  const dispatch = useDispatch();
  useEffect(() => {
    checkState();
    cancleShow();
    return () => {
      setState(null);
      clearTimeout(cancleShow);
    };
  }, []);

  const cancleShow = () => {
    setTimeout(() => {
      setSkt(false);
    }, 500);
  };

  const onClose = () => {
    setAction(false);
    // dispatch(setDialogCloseAll());
  };

  const checkState = () => {
    if (item) {
      setState(item);
    } else {
      setState(otherItem);
    }
  };

  const checkFile = () => {
    if (state) {
      if (state?.fileTypes === "IMAGE") {
        return (
          <div className="flex justify-center h-full">
            <img
              src={`https://mxhld.herokuapp.com/v1/file/${state?.file}`}
              alt="userpost"
              className="w-full object-cover "
            />
          </div>
        );
      }
      if (state?.fileTypes === "VIDEO") {
        return (
          <div
            style={{ border: "1px solid #91a3b0" }}
            className="flex justify-center bg-black "
          >
            <video
              style={{
                height: "550px",
              }}
              className="w-full focus:outline-none"
              controls
            >
              <source
                src={`https://mxhld.herokuapp.com/v1/file/${state?.file}`}
              />
            </video>
          </div>
        );
      }
      if (state?.fileTypes === "AUDIO") {
        return (
          <div className="flex h-full justify-center items-center bg-gradient-to-r from-green-400 via-yellow-500 to-pink-500">
            <audio className="w-4/5 focus:outline-none" controls>
              <source
                src={`https://mxhld.herokuapp.com/v1/file/${state?.file}`}
              />
            </audio>
          </div>
        );
      }
    }
    return (
      <div className="flex justify-center h-full">
        <img
          src="/assets/image/no-pictures.png"
          alt="userpost"
          className="w-full object-cover p-24"
        />
      </div>
    );
  };

  return (
    <>
      <DialogActionPost
        state={state}
        // open={action}
        open={actionCurrent.showAction}
        onClose={onClose}
        setPopup={setPopup}
        getUserPost={getUserPost}
        getSummary={getSummary}
      ></DialogActionPost>

      <Dialog
        open={popup}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <div
            className="post-show fixed w-full h-screen opacity-80 z-20 top-0 left-0 flex justify-end items-start"
            style={{ background: "#7d7d7d" }}
          >
            <div className=" flex justify-center items-center justify-items-center rounded-full bg-none ">
              <i
                className="fas fa-times fa-2x cursor-pointer mr-4"
                style={{ color: "#e5e5e5" }}
                onClick={() => setPopup(false)}
              ></i>
            </div>
            <div className=" absolute left-5 top-1/2">
              <i
                onClick={() => {
                  alert("left");
                }}
                className="fas fa-3x fa-chevron-circle-left text-white cursor-pointer"
              />
            </div>
            <div className=" absolute right-5 top-1/2 bg-none">
              <i
                onClick={() => {
                  alert("right");
                }}
                className="fas fa-3x fa-chevron-circle-right text-white cursor-pointer"
              />
            </div>
          </div>
          <div
            className=" z-50 rounded-md shadow-xl bg-white fixed  transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2"
            // style={{ width: "64rem", height: "650px" }}
            style={{ width: "64rem", height: "550px" }}
          >
            <div className="grid grid-cols-4 h-full">
              <div className="col-span-2 h-full overflow-hidden">
                {skt && <SkeletonImagePostProfile />}

                {checkFile()}
              </div>
              <div className="col-span-2 ">
                <div className="flex items-center mt-2 pl-2">
                  {/* {skt ? (
                    <SkeletonHeader />
                  ) : ( */}
                  <img
                    className="rounded-full w-10 mr-3"
                    src={`https://mxhld.herokuapp.com/v1/image/${state?.user?.avatar}`}
                    alt=""
                  />
                  {/* )} */}

                  <div className="flex-1 pr-4 flex items-center justify-between">
                    <p className="font-bold text-md">{state?.user?.fullname}</p>
                    <p
                      onClick={() => {
                        // setAction(!action);
                        dispatch(setDialogAction(true));
                      }}
                      className=" font-black text-2xl cursor-pointer text-gray-400"
                    >
                      ...
                    </p>
                  </div>
                </div>

                <hr className="mt-2 " />

                <div
                  id="scrollableDiv"
                  className=" relative overflow-y-auto overflow-x-hidden post-show w-full"
                  style={{ height: "20rem" }}
                >
                  <div className="mb-2">
                    <CaptionCrs state={state} />
                  </div>

                  <ListCommentCrs state={state} comment={comment} />
                </div>

                <div className="absolute w-1/2 transform top-3/4 -translate-y-6">
                  <hr />
                  <ActionCrs state={state} />
                  <p className="ml-4 mb-2 italic text-xs text-gray-400">
                    {moment(state?.createdAt).fromNow()}
                  </p>
                  <div className=" transform translate-x-4 mr-2">
                    <AddCommentCrs
                      yourcomment={comment}
                      setyourComment={setComment}
                      state={state}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CarouselElement;
