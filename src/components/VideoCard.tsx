import type { Video } from "../types";

export const VideoCard = ({
  videoData,
  index,
  isCurrent,
  videoRefs,
  isMuted,
  toggleMute,
  togglePlayPause,
  isPlaying,
}: {
  videoData: Video;
  index: number;
  isCurrent: boolean;
  videoRefs: React.RefObject<(HTMLVideoElement | null)[]>;

  isMuted: boolean;
  toggleMute: () => void;
  togglePlayPause: () => void;
  isPlaying: boolean;
}) => {




  return (
    <div
      key={`${videoData.id}-${index}`}
      className={`flex-shrink-0 mr-6 transition-all duration-300 ease-out`}
      role="group"
      aria-label={`Video card ${index + 1}`}
      aria-current={isCurrent ? "true" : undefined}
    >
      <div
        className={`h-[532px] relative border-4 bg-white rounded-2xl shadow-lg overflow-hidden ${
          isCurrent ? " border-cozey-sky-bold" : " border-transparent"
        } transition-shadow duration-300`}
      >
        <div className="w-72 md:w-80 h-full relative">
          <video
           ref={(el) => {
            if (el) {
              videoRefs.current[index] = el;
              el.muted = isMuted;
            }
          }}
            className="w-full h-full object-cover"
            loop
            autoPlay={isCurrent}
            muted={isMuted}
            preload="auto"
            playsInline
            poster={videoData.thumbnail}
            aria-label={`Video titled ${videoData.title}`}

          >
            <source src={videoData.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          {/* Control buttons on current video */}
          {isCurrent && (
            <div className="absolute inset-0 flex flex-col bottom-3 gap-3 mr-auto w-full justify-end  items-end pr-2 ">
              <button aria-label={isMuted ? "Unmute video" : "Mute video"} onClick={toggleMute}>
                <img
                  className="control-btn"
                  src={
                    isMuted
                      ? "/assets/videos/sound-off.svg"
                      : "/assets/videos/sound-on.svg"
                  }
                  alt="Sound Control"
                />
              </button>
              <button
                onClick={togglePlayPause}
                aria-label={isPlaying ? "Pause video" : "Play video"}
                className="backdrop-blur-sm transition-all duration-200  hover:cursor-pointer"
              >
                <img
                  src={
                    isPlaying
                      ? "/assets/videos/pause.svg"
                      : "/assets/videos/play.svg"
                  }
                  alt="Video Control"
                />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Video title */}
      <div className="p-4">
        <h3 className="text-sm font-medium text-midnight-balanced" aria-live="polite">
          {videoData.title}
        </h3>
      </div>
    </div>
  );
};
