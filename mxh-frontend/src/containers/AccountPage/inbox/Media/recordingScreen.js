import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useScreenRecorder from "../../../../mylibrary/use-screen-recorder";
import { toast, ToastContainer, Zoom } from "react-toastify";
import "./styles.css";
export const Pill = ({ title, value, style }) => {
  return (
    <div style={style} className="pill">
      <h6>{title}</h6>
      <p>{value}</p>
    </div>
  );
};

const RecordingScreen = (props) => {
  const { open, onClose, setSelectedImage, sendMediaBlood } = props;
  const videoRef = useRef();
  const {
    blobUrl,
    pauseRecording,
    resetRecording,
    resumeRecording,
    startRecording,
    status,
    stopRecording,
    blob,
  } = useScreenRecorder({ audio: true });

  useEffect(() => {
    setSelectedImage(blob);
  }, [blob]);

  useEffect(() => {
    resetRecording();
    // videoRef?.current?.load();
  }, []);

  // useEffect(() => {
  //   return () => {
  //     setScreenFile(null);
  //   };
  // }, []);

  const handleScreen = () => {
    console.log("data", blob);
    if (blob) {
      setSelectedImage(blob);
      sendMediaBlood();
    } else {
      toast.error(`You not recording screen !`, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
    videoRef.current.load();
    console.log("blob last", blob);
    resetRecording();
    onClose();
  };

  return (
    <div>
      <ToastContainer transition={Zoom} />
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        width="xl"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"Send Screen Recording to your Friend"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div className="wrapper">
              <div className="pills">
                <Pill title="Status" style={{ flexGrow: 1 }} value={status} />
                {/* <Pill
                  style={{ flexGrow: 1 }}
                  title="Blob URL"
                  value={blobUrl || "Waiting..."}
                /> */}
              </div>

              <div>
                <video
                  ref={videoRef}
                  src={blobUrl}
                  poster={process.env.PUBLIC_URL + "/poster.png"}
                  controls
                  autoPlay
                />
              </div>
              <div className="flex justify-center items-center  ">
                <div>
                  {(status === "idle" ||
                    status === "permission-requested" ||
                    status === "error") && (
                    <button
                      className="bg-red-500 text-white rounded-md  h-10"
                      onClick={() => {
                        startRecording();
                      }}
                    >
                      <span className="p-5"> Start recording</span>
                    </button>
                  )}
                  {(status === "recording" || status === "paused") && (
                    <button
                      className="bg-red-500 text-white rounded-md mr-2 h-10"
                      onClick={stopRecording}
                    >
                      <span className="p-5"> Stop recording</span>
                    </button>
                  )}
                  {(status === "recording" || status === "paused") && (
                    <button
                      className="bg-blue-500 text-white rounded-md h-10"
                      onClick={() =>
                        status === "paused"
                          ? resumeRecording()
                          : pauseRecording()
                      }
                    >
                      <span className="p-5">
                        {status === "paused"
                          ? "Resume recording"
                          : "Pause recording"}
                      </span>
                    </button>
                  )}
                  {status === "stopped" && (
                    <button
                      className="bg-yellow-500 text-white rounded-md h-10"
                      onClick={() => {
                        resetRecording();
                        videoRef.current.load();
                      }}
                    >
                      <span className="p-5"> Reset recording</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleScreen();
            }}
          >
            Send
          </Button>
          <Button
            onClick={() => {
              // stopRecording();
              resetRecording();
              onClose();
            }}
            autoFocus
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default RecordingScreen;
