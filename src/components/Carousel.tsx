import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Video } from "../types";
import { useResponsiveItemWidth } from "../hooks";
import { VideoCard } from "./VideoCard";

const VideoCarousel = ({ sampleVideos }: { sampleVideos: Video[] }) => {
  const [currentIndex, setCurrentIndex] = useState(sampleVideos.length);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const itemWidth = useResponsiveItemWidth();

  const extendedVideos = [...sampleVideos, ...sampleVideos, ...sampleVideos];
  const getActualVideoIndex = (index: number) =>  index % sampleVideos.length;
  const getVideoData = (index: number) => sampleVideos[getActualVideoIndex(index)];
  

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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") handleStep("prev");
      if (e.key === "ArrowRight") handleStep("next");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleStep = (direction: 'next' | 'prev') => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    setCurrentIndex((prev) => {
      const newIndex = direction === 'next' ? prev + 1 : prev - 1;
      const shouldReset =
        direction === 'next'
          ? newIndex >= extendedVideos.length - sampleVideos.length
          : newIndex < sampleVideos.length;
      const resetIndex =
        direction === 'next'
          ? sampleVideos.length
          : extendedVideos.length - sampleVideos.length - 1;

      if (shouldReset) {
        setTimeout(() => {
          setIsTransitioning(false);
          setCurrentIndex(resetIndex);
        }, 300);
      } else {
        setTimeout(() => setIsTransitioning(false), 300);
      }

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
               onClick={() => handleStep("prev")}
              disabled={isTransitioning}
              className="nav-button"
              aria-label="Previous video"
            >
              <ChevronLeft className="w-6 h-6 text-gray-600" />
            </button>

            <button
               onClick={() => handleStep("next")}
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
                  <VideoCard
                    videoRefs={videoRefs}
                    isCurrent={isCurrent}
                    isMuted={isMuted}
                    videoData={videoData}
                    index={index}
                    isPlaying={isPlaying}
                    toggleMute={toggleMute}
                    togglePlayPause={togglePlayPause}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default VideoCarousel;
