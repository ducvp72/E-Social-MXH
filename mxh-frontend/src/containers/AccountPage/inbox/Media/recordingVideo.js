import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useReactMediaRecorder } from "react-media-recorder";
const RecordingVideo = (props) => {
  const { open, onClose, setSelectedImage, sendMediaBlood } = props;
  const [localStream, setLocalStream] = useState(null || "");
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    mediaBlob,
    clearBlobUrl,
  } = useReactMediaRecorder({ video: true });
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    setVideoFile(mediaBlobUrl);
  }, [mediaBlobUrl]);

  useEffect(() => {
    if (mediaBlob !== null) setSelectedImage(mediaBlob);
  }, [mediaBlob]);

  const startWebCam = async () => {
    navigator.mediaDevices
      .getUserMedia({
        audio: false,
        video: true,
      })
      .then((stream) => {
        setLocalStream(stream);
      });
    clearBlobUrl();
    setVideoFile(null);
  };

  const stopWebCam = (localStream) => {
    if (localStream != null) {
      localStream.getTracks().forEach((track) => {
        track.stop();
      });
      setLocalStream(null);
      setVideoFile(null);
    } else return;
  };

  const handleVideo = () => {
    setSelectedImage(mediaBlob);
    sendMediaBlood();
    onClose();
    clearBlobUrl();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        width="xl"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"Send Video to your Friend"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>
              {localStream && (
                <video
                  autoPlay
                  ref={(video) => {
                    if (video) {
                      video.srcObject = localStream;
                    }
                  }}
                />
              )}

              <div className="text-red-400">{status}...</div>
              <div className=" flex gap-4 py-2 justify-center">
                <button
                  className=" rounded-md text-white bg-red-400"
                  onClick={startRecording}
                >
                  <div onClick={startWebCam.bind(this)} className="p-2">
                    Start Recording
                  </div>
                </button>
                <button
                  className=" rounded-md text-white bg-blue-400"
                  onClick={() => {
                    stopRecording();
                    stopWebCam(localStream);
                  }}
                >
                  <div className="p-2">Stop Recording</div>
                </button>
              </div>
              {mediaBlobUrl != null && (
                <video className="w-full" src={videoFile} controls autoPlay />
              )}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() =>
              // stopWebCam.bind(this)
              handleVideo()
            }
          >
            Send
          </Button>
          <Button
            onClick={() => {
              clearBlobUrl();
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

export default RecordingVideo;
