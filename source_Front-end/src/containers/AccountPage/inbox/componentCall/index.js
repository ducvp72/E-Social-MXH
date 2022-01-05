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
  const [offp, setOffp] = useState(false);
  const [share, setShare] = useState(false);
  const [end, setEnd] = useState(false);

  useEffect(() => {
    setShowInfor(info);
    setAwating(awaiting);
    setLocaStream(localStream);
    setShare(share);
    setOffp(offp);
    setEnd(end);
  }, [info, awaiting, localStream, share, offp, end]);

  useEffect(() => {
    console.log("Parnert", partnerVideo);
    console.log("other", otherUser);
  }, [partnerVideo, otherUser]);

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
    socket.current.on("video-off", (data) => {
      setOffp(true);
    });
    socket.current.on("video-on", (data) => {
      setOffp(false);
    });
    socket.current.on("callEnded", (data) => {
      setEnd(true);
    });
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
          urls: ["stun:eu-turn4.xirsys.com"],
        },
        {
          username:
            "ml0jh0qMKZKd9P_9C0UIBY2G0nSQMCFBUXGlk6IXDJf8G2uiCymg9WwbEJTMwVeiAAAAAF2__hNSaW5vbGVl",
          credential: "4dd454a6-feee-11e9-b185-6adcafebbb45",
          urls: [
            "turn:eu-turn4.xirsys.com:80?transport=udp",
            "turn:eu-turn4.xirsys.com:3478?transport=tcp",
          ],
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
      video: {
        facingMode: "user",
      },
      audio: true,
    });
    setLocaStream(stream);

    userStream.current = stream;
    setChange(false);
  };

  const startWebCam2 = async () => {
    socket.current.emit("video-on", {
      senderId: cookies.auth.user.id,
      receiverId: otherUser.current,
    });
    const stream = await navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: "user",
      },
      audio: true,
    });
    setLocaStream(stream);

    userStream.current = stream;
    callUser(otherUser.current);
    setChange(false);
  };

  const stopWebCam = () => {
    const videoTracks = localStream.getVideoTracks();
    videoTracks.forEach((track) => {
      track.stop();
      localStream.removeTrack(track);
    });
    setChange(true);
    console.log("other", otherUser.current);
    socket.current.emit("video-off", {
      senderId: cookies.auth.user.id,
      receiverId: otherUser.current,
    });
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

  const shareSceen = async () => {
    setShare(true);
    var displayMediaOptions = {
      video: {
        cursor: "always",
      },
      audio: true,
    };
    let audioTrack, videoTrack, stream;
    navigator.mediaDevices
      .getDisplayMedia(displayMediaOptions)
      .then(async (displayStream) => {
        [videoTrack] = displayStream.getVideoTracks();
        const audioStream = await navigator.mediaDevices
          .getUserMedia({ audio: true })
          .catch((e) => {
            throw e;
          });
        [audioTrack] = audioStream.getAudioTracks();
        displayStream.addTrack(audioTrack); // do stuff
        stream = new MediaStream([videoTrack, audioTrack]); // do stuff)

        stream.getVideoTracks()[0].onended = function () {
          unshareSceen();
        };

        setLocaStream(stream);
        userStream.current = null;
        userStream.current = stream;
        callUser(otherUser.current);
        setChange(true);
      });
  };

  const unshareSceen = async () => {
    setShare(false);
    startWebCam2();
  };

  return (
    <>
      <div className="w-full h-full">
        <div className=" z-50 absolute flex h-full w-full bg-transparent items-end">
          <div className=" absolute  grid grid-cols-3 h-1/12 w-full ">
            <div className=" flex items-center justify-center"></div>
            <div className=" flex items-center justify-center">
              <div className=" flex items-center justify-center gap-4 mb-2 ">
                {share ? (
                  <button
                    onClick={() => {
                      unshareSceen();
                    }}
                    className=" focus:outline-none rounded-full bg-red-500 w-12 h-12 flex items-center justify-center"
                  >
                    <img
                      className="w-8 h-8"
                      src="/assets/image/present.png"
                      alt="present"
                    />
                  </button>
                ) : (
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
                )}

                {change ? (
                  <>
                    <button
                      className=" focus:outline-none rounded-full bg-gray-300 w-12 h-12 flex items-center justify-center"
                      onClick={startWebCam2.bind(this)}
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
                      className=" focus:outline-none rounded-full bg-red-500 w-12 h-12 flex items-center justify-center"
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
                      className=" focus:outline-none rounded-full bg-red-500 w-12 h-12 flex items-center justify-center"
                      onClick={muteMic.bind(this)}
                    >
                      <img
                        className="w-8 h-8"
                        src="/assets/image/mute.png"
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
                        src="/assets/image/microphone.png"
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
              id="partnerVideo"
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

          {offp && (
            <div className=" w-full h-full absolute flex flex-col items-center  justify-center z-50 bg-black">
              <p className=" text-white font-bold text-2xl">
                The other was turn off camera
              </p>
            </div>
          )}
          {end && (
            <div className=" w-full h-full absolute flex flex-col items-center  justify-center z-50 bg-black">
              <p className=" text-white font-bold text-2xl">The call was End</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default VideoCall;
