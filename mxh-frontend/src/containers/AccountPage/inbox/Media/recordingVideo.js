import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
const videoType = "video/webm";

export class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recording: false,
      videos: [],
    };
  }

  stop(stream) {
    stream.getTracks().forEach((track) => track.stop());
  }

  async componentDidMount() {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    // show it to user
    this.video.srcObject = stream;
    this.video.play();

    // init recording
    this.mediaRecorder = new MediaRecorder(stream, {
      mimeType: videoType,
    });
    // init data storage for video chunks
    this.chunks = [];
    // listen for data from media recorder
    this.mediaRecorder.ondataavailable = (e) => {
      if (e.data && e.data.size > 0) {
        this.chunks.push(e.data);
      }
    };
  }

  startRecording(e) {
    e.preventDefault();
    // wipe old data chunks
    this.chunks = [];
    // start recorder with 10ms buffer
    this.mediaRecorder.start(10);
    // say that we're recording
    this.setState({ recording: true });
  }

  stopRecording(e) {
    e.preventDefault();
    // stop the recorder
    this.mediaRecorder.stop();
    // say that we're not recording
    this.setState({ recording: false });
    // save the video to memory
    this.saveVideo();
  }

  saveVideo() {
    // convert saved chunks to blob
    const blob = new Blob(this.chunks, { type: videoType });
    // generate video url from blob
    const videoURL = window.URL.createObjectURL(blob);
    // append videoURL to list of saved videos for rendering
    const videos = this.state.videos.concat([videoURL]);
    this.setState({ videos });
  }

  deleteVideo(videoURL) {
    // filter out current videoURL from the list of saved videos
    const videos = this.state.videos.filter((v) => v !== videoURL);
    this.setState({ videos });
  }

  render() {
    const { recording, videos } = this.state;

    return (
      <div className="camera">
        <video
          id="show"
          className="w-full"
          ref={(v) => {
            this.video = v;
          }}
        >
          Video stream not available.
        </video>
        <div>
          {!recording && (
            <button onClick={(e) => this.startRecording(e)}>Record</button>
          )}
          {recording && (
            <button onClick={(e) => this.stopRecording(e)}>Stop</button>
          )}
        </div>
        <div>
          <h3>Recorded videos:</h3>
          <button
            onClick={() => {
              this.stop(this.video.srcObject);
            }}
          >
            Cancle
          </button>
          {videos.map((videoURL, i) => (
            <div key={`video_${i}`}>
              <video
                id="replay"
                style={{ width: 200 }}
                src={videoURL}
                autoPlay
                loop
              />
              <div className="mt-5 flex gap-4">
                <button
                  className="bg-red-500 rounded-md text-white"
                  onClick={() => this.deleteVideo(videoURL)}
                >
                  <p className="p-2">Delete</p>
                </button>
                <a
                  className="bg-blue-400 rounded-md text-white"
                  href={videoURL}
                >
                  {" "}
                  <p className="p-2">Download</p>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const RecordingVideo = (props) => {
  const { open, onClose } = props;

  const stopWebCam = (localStream) => {
    localStream?.getTracks().forEach((track) => track?.stop());
    onClose();
  };

  return (
    <div>
      {/* <Button variant="outlined" onClick={handleClickOpen}>
        Open alert dialog
      </Button> */}
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        Width="xl"
        fullWidth
      >
        <DialogTitle id="alert-dialog-title">
          {"Send Video to your Friend"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <HomePage />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Send</Button>
          <Button
            onClick={() => {
              stopWebCam();
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
