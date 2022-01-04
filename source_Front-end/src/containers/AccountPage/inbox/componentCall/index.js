import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { io } from "socket.io-client";
import { useCookies } from "react-cookie";
const VideoCall = () => {
  const [localStream, setLocaStream] = useState(null);
  const [change, setChange] = useState(true);
  const [mute, setMute] = useState(true);
  const [show, setShow] = useState(true);
  const [cookies, ,] = useCookies(["auth"]);
  const socket = useRef();
  const userStream = useRef();
  const partnerVideo = useRef(null);
  const peerRef = useRef();
  const otherUser = useRef();
  const [info, setShowInfor] = useState(false);
  const { userId } = useParams();
  const [awaiting, setAwating] = useState(true);

  useEffect(() => {
    setShowInfor(info);
    setAwating(awaiting);
    setLocaStream(localStream);
  }, [info, awaiting, localStream]);

  useEffect(() => {
    startWebCam();
    socket.current = io("https://socket-mxhld.herokuapp.com", {
      // transports: ["websocket", "polling"],
      // pingTimeout: 60000,
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization: `Bearer ${cookies.auth.tokens.access.token}`,
          },
        },
      },
    });
    // socket.current.emit("whoami", (data) => console.log(data));
    socket.current.emit("join room", userId);

    //Tuchoi cuộc gọi
    socket.current.on("callRejected", async (data) => {
      console.log("show", data);
      setShowInfor(true);
    });

    socket.current.on("callAccepted", async (data) => {
      console.log("show", data);
      setAwating(false);
      setShowInfor(true);
    });

    socket.current.on("other user", (userID) => {
      callUser(userID);
      otherUser.current = userID;
    });

    socket.current.on("user joined", (userID) => {
      otherUser.current = userID;
    });

    socket.current.on("offer", handleRecieveCall);

    socket.current.on("answer", handleAnswer);

    socket.current.on("ice-candidate", handleNewICECandidateMsg);
  }, []);
  function callUser(userID) {
    peerRef.current = createPeer(userID);
    userStream.current
      .getTracks()
      .forEach((track) => peerRef.current.addTrack(track, userStream.current));
  }

  function createPeer(userID) {
    const peer = new RTCPeerConnection({
      iceServers: [
        {
          urls: "stun:stun2.l.google.com:19302",
        },
        {
          urls: "turn:numb.viagenie.ca",
          credential: "muazkh",
          username: "webrtc@live.com",
        },
      ],
    });

    peer.onicecandidate = handleICECandidateEvent;
    peer.ontrack = handleTrackEvent;
    peer.onnegotiationneeded = () => handleNegotiationNeededEvent(userID);

    return peer;
  }

  function handleNegotiationNeededEvent(userID) {
    peerRef.current
      .createOffer()
      .then((offer) => {
        return peerRef.current.setLocalDescription(offer);
      })
      .then(() => {
        const payload = {
          target: userID,
          caller: socket.current.id,
          sdp: peerRef.current.localDescription,
        };
        socket.current.emit("offer", payload);
      })
      .catch((e) => console.log(e));
  }

  function handleRecieveCall(incoming) {
    peerRef.current = createPeer();
    const desc = new RTCSessionDescription(incoming.sdp);
    peerRef.current
      .setRemoteDescription(desc)
      .then(() => {
        userStream.current
          .getTracks()
          .forEach((track) =>
            peerRef.current.addTrack(track, userStream.current)
          );
      })
      .then(() => {
        return peerRef.current.createAnswer();
      })
      .then((answer) => {
        return peerRef.current.setLocalDescription(answer);
      })
      .then(() => {
        const payload = {
          target: incoming.caller,
          caller: socket.current.id,
          sdp: peerRef.current.localDescription,
        };
        socket.current.emit("answer", payload);
      });
  }

  function handleAnswer(message) {
    const desc = new RTCSessionDescription(message.sdp);
    peerRef.current.setRemoteDescription(desc).catch((e) => console.log(e));
  }

  function handleICECandidateEvent(e) {
    if (e.candidate) {
      const payload = {
        target: otherUser.current,
        candidate: e.candidate,
      };
      socket.current.emit("ice-candidate", payload);
    }
  }

  function handleNewICECandidateMsg(incoming) {
    const candidate = new RTCIceCandidate(incoming);

    peerRef.current.addIceCandidate(candidate).catch((e) => console.log(e));
  }

  function handleTrackEvent(e) {
    partnerVideo.current.srcObject = e.streams[0];
  }

  // const dispatch = useDispatch();
  // const currentCall = useSelector((state) => state.windowCall.openCall);
  document.body.style.overflow = "hidden";
  const startWebCam = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });
    setLocaStream(stream);
    userStream.current = stream;
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

  const shareSceen = async () => {
    var displayMediaOptions = {
      video: {
        cursor: "always",
      },
      audio: false,
    };
    const stream = await navigator.mediaDevices.getDisplayMedia(
      displayMediaOptions
    );
    setLocaStream(stream);
    userStream.current = stream;
  };

  return (
    <>
      <div className="w-full h-full">
        <div className=" z-50 absolute flex h-full w-full bg-transparent items-end">
          <div className=" absolute  grid grid-cols-3 h-1/12 w-full ">
            <div className=" flex items-center justify-center"></div>
            <div className=" flex items-center justify-center">
              <div className=" flex items-center justify-center gap-4 mb-2 ">
                <button
                  onClick={() => {
                    shareSceen();
                  }}
                  className=" focus:outline-none rounded-full bg-gray-300 w-12 h-12 flex items-center justify-center"
                >
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
                {partnerVideo !== null && (
                  <button className=" focus:outline-none rounded-full bg-red-500 w-12 h-12 flex items-center justify-center">
                    <img
                      onClick={() => {
                        window.close();
                      }}
                      className="w-8 h-8"
                      src="/assets/image/phone-call.png"
                      alt="unmute"
                    />
                  </button>
                )}
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
                            muted
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
          {!partnerVideo ? (
            <div className="flex flex-col justify-center">
              <p className=" text-white font-bold text-2xl">
                Waiting others to join the call ...
              </p>
              <div className="  flex justify-center">
                <p className=" text-white  font-bold text-lg">Calling...</p>
              </div>
            </div>
          ) : (
            <video
              className=" w-full object-cover m-0"
              autoPlay
              ref={partnerVideo}
            />
          )}

          {info && (
            <div className=" absolute flex flex-col justify-center">
              <p className=" text-red-500 font-bold text-2xl">
                The other rejects your call....
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VideoCall;
