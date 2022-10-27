import { useState, useEffect } from 'react';

function useVideo(video /* videoPlayer, video, controls, timeline */) {

    /**
     * VIDEO STATES
     */
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(1);
    const [bufferedChunks, setBufferedChunks] = useState([]);
    const [isHovering, setIsHovering] = useState(false);
    const [hiddenControls, setHiddenControls] = useState(false);


    /**
     * PLAYBACK STATES
     */
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [volume, setVolume] = useState(0);


    /**
     * VIDEO EVENTS
     */
    // First load 
    useEffect(() => {
        // Track video current time
        const currentTimeInterval = setInterval(() => {
            setCurrentTime(video.current.currentTime);
        }, 25); // 40 checks per second

        // Set fullscreen change listeners
        ['fullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange'].forEach(event => {
            document.addEventListener(event, handleFullscreenChange);
        });


        // Cleanup
        return () => {
            clearInterval(currentTimeInterval);
            ['fullscreenchange', 'mozfullscreenchange', 'webkitfullscreenchange', 'msfullscreenchange'].forEach(event => {
                document.removeEventListener(event, handleFullscreenChange);
            });
        }
    }, []);



    // Initial load
    const initialLoad = () => {
        setDuration(video.current.duration);
        video.current.currentTime = 35;
    }

    // On Progress
    const handleProgress = () => {
        setBufferedChunks(video.current.buffered);
    }

    // Handle fullscreen change
    const handleFullscreenChange = () => {
        if (document.fullscreenElement) {
            setIsFullscreen(true);
        } else {
            setIsFullscreen(false);
        }
    }

    // Handle play
    const handlePlay = () => { setIsPlaying(true); }
    // Handle pause
    const handlePause = () => { setIsPlaying(false); }

    // Handle volume change
    const handleVolume = () => {
        console.log('Volume:', video.current.volume);
        setVolume(video.current.volume);
    }


    /**
     * MOUSE EVENTS 
     */
    let mouseMoveTimeout;
    let lastMouseMove = 0;

    const clearMouseMoveTimeout = () => {
        console.log('Clearing mouse move timeout', mouseMoveTimeout);
        clearTimeout(mouseMoveTimeout);
        mouseMoveTimeout = null;
    }

    // Handle mouse enter/leave
    const handleMouseEnterLeave = (e) => {
        console.log('Mouse enter/leave event');

        if (e.type === 'mouseenter') {
            setIsHovering(true);
            setHiddenControls(false);
        } else {
            console.log('Mouse leave event');
            clearMouseMoveTimeout();
            setIsHovering(false);

            if(isPlaying) {
                setHiddenControls(true);
            }
        }
    }

    // Handle mouse move
    const handleMouseMove = (e) => {
        if(lastMouseMove + 500 < Date.now()) {
            console.log('Mouse move event', lastMouseMove);
            lastMouseMove = Date.now();
            setHiddenControls(false);

            // Clear all timeouts
            clearMouseMoveTimeout();

            // Set new timeout
            mouseMoveTimeout = setTimeout(() => {
                console.log('Mouse move timeout. is playing:', isPlaying, 'Timeout:', mouseMoveTimeout);

                if(!isPlaying) {
                    setHiddenControls(true);
                }
            }, 2000);
        }
    }




    /**
     * VIDEO METHODS
     */
    const togglePlayback = () => { setIsPlaying(!isPlaying); }
    const changeVolume = (newVolume) => { setVolume(newVolume); }




    /**
     * STATE EFFECTS
     */
    // Play/Pause
    useEffect(() => {
        if (isPlaying) {
            video.current.play();
        } else {
            video.current.pause();
        }
    }, [isPlaying]);



    return {
        // States
        currentTime, duration, bufferedChunks, isHovering, hiddenControls,
        isPlaying, isFullscreen, volume,

        // Events
        initialLoad,
        handleProgress,
        handlePlay,
        handlePause,
        handleVolume,

        // Mouse events
        handleMouseEnterLeave,
        handleMouseMove,
        // Methods
        togglePlayback,
        changeVolume
    };
}


export default useVideo;