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
            {item?.file && (
              <div
                className="flex items-center justify-center cursor-pointer"
                style={{
                  border: "1px solid #efefef",
                }}
                onClick={() => setPopup({ ...popup, isShow: true })}
              >
                <img
                  src={`https://mxhld.herokuapp.com/v1/file/${item?.file}`}
                  alt="userpost"
                  height="500"
                />
              </div>
            )}
          </>
        );
      }
      if (item?.fileTypes === "VIDEO") {
        return (
          <>
            {item?.file && (
              <div className="flex items-center justify-center cursor-pointer bg-black ">
                <video
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
            )}
          </>
        );
      }
      if (item?.fileTypes === "AUDIO") {
        return (
          <>
            {item?.file && (
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
            )}
          </>
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
