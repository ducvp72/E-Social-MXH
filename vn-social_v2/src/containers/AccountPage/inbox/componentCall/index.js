import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWindowCall } from "../../../../reducers/callReducer";

const VideoCall = () => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const currentCall = useSelector((state) => state.windowCall.openCall);

  // useEffect(() => {
  //   console.log("CurrentCall popup", currentCall);
  //   if (!currentCall) {
  //     window.close();
  //   }
  // }, [currentCall]);

  return (
    <>
      <div className="">{userId ? userId : null}</div>
      {/* <button
        onClick={() => {
          dispatch(setWindowCall(false));
        }}
        className="bg-gray-700"
      >
        Close
      </button> */}
    </>
  );
};

export default VideoCall;
