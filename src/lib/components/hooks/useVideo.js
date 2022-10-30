import { useState, useEffect } from 'react';

function useVideo(video, videoPlayer, handleTheaterChange /* videoPlayer, video, controls, timeline */) {

    /**
     * VIDEO STATES
     */
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(1);
    const [bufferedChunks, setBufferedChunks] = useState([]);
    const [isHovering, setIsHovering] = useState(false);
    const [hiddenControls, setHiddenControls] = useState(false);
    const [hiddenDebug, setHiddenDebug] = useState(false);


    /**
     * PLAYBACK STATES
     */
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [volume, setVolume] = useState(.8);
    const [muted, setMuted] = useState(false);
    const [isTheaterMode, setIsTheaterMode] = useState(false);
    const [isPIPMode, setIsPIPMode] = useState(false);


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
    const handleVolume = (e) => {
        setVolume(video.current.volume);
    }

    const handleContextMenu = (e) => {
        // Detect shift
        if (e.shiftKey) {
            e.preventDefault();
            setHiddenDebug(!hiddenDebug);
        }
    }

    // Handle keyboard input on video player
    const handleInput = (e) => {
        // If key was pressend on button
        if (e.target.tagName === 'BUTTON') return;

        // Spacebar - Toggle playback
        if (e.keyCode === 32) return togglePlayback();

        // Right arrow/Left arrow - Seek forward/backward
        if (e.keyCode === 39) return skipForward();
        if (e.keyCode === 37) return skipBackward();

        // Up arrow/Down arrow - Increase/decrease volume
        if (e.keyCode === 38) return increaseVolume();
        if (e.keyCode === 40) return decreaseVolume();

        // F - Toggle fullscreen
        if (e.keyCode === 70) return toggleFullscreen();

        // M - Toggle mute
        // if (e.keyCode === 77) return toggleMute();

        // T - Toggle theater mode
        if (e.keyCode === 84) return toggleTheaterMode();
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
        /*console.log('Mouse enter/leave event');

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
        }*/
    }

    // Handle mouse move
    const handleMouseMove = (e) => {
        /*if(lastMouseMove + 500 < Date.now()) {
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
        }*/
    }




    /**
     * VIDEO METHODS
     */
    const togglePlayback = () => { setIsPlaying(!isPlaying); }
    const changeVolume = (newVolume) => { video.current.volume = newVolume; }
    const toggleMute = () => { video.current.muted = !video.current.muted; }

    // Toggle fullscreen
    const toggleFullscreen = () => {
        if (isFullscreen) {
            document.exitFullscreen();
        } else {
            videoPlayer.current.requestFullscreen();
        }
    }

    // Skip forward/backward
    let skipStep = 5;

    const skipForward = () => {
        if(video.current.currentTime + skipStep > video.current.duration) {
            video.current.currentTime = video.current.duration;
        } else {
            video.current.currentTime += skipStep;
        }
    }
    const skipBackward = () => {
        if(video.current.currentTime - skipStep < 0) {
            video.current.currentTime = 0;
        } else {
            video.current.currentTime -= skipStep;
        }
    }

    // Increase/decrease volume
    let volumeStep = 0.1;

    const increaseVolume = () => {
        if(video.current.volume + volumeStep > 1) {
            video.current.volume = 1;
        } else {
            video.current.volume += volumeStep;
        }
    }
    const decreaseVolume = () => {
        if(video.current.volume - volumeStep < 0) {
            video.current.volume = 0;
        } else {
            video.current.volume -= volumeStep;
        }
    }

    // Toggle theater mode
    const toggleTheaterMode = () => {
        handleTheaterChange(!isTheaterMode);
        setIsTheaterMode(!isTheaterMode);
    }
    // Toggle PIP mode
    const togglePIPMode = () => {
        if (document.pictureInPictureElement) {
            document.exitPictureInPicture();
            setIsPIPMode(false);
        } else if (document.pictureInPictureEnabled) {
            video.current.requestPictureInPicture();
            setIsPIPMode(true);
        }

        setIsPIPMode(!isPIPMode);
    }



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
        currentTime, duration, bufferedChunks, isHovering,
        hiddenControls, hiddenDebug,
        isPlaying, isFullscreen, volume, muted, isTheaterMode,isPIPMode,

        // Events
        initialLoad,
        handleProgress,
        handlePlay,
        handlePause,
        handleVolume,
        handleContextMenu,
        handleInput,

        // Mouse events
        handleMouseEnterLeave,
        handleMouseMove,

        // Methods
        togglePlayback,
        toggleFullscreen,
        changeVolume,
        toggleTheaterMode,
        togglePIPMode
    };
}


export default useVideo;