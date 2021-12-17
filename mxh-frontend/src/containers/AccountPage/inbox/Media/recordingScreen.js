import React, { useState, useEffect, useRef } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useScreenRecorder from "use-screen-recorder";
import { toast, ToastContainer, Zoom } from "react-toastify";

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
    console.log("blob", blob);
  }, [blob]);

  const handleScreen = () => {
    setSelectedImage(blob);
    sendMediaBlood();
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
                <Pill title="Status" value={status} />
                <Pill
                  style={{ flexGrow: 1 }}
                  title="Blob URL"
                  value={blobUrl || "Waiting..."}
                />
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

              <div className="buttons">
                {(status === "idle" ||
                  status === "permission-requested" ||
                  status === "error") && (
                  <button onClick={startRecording}>Start recording</button>
                )}
                {(status === "recording" || status === "paused") && (
                  <button onClick={stopRecording}>Stop recording</button>
                )}
                {(status === "recording" || status === "paused") && (
                  <button
                    onClick={() =>
                      status === "paused" ? resumeRecording() : pauseRecording()
                    }
                  >
                    {status === "paused"
                      ? "Resume recording"
                      : "Pause recording"}
                  </button>
                )}
                {status === "stopped" && (
                  <button
                    onClick={() => {
                      resetRecording();
                      videoRef.current.load();
                    }}
                  >
                    Reset recording
                  </button>
                )}
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
