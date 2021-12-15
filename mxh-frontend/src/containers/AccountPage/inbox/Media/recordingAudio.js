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
  const { status, startRecording, stopRecording, mediaBlobUrl } =
    useReactMediaRecorder({ audio: true });

  useEffect(() => {
    return () => {
      setAudioFile(null);
    };
  }, []);
  useEffect(() => {
    setAudioFile(mediaBlobUrl);
  }, [mediaBlobUrl]);

  const handleVoice = () => {
    setSelectedImage(audioFile);
    sendMediaBlood();
    setAudioFile(null);
    onClose();
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        Width="xl"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"Send Audio to your Friend"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <div>
              <p className="mb-2">{status}</p>
              <button
                className="bg-red-500 text-white rounded-md mr-2 "
                onClick={startRecording}
              >
                <p className="p-2">Start Recording</p>
              </button>
              <button
                className="bg-blue-500 text-white rounded-md"
                onClick={stopRecording}
              >
                <p className="p-2"> Stop Recording</p>
              </button>
              <audio className="mt-5" src={audioFile} controls autoPlay />
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
