import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useReactMediaRecorder } from "../../../../mylibrary/react-media-recorder";
import { toast, ToastContainer, Zoom } from "react-toastify";
const RecordingVideo = (props) => {
  const { open, onClose, setSelectedImage, sendMediaBlood } = props;
  const [localStream, setLocalStream] = useState(null);
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
    clearBlobUrl();
    return () => {
      setVideoFile(null);
    };
  }, []);

  // useEffect(() => {
  //   console.log("blob", mediaBlob);
  //   console.log("url", mediaBlobUrl);

  // }, [mediaBlobUrl]);

  useEffect(() => {
    setVideoFile(mediaBlob);
  }, [mediaBlob]);

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
      // setVideoFile(null);
    } else onCloseVideo();
  };

  const handleVideo = () => {
    if (videoFile !== null) {
      setSelectedImage(videoFile);
      sendMediaBlood();
    } else {
      toast.error(`You not recording video !`, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
    clearBlobUrl();
    setVideoFile(null);
    onClose();
  };

  const onCloseVideo = () => {
    stopRecording();
    clearBlobUrl();
    setVideoFile(null);
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
          {"Send Video to your Friend"}
        </DialogTitle>
        <DialogContent
          sx={{
            overflow: "hidden",
          }}
        >
          <DialogContentText
            sx={{
              overflow: "hidden",
            }}
            id="alert-dialog-description"
          >
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

              <span className="text-red-400">{status}...</span>
              <div className=" flex gap-4 py-2 justify-center">
                <button
                  className=" rounded-md text-white bg-red-400 h-10"
                  onClick={startRecording}
                >
                  <span onClick={startWebCam.bind(this)} className="p-2">
                    Start Recording
                  </span>
                </button>
                <button
                  className=" rounded-md text-white bg-blue-400"
                  onClick={() => {
                    stopRecording();
                    stopWebCam(localStream);
                    setVideoFile(mediaBlob);
                  }}
                >
                  <span className="p-2">Stop Recording</span>
                </button>
              </div>
              {mediaBlobUrl != null && (
                <video
                  className="w-full"
                  src={mediaBlobUrl}
                  controls
                  autoPlay
                />
              )}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleVideo()}>Send</Button>
          <Button
            onClick={() => {
              stopRecording();
              stopWebCam(localStream);
              onCloseVideo();
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
