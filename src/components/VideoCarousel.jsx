import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
gsap.registerPlugin(ScrollTrigger);

import { forwardRef, useEffect, useRef, useState } from "react";

import { hightlightsSlides } from "../constants";
import { pauseImg, replayImg } from "@/utils";

const VideoCaraouselContainer = ({children}) => {
    return (
        <div className="relative shrink-0 sm:w-[70vw] w-[88vw] md:h-[70vh] sm:h-[50vh] h-[35vh]">
            {children}
        </div>
    );
};

const VideoCard = forwardRef(
    (
        {
            video,
            isLast,
            handleEnd,
            handleEndAtLast,
            onPlay,
            onLoadedMetadata,
            onEnded,
            children,
        },
        ref
    ) => {
        return (
            <div id="slider" className="w-full h-full flex-center bg-black rounded-3xl overflow-hidden">
                <video
                    id="video"
                    playsInline={true}
                    className={`${
                        video.id === 2 && "translate-x-44"
                      } pointer-events-none`}
                    preload="auto"
                    muted
                    ref={ref}
                    onEnded={() => (isLast ? handleEndAtLast() : handleEnd())}
                    onPlay={onPlay}
                    onLoadedMetadata={onLoadedMetadata}
                    onEnded={onEnded}
                >
                    <source src={video} alt="" />
                </video>
                {children}
            </div>
        );
    }
);

const VideoCardTitle = ({titles}) => {
    return (
        <div className="absolute top-12 left-[5%] z-10">
            {titles.map((text, i) => (
                <p key={i} className="md:text-2xl text-xl font-medium">
                    {text}
                </p>
            ))}
        </div>
    );
};


const VideoCardControlOverlay = ({
    isLastVideo,
    isPlaying,
    pause,
    play,
    restart,
    isEnd
}) => {

    console.log('id', isPlaying , isLastVideo, isEnd)

    const handleClick = () => {
        if(isPlaying) {
            pause()
        }
        else {
            isLastVideo?
            isEnd ? restart(): play():
            play();
        }
    }

    return <div onClick={handleClick} className="absolute z-10 flex-center w-full h-full bg-black/40 backdrop-blur-sm  opacity-0 hover:opacity-100">
        {
            isPlaying ? 
            <img src={pauseImg} width={40} height={40}/>:
            isLastVideo ? 
                isEnd ? 
                <img src={replayImg} width={40} height={40}/>:
                <img src={pauseImg} width={40} height={40}/>:
                <img src={pauseImg} width={40} height={40}/>

        }
    </div>
}
const VideoCarousel = ({
    slides = hightlightsSlides,
    loop = false,
}) => {
    const videoRef = useRef([]);
    const [video, setVideo] = useState({
        startPlay: false,
        isPlaying: false,
        videoId: 0,
        isEnd: false,
        isLastVideo: false,
    });

    const [loadedData, setLoadedData] = useState([]);

    const { videoId, isPlaying, startPlay , isEnd , isLastVideo } = video;

    console.log(videoId , isPlaying , isLastVideo, isEnd)

    // GSAP animation to scroll the carousel
    useGSAP(() => {
        gsap.to("#slider", {
            transform: `translateX(${-100 * videoId}%)`,
            duration: 2,
            ease: "power2.inOut",
        });

        gsap.to("#video", {
            scrollTrigger: {
                trigger: "#video",
                toggleActions: "restart none none none",
            },
            onComplete: () => {
                setVideo((prev) => ({
                    ...prev,
                    isPlaying: true,
                    startPlay: true,
                }));
            },
        });
    }, [videoId]);

    // Handle video play/pause
    useEffect(() => {
        if (loadedData.length > slides.length - 2) {
            if (!isPlaying) {
                videoRef.current[videoId].pause();
            } else {
                startPlay && videoRef.current[videoId].play();
            }
        }
    }, [startPlay, videoId, isPlaying, loadedData]);

    const handleProcess = (type, i) => {
        switch (type) {
            case "video-end":
                // When a video ends, move to the next video
                // We will reset the videoId back to 0 when reaching the last video
                setVideo((prev) => ({
                    ...prev,
                    videoId:  loop ? (i + 1) % slides.length: i+1  , // Loop back to first video when reaching the end
                    isEnd: true,
                    

                }));
                break;

            case "video-last":
                setVideo((prev) => ({ ...prev, isLastVideo: true, isEnd:true, isPlaying: loop}));
                break;

            case "pause":
                setVideo((prev) => ({ ...prev, isPlaying: false }));
                break;

            case "play":
                setVideo((prev) => ({ ...prev, isPlaying: true}));
                break;
            case "restart" : 
            setVideo((prev) => ({ 
                ...prev, 
                videoId:0,
                isEnd:false,
                // isPlaying: true,
                isLastVideo:false
             }));
            break;

            default:
                return video;
        }
    };

    const handleLoadedMetaData = (i, e) => setLoadedData((prev) => [...prev, e]);


    return (
        <>
            <div className="carousel-container flex flex-row items-center gap-7">
                {slides?.map((slide, i) => (
                    <VideoCaraouselContainer key={i}>
                        <VideoCard
                            video={slide.video}
                            isLast={i === slides.length - 1} // Mark the last slide as "isLast"
                            handleEnd={null}
                            handleEndAtLast={null}
                            onPlay={null}
                            ref={(el) => (videoRef.current[i] = el)}
                            onEnded={() =>
                                i !== slides.length - 1
                                    ? handleProcess("video-end", i)
                                    : handleProcess("video-last")
                            }
                            onPlay={() => setVideo((prev) => ({ ...prev, isPlaying: true }))}
                            onLoadedMetadata={(e) => handleLoadedMetaData(i, e)}
                        >
                            <VideoCardTitle titles={slide.textLists} />
                            <VideoCardControlOverlay
                                isEnd={isEnd}
                                isLastVideo={isLastVideo}
                                isPlaying={isPlaying}
                                pause={() =>handleProcess("pause" , i)}
                                play={() =>handleProcess("play" , i)}
                                restart={() =>handleProcess("restart")}

                            />
                        </VideoCard>
                    </VideoCaraouselContainer>
                ))}
            </div>
        </>
    );
};

export default VideoCarousel;
