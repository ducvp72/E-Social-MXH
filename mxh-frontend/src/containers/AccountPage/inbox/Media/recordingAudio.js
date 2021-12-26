import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useReactMediaRecorder } from "../../../../mylibrary/react-media-recorder";

import { toast, ToastContainer, Zoom } from "react-toastify";
const RecordingAudio = (props) => {
  const { open, onClose, setSelectedImage, sendMediaBlood } = props;
  const [audioFile, setAudioFile] = useState(null);
  const [onRecoring, setOnRecoring] = useState(false);
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    mediaBlob,
    clearBlobUrl,
  } = useReactMediaRecorder({ audio: true });

  // useEffect(() => {
  //   console.log("blob", mediaBlob);
  //   console.log("url", mediaBlobUrl);
  // }, [mediaBlob, mediaBlobUrl]);

  useEffect(() => {
    return () => {
      setAudioFile(null);
    };
  }, []);

  useEffect(() => {
    setAudioFile(mediaBlob);
  }, [mediaBlob]);

  useEffect(() => {
    if (mediaBlob !== null) setSelectedImage(mediaBlob);
  }, [mediaBlob]);

  const handleVoice = () => {
    if (audioFile !== null) {
      setSelectedImage(audioFile);
      sendMediaBlood();
    } else {
      toast.error(`You not recording audio !`, {
        position: toast.POSITION.BOTTOM_CENTER,
        autoClose: 2000,
        hideProgressBar: true,
      });
    }
    clearBlobUrl();
    setAudioFile(null);
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
          {"Send Audio to your Friend"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>
              {onRecoring && (
                <div className=" flex gap-10 justify-center items-center">
                  <img
                    className="w-32 h-32"
                    src="/assets/image/rec.gif"
                    alt="audio"
                  />
                </div>
              )}

              <div className="mb-2">{status}</div>
              <div className="flex gap-4 justify-center h-10">
                <button
                  className="bg-red-400 text-white rounded-md mr-2 "
                  onClick={() => {
                    startRecording();
                    setOnRecoring(true);
                  }}
                >
                  <span className="p-2">Start Recording</span>
                </button>
                <button
                  className="bg-blue-400 text-white rounded-md"
                  onClick={() => {
                    stopRecording();
                    setAudioFile(mediaBlob);
                    setOnRecoring(false);
                  }}
                >
                  <span className="p-2"> Stop Recording</span>
                </button>
              </div>
              {mediaBlobUrl && (
                <audio
                  className="mt-5 w-full"
                  src={mediaBlobUrl}
                  controls
                  autoPlay
                />
              )}
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleVoice()}>Send</Button>
          <Button
            onClick={() => {
              stopRecording();
              clearBlobUrl();
              setAudioFile(null);
              setOnRecoring(false);
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

export default RecordingAudio;
