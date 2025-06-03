import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Video } from "../types";

const VideoCarousel = ({ sampleVideos }: { sampleVideos: Video[] }) => {
  const [currentIndex, setCurrentIndex] = useState(sampleVideos.length);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [itemWidth, setItemWidth] = useState(320); // default mobile

  // multiple copies for seamless infinite scroll
  const extendedVideos = [...sampleVideos, ...sampleVideos, ...sampleVideos];

  useEffect(() => {
    // Auto-play the current video
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
        currentVideo.muted = isMuted;
      currentVideo.play();
      setIsPlaying(true);
    }

    // Pause all other videos
    videoRefs.current.forEach((video, index) => {
      if (video && index !== currentIndex) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [currentIndex, isMuted]);

  const goToNext = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const newIndex = prev + 1;

      // Check if we need to reset position seamlessly
      if (newIndex >= extendedVideos.length - sampleVideos.length) {
        // Reset to the beginning of the second set after transition
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(sampleVideos.length);
        }, 300);
        return newIndex;
      }

      setTimeout(() => setIsTransitioning(false), 300);
      return newIndex;
    });
  };

  const goToPrevious = () => {
    if (isTransitioning) return;

    setIsTransitioning(true);
    setCurrentIndex((prev) => {
      const newIndex = prev - 1;

      // Check if we need to reset position seamlessly
      if (newIndex < sampleVideos.length) {
        // Reset to the end of the second set after transition
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(extendedVideos.length - sampleVideos.length - 1);
        }, 300);
        return newIndex;
      }

      setTimeout(() => setIsTransitioning(false), 300);
      return newIndex;
    });
  };

  const togglePlayPause = () => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      if (isPlaying) {
        currentVideo.pause();
        setIsPlaying(false);
      } else {
        currentVideo.play();
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    const currentVideo = videoRefs.current[currentIndex];
    if (currentVideo) {
      const newMutedState = !isMuted;
      currentVideo.muted = newMutedState;
      setIsMuted(newMutedState);
    }
  };

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 768px)");
    const handleMediaChange = () => {
      setItemWidth(mediaQuery.matches ? 352 : 320);
    };
  
    handleMediaChange();
    mediaQuery.addEventListener("change", handleMediaChange);
    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, []);
  


  // Calculate the actual video index for display purposes
  const getActualVideoIndex = (index: number) => {
    return index % sampleVideos.length;
  };

  // Get the actual video data
  const getVideoData = (index: number) => {
    return sampleVideos[getActualVideoIndex(index)];
  };

  return (
    <div className="py-12 bg-fog-balanced">
        <section className="responsive">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl md:text-2xl font-semibold text-midnight-balanced">
          A day in the life
        </h2>
        <div className="flex gap-6">
          {/* Navigation arrows */}
          <button
            onClick={goToPrevious}
            disabled={isTransitioning}
            className="nav-button"
            aria-label="Previous video"
          >
            <ChevronLeft className="w-6 h-6 text-gray-600" />
          </button>

          <button
            onClick={goToNext}
            disabled={isTransitioning}
           className="nav-button"
            aria-label="Next video"
          >
            <ChevronRight className="w-6 h-6 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="relative overflow-hidden">
        {/* Main carousel container */}
        <div className="relative h-full">
          <div
            ref={containerRef}
            className={`flex ${
              isTransitioning
                ? "transition-transform duration-300 ease-out"
                : ""
            }`}
            style={{
             transform: `translateX(-${currentIndex * itemWidth}px)`,
            }}
          >
            {extendedVideos.map((_, index) => {
              const videoData = getVideoData(index);
              const isCurrent = index === currentIndex;

              return (
                <div
                  key={`${videoData.id}-${index}`}
                  className={`flex-shrink-0 mr-6 transition-all duration-300 ease-out`}
                >
                    <div  className={`h-[532px] relative border-4 bg-white rounded-2xl shadow-lg overflow-hidden ${
                      isCurrent ? " border-cozey-sky-bold" : " border-transparent"
                    } transition-shadow duration-300`}>

                    <div className="w-72 md:w-80 h-full relative">
                      <video
                        ref={(el) => (videoRefs.current[index] = el)}
                        className="w-full h-full object-cover"
                        loop
                        muted={isMuted}
                        playsInline
                        poster={videoData.thumbnail}
                      >
                        <source src={videoData.url} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                      {/* Control buttons on current video */}
                      {isCurrent && (
                        <div className="absolute inset-0 flex flex-col bottom-3 gap-3 mr-auto w-full justify-end  items-end pr-2 ">
                          <button onClick={toggleMute}>
                            <img
                            className="control-btn"
                              src={isMuted ? "/assets/videos/sound-off.svg" : "/assets/videos/sound-on.svg"}
                              alt="Sound Control"
                            />
                          </button>
                          <button
                            onClick={togglePlayPause}
                            className="backdrop-blur-sm transition-all duration-200  hover:cursor-pointer"
                          >
                         
                              <img
                                src={isPlaying ? "/assets/videos/pause.svg" : "/assets/videos/play.svg"}
                                alt="Video Control"
                              />
                           
                          </button>
                        </div>
                      )}
                    </div>
                    </div>

                    {/* Video title */}
                    <div className="p-4">
                      <h3 className="text-sm font-medium text-midnight-balanced ">
                        {videoData.title}
                      </h3>
                    </div>
              
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Indicator dots */}
      <div className="hidden justify-center space-x-2 mt-8">
        {sampleVideos.map((_, index) => {
          const actualIndex = getActualVideoIndex(currentIndex);
          return (
            <button
              key={index}
              onClick={() => setCurrentIndex(sampleVideos.length + index)}
              className={`w-2 h-2 rounded-full transition-all duration-200 ${
                actualIndex === index
                  ? "bg-blue-400 w-6"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
              aria-label={`Go to video ${index + 1}`}
            />
          );
        })}
      </div>
        </section>
    </div>
  );
};

export default VideoCarousel;
