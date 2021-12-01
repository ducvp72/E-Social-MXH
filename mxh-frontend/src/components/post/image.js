import React, { useEffect, useState } from "react";
import { SkeletionImagePostOutSide } from "./../../skeletons/Skeletons";

export const Image = (props) => {
  const { item, setPopup, popup } = props;
  const [skt, setSkt] = useState(true);

  useEffect(() => {
    cancleShow();
    return () => {
      clearTimeout(cancleShow);
      setSkt(null);
    };
  }, []);

  const cancleShow = () => {
    setTimeout(() => {
      setSkt(false);
    }, 500);
  };

  const checkFile = () => {
    if (item) {
      if (item?.fileTypes === "IMAGE") {
        return (
          <>
            <div
              className="flex items-center justify-center cursor-pointer"
              style={{ border: "1px solid #efefef" }}
              onClick={() => setPopup({ ...popup, isShow: true })}
            >
              <img
                src={`https://mxhld.herokuapp.com/v1/file/${item?.file}`}
                alt="userpost"
                className="w-full "
              />
            </div>
          </>
        );
      }
      if (item?.fileTypes === "VIDEO") {
        return (
          <div className="flex items-center justify-center cursor-pointer bg-black ">
            <video
              // onDoubleClick={() => {
              //   setPopup({ ...popup, isShow: true });
              // }}
              // controlsList={`${popup && "nofullscreen"} fullscreen `}
              style={{
                width: "550px",
              }}
              className="w-full outline-none "
              controls
            >
              <source
                src={`https://mxhld.herokuapp.com/v1/file/${item?.file}`}
              />
            </video>
          </div>
        );
      }
      if (item?.fileTypes === "AUDIO") {
        return (
          <div
            onClick={() => setPopup({ ...popup, isShow: true })}
            className="flex items-center justify-center cursor-pointer "
          >
            <audio className="w-4/5 mt-2 " controls>
              <source
                src={`https://mxhld.herokuapp.com/v1/file/${item?.file}`}
              />
            </audio>
          </div>
        );
      }
    }
    return;
  };

  return (
    <div>
      {skt && <SkeletionImagePostOutSide />}
      {checkFile()}
    </div>
  );
};
