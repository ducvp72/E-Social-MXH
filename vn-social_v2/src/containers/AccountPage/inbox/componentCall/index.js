import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setWindowCall } from "../../../../reducers/callReducer";
import { SocketContext } from "../../../../Context";
const VideoCall = () => {
  const [localStream, setLocaStream] = useState(null);
  const [change, setChange] = useState(true);
  const [mute, setMute] = useState(true);
  const [show, setShow] = useState(true);
  // const { userId } = useParams();
  // const dispatch = useDispatch();
  // const currentCall = useSelector((state) => state.windowCall.openCall);
  document.body.style.overflow = "hidden";

  const startWebCam = () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: true,
        video: true,
      })
      .then((stream) => {
        setLocaStream(stream);
      });
    setChange(false);
  };

  const stopWebCam = () => {
    localStream?.getTracks().forEach((track) => {
      track.stop();
    });
    setLocaStream(null);
    setChange(true);
  };

  const muteMic = () => {
    if (localStream !== null) {
      localStream.getAudioTracks()[0].enabled = false;
      setMute(false);
    }
  };

  const unMuteMic = () => {
    if (localStream !== null) {
      localStream.getAudioTracks()[0].enabled = true;
      setMute(true);
    }
  };
  // className=" w-full h-full flex items-end justify-end object-cover"
  return (
    <>
      <div className="w-full h-full">
        <div className=" z-50 absolute flex h-full w-full bg-transparent items-end">
          <div className=" absolute  grid grid-cols-3 h-1/12 w-full ">
            <div className=" flex items-center justify-center"></div>
            <div className=" flex items-center justify-center">
              <div className=" flex items-center justify-center gap-4 mb-2 ">
                <button className=" focus:outline-none rounded-full bg-gray-300 w-12 h-12 flex items-center justify-center">
                  <img
                    className="w-8 h-8"
                    src="/assets/image/present.png"
                    alt="present"
                  />
                </button>
                {change ? (
                  <>
                    <button
                      className=" focus:outline-none rounded-full bg-gray-300 w-12 h-12 flex items-center justify-center"
                      onClick={startWebCam.bind(this)}
                    >
                      <img
                        className="w-8 h-8"
                        src="/assets/image/video-camera.png"
                        alt="VideoCall"
                      />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className=" focus:outline-none rounded-full bg-gray-300 w-12 h-12 flex items-center justify-center"
                      onClick={stopWebCam.bind(this)}
                    >
                      <img
                        className="w-8 h-8"
                        src="/assets/image/video-call.png"
                        alt="un-VideoCall"
                      />
                    </button>
                  </>
                )}

                {mute ? (
                  <>
                    <button
                      className=" focus:outline-none rounded-full bg-gray-300 w-12 h-12 flex items-center justify-center"
                      onClick={muteMic.bind(this)}
                    >
                      <img
                        className="w-8 h-8"
                        src="/assets/image/microphone.png"
                        alt="mute"
                      />
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className=" focus:outline-none rounded-full bg-gray-300 w-12 h-12 flex items-center justify-center"
                      onClick={unMuteMic.bind(this)}
                    >
                      <img
                        className="w-8 h-8"
                        src="/assets/image/mute.png"
                        alt="unmute"
                      />
                    </button>
                  </>
                )}
                <button className=" focus:outline-none rounded-full bg-gray-300 w-12 h-12 flex items-center justify-center">
                  <img
                    className="w-8 h-8"
                    src="/assets/image/phone-call.png"
                    alt="unmute"
                  />
                </button>
              </div>
            </div>
            <div className=" relative flex">
              <div className=" absolute  w-full h-full transform -translate-y-24">
                <div className="flex relative items-center h-full bg-transparent w-full justify-end">
                  {localStream && (
                    <div>
                      {localStream && show ? (
                        <div className="mr-2 flex items-center">
                          <div
                            onClick={() => setShow(false)}
                            className=" absolute flex bg-transparent h-full items-center z-50 w-full "
                          >
                            <i class=" hover:text-blue-400 text-gray-100 cursor-pointer fas fa-1.5x fa-chevron-right  ml-1" />
                          </div>
                          <video
                            style={{ height: "220px", width: "350px" }}
                            className=" w-full object-cover m-0"
                            autoPlay
                            // ref={myVideo}
                            ref={(video) => {
                              if (video) {
                                video.srcObject = localStream;
                              }
                            }}
                          />
                        </div>
                      ) : (
                        <div
                          onClick={() => setShow(true)}
                          className=" h-60 bg-transparent opacity-80  mr-1 flex items-center cursor-pointer  hover:bg-blue-400 rounded"
                        >
                          <i class=" z-50  text-white cursor-pointer fas fa-1.5x fa-chevron-left p-1" />
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className=" z-0 absolute w-full h-full bg-black flex justify-center items-center">
          <video
            className=" w-full object-cover m-0"
            autoPlay
            ref={(video) => {
              if (video) {
                video.srcObject = localStream;
              }
            }}
          />

          {/* <div className="flex flex-col justify-center">
            <p className=" text-white font-bold text-2xl">
              Waiting others to join the call ...
            </p>
            <div className="  flex justify-center">
              <p className=" text-white  font-bold text-lg">Calling...</p>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default VideoCall;
