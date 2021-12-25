/// <reference types="dom-mediacapture-record" />
export declare type Status = "recording" | "idle" | "error" | "stopped" | "paused" | "permission-requested";
declare const useScreenRecorder: ({ options, audio, }: {
    options?: MediaRecorderOptions | undefined;
    audio?: boolean | undefined;
}) => {
    blob: Blob | null;
    blobUrl: string | null;
    error: any;
    pauseRecording: () => void;
    resetRecording: () => void;
    resumeRecording: () => void;
    startRecording: () => Promise<void>;
    status: Status;
    stopRecording: () => void;
    streams: {
        audio?: MediaStreamTrack | null | undefined;
        screen?: MediaStreamTrack | null | undefined;
    };
};
export default useScreenRecorder;
