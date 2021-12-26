'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var react = require('react');

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

function __generator(thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
}

/** @deprecated */
function __spreadArrays() {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
}

var useScreenRecorder = function (_a) {
    var options = _a.options, _b = _a.audio, audio = _b === void 0 ? false : _b;
    var _c = react.useState(null), blobUrl = _c[0], setBlobUrl = _c[1];
    var _d = react.useState(null), blob = _d[0], setBlob = _d[1];
    var _e = react.useState(), error = _e[0], setError = _e[1];
    var _f = react.useState(), mediaRecorder = _f[0], setMediaRecorder = _f[1];
    var _g = react.useState("permission-requested"), status = _g[0], setStatus = _g[1];
    var _h = react.useState({ audio: null, screen: null }), streams = _h[0], setStreams = _h[1];
    react.useEffect(function () {
        if (!mediaRecorder)
            return;
        mediaRecorder.ondataavailable = function (event) {
            var url = window.URL.createObjectURL(event.data);
            setBlobUrl(url);
            setBlob(event.data);
        };
    }, [mediaRecorder]);
    var requestMediaStream = function () { return __awaiter(void 0, void 0, void 0, function () {
        var displayMedia, userMedia, tracks, stream, mediaRecorder_1, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 4, , 5]);
                    return [4 /*yield*/, navigator.mediaDevices.getDisplayMedia()];
                case 1:
                    displayMedia = _a.sent();
                    userMedia = void 0;
                    if (!audio) return [3 /*break*/, 3];
                    return [4 /*yield*/, navigator.mediaDevices.getUserMedia({ audio: audio })];
                case 2:
                    userMedia = _a.sent();
                    _a.label = 3;
                case 3:
                    tracks = __spreadArrays(displayMedia === null || displayMedia === void 0 ? void 0 : displayMedia.getTracks(), userMedia === null || userMedia === void 0 ? void 0 : userMedia.getTracks());
                    if (tracks)
                        setStatus("idle");
                    stream = new MediaStream(tracks);
                    mediaRecorder_1 = new MediaRecorder(stream, options);
                    setMediaRecorder(mediaRecorder_1);
                    setStreams({
                        audio: 
                        // @ts-ignore
                        (userMedia === null || userMedia === void 0 ? void 0 : userMedia.getTracks().find(function (track) { return track.kind === "audio"; })) ||
                            null,
                        screen: displayMedia
                            .getTracks()
                            .find(function (track) { return track.kind === "video"; }) || null,
                    });
                    return [2 /*return*/, mediaRecorder_1];
                case 4:
                    e_1 = _a.sent();
                    setError(e_1);
                    setStatus("error");
                    return [3 /*break*/, 5];
                case 5: return [2 /*return*/];
            }
        });
    }); };
    var stopRecording = function () {
        if (!mediaRecorder)
            throw Error("No media stream!");
        mediaRecorder === null || mediaRecorder === void 0 ? void 0 : mediaRecorder.stop();
        setStatus("stopped");
        mediaRecorder.stream.getTracks().map(function (track) {
            track.stop();
        });
        setMediaRecorder(null);
    };
    var startRecording = function () { return __awaiter(void 0, void 0, void 0, function () {
        var recorder;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    recorder = mediaRecorder;
                    if (!!mediaRecorder) return [3 /*break*/, 2];
                    return [4 /*yield*/, requestMediaStream()];
                case 1:
                    recorder = _a.sent();
                    _a.label = 2;
                case 2:
                    recorder.start();
                    setStatus("recording");
                    return [2 /*return*/];
            }
        });
    }); };
    var pauseRecording = function () {
        if (!mediaRecorder)
            throw Error("No media stream!");
        mediaRecorder === null || mediaRecorder === void 0 ? void 0 : mediaRecorder.pause();
        setStatus("paused");
    };
    var resumeRecording = function () {
        if (!mediaRecorder)
            throw Error("No media stream!");
        mediaRecorder === null || mediaRecorder === void 0 ? void 0 : mediaRecorder.resume();
        setStatus("recording");
    };
    var resetRecording = function () {
        setBlobUrl(null);
        setError(null);
        setMediaRecorder(null);
        setStatus("idle");
    };
    return {
        blob: blob,
        blobUrl: blobUrl,
        error: error,
        pauseRecording: pauseRecording,
        resetRecording: resetRecording,
        resumeRecording: resumeRecording,
        startRecording: startRecording,
        status: status,
        stopRecording: stopRecording,
        streams: streams,
    };
};

exports.default = useScreenRecorder;
//# sourceMappingURL=index.js.map
