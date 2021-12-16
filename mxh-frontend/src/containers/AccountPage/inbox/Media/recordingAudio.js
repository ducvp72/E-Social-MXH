import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useReactMediaRecorder } from "react-media-recorder";
const RecordingAudio = (props) => {
  const { open, onClose, setSelectedImage, sendMediaBlood } = props;
  const [audioFile, setAudioFile] = useState(null);
  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
    mediaBlob,
    clearBlobUrl,
  } = useReactMediaRecorder({ audio: true });

  useEffect(() => {
    return () => {
      setAudioFile(null);
    };
  }, []);

  useEffect(() => {
    setAudioFile(mediaBlobUrl);
  }, [mediaBlobUrl]);

  useEffect(() => {
    if (mediaBlob !== null) setSelectedImage(mediaBlob);
  }, [mediaBlob]);

  const handleVoice = () => {
    setSelectedImage(mediaBlob);
    sendMediaBlood();
    setAudioFile(null);
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
          {"Send Audio to your Friend"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>
              <div className="mb-2">{status}</div>
              <div className="flex gap-4 justify-center">
                <button
                  className="bg-red-400 text-white rounded-md mr-2 "
                  onClick={startRecording}
                >
                  <div className="p-2">Start Recording</div>
                </button>
                <button
                  className="bg-blue-400 text-white rounded-md"
                  onClick={stopRecording}
                >
                  <div className="p-2"> Stop Recording</div>
                </button>
              </div>
              {mediaBlobUrl && (
                <audio
                  className="mt-5 w-full"
                  src={audioFile}
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
              setAudioFile(null);
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
