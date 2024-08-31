import { useRef, useState, useEffect } from "react";

function App() {
    const videoRef = useRef(null);
    const [playing, setPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState(0);
    const [videoTime, setVideoTime] = useState(0);
    const [progress, setProgress] = useState(0);
    const [muted, setMuted] = useState(false);
    const [volume, setVolume] = useState(1); // Volume range from 0 to 1
    const [showPoster, setShowPoster] = useState(true);

    useEffect(() => {
        const interval = setInterval(() => {
            if (videoRef.current) {
                setCurrentTime(videoRef.current.currentTime);
                setProgress((videoRef.current.currentTime / videoTime) * 100);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [videoTime]);

    const videoHandler = (control) => {
        if (control === "play") {
            videoRef.current.play();
            setPlaying(true);
            setVideoTime(videoRef.current.duration);
            setShowPoster(false);
        } else if (control === "pause") {
            videoRef.current.pause();
            setPlaying(false);
        }
    };

    const fastForward = () => {
        videoRef.current.currentTime += 5;
    };

    const revert = () => {
        videoRef.current.currentTime -= 5;
    };

    const handleVideoEnd = () => {
        setPlaying(false);
        setShowPoster(true);
    };

    const toggleMute = () => {
        setMuted(!muted);
        videoRef.current.muted = !muted;
    };

    const handleVolumeChange = (e) => {
        const newVolume = parseFloat(e.target.value);
        setVolume(newVolume);
        videoRef.current.volume = newVolume;
        setMuted(newVolume === 0); // Mute icon changes when volume is 0
    };

    return (
        <div className="tw-flex tw-items-center tw-justify-center tw-w-screen tw-h-screen tw-bg-black">
            <div className="tw-relative tw-w-full tw-max-w-md tw-h-full tw-max-h-screen">
                <video
                    ref={videoRef}
                    className="tw-w-full tw-h-full tw-object-cover tw-aspect-[9/16]"
                    src="https://www.w3schools.com/html/mov_bbb.mp4"
                    onEnded={handleVideoEnd}
                    controls={false}
                    poster="https://www.w3schools.com/html/pic_trulli.jpg" // Add poster
                ></video>

                {showPoster && (
                    <div className="tw-absolute tw-inset-0 tw-flex tw-items-center tw-justify-center">
                        <button
                            onClick={() => videoHandler("play")}
                            className="tw-w-16 tw-h-16 tw-bg-orange-500 tw-rounded-full tw-flex tw-items-center tw-justify-center tw-shadow-lg tw-focus:outline-none"
                        >
                            <img
                                className="tw-w-8 tw-h-8"
                                src="/play.svg"
                                alt="Play"
                            />
                        </button>
                    </div>
                )}

                <div className="tw-absolute tw-bottom-0 tw-left-0 tw-right-0 tw-bg-gradient-to-t tw-from-black tw-via-black/80 tw-to-transparent tw-p-4">
                    <div className="tw-flex tw-items-center tw-justify-between tw-mb-2">
                        <p className="tw-text-white tw-text-sm">
                            {Math.floor(currentTime / 60) +
                                ":" +
                                ("0" + Math.floor(currentTime % 60)).slice(-2)}
                        </p>
                        <div className="tw-bg-gray-700 tw-rounded-full tw-w-full tw-h-1 tw-mx-2 tw-relative">
                            <div
                                style={{ width: `${progress}%` }}
                                className="tw-bg-red-500 tw-rounded-full tw-h-full"
                            ></div>
                        </div>
                        <p className="tw-text-white tw-text-sm">
                            {Math.floor(videoTime / 60) +
                                ":" +
                                ("0" + Math.floor(videoTime % 60)).slice(-2)}
                        </p>
                    </div>

                    <div className="tw-flex tw-items-center tw-justify-between">
                        <div className="tw-flex tw-items-center">
                            <img
                                onClick={revert}
                                className="tw-w-8 tw-h-8 tw-cursor-pointer"
                                alt="Rewind 5 seconds"
                                src="/backward-5.svg"
                            />
                            <img
                                onClick={() =>
                                    videoHandler(playing ? "pause" : "play")
                                }
                                className="tw-w-8 tw-h-8 tw-cursor-pointer tw-mx-4"
                                alt={playing ? "Pause" : "Play"}
                                src={playing ? "/pause.svg" : "/play.svg"}
                            />
                            <img
                                onClick={fastForward}
                                className="tw-w-8 tw-h-8 tw-cursor-pointer"
                                alt="Forward 5 seconds"
                                src="/forward-5.svg"
                            />
                        </div>

                        <div className="tw-flex tw-items-center">
                            <img
                                onClick={toggleMute}
                                className="tw-w-8 tw-h-8 tw-cursor-pointer"
                                alt={muted ? "Unmute" : "Mute"}
                                src={muted ? "/mute.svg" : "/unmute.svg"}
                            />
                            <input
                                type="range"
                                min="0"
                                max="1"
                                step="0.01"
                                value={volume}
                                onChange={handleVolumeChange}
                                className="tw-w-24 tw-h-1 tw-ml-2 tw-bg-gray-700 tw-cursor-pointer"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
