import { useState, useEffect, useRef } from 'react';
import useTimeout from './useTimeout';
import defaultIcon from '../icons/default-icon.jpg';

function useVideo(video, videoPlayer, controls, handleTheaterChange /* controls, timeline */) {
    const { timeoutFn, clearFn } = useTimeout();

    /**
     * VIDEO STATES
     */
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(1);
    const [bufferedChunks, setBufferedChunks] = useState(null);
    const [isHovering, setIsHovering] = useState(false);
    const [hiddenControls, setHiddenControls] = useState(false);
    const [hiddenDebug, setHiddenDebug] = useState(false);


    /**
     * PLAYBACK STATES
     */
    const [isPlaying, setIsPlaying] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [volume, setVolume] = useState(localStorage.getItem('vp-volume') || .8);
    const [muted, setMuted] = useState(false);
    const [isTheaterMode, setIsTheaterMode] = useState(localStorage.getItem('vp-theater-mode') === 'true' ? true : false);
    const [isPIPMode, setIsPIPMode] = useState(false);
    const [isStalled, setIsStalled] = useState(false);

    const [mediaSessionRegistered, setMediaSessionRegistered] = useState(false);
    const playingStateRef = useRef(isPlaying);


    /**
     * VIDEO EVENTS
     */
    // First load 
    useEffect(() => {
        handleTheaterChange(isTheaterMode);

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
        video.current.currentTime = 55;
        video.current.volume = volume;

        videoPlayer.current.focus();
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

        // Tab - Handle mouse move
        if (e.keyCode === 9) return handleMouseMove();

        // If spacebar or enter was pressed on button
        if (e.target.tagName === 'BUTTON' && (e.keyCode === 32 || e.keyCode === 13)) {
            // Simulate pointer click
            e.target.dispatchEvent(new PointerEvent('pointerdown', { bubbles: true }));
            e.target.dispatchEvent(new PointerEvent('pointerup', { bubbles: true }));
            return;
        }

        // Spacebar or P - Toggle playback
        if (e.keyCode === 32 || e.keyCode === 80) return togglePlayback();

        // I - Toggle picture-in-picture
        if (e.keyCode === 73) return togglePIPMode();
    }


    /**
     * MOUSE EVENTS 
     */
    let lastTimeout = 0;

    // Handle mouse enter/leave
    const handleMouseEnterLeave = (e) => {
        if (e.type === 'mouseenter') {
            setIsHovering(true);
            setHiddenControls(false);
            // Mouse move handles timeout
        } else {
            // Exiting video player
            clearFn('hideControls');
            setIsHovering(false);

            if(isPlaying && !controls.current.matches(':focus-within'))
                setHiddenControls(true);
        }
    }

    // Handle mouse move
    const handleMouseMove = () => {
        if(lastTimeout + 500 > Date.now()) return;
        lastTimeout = Date.now();

        setHiddenControls(false);
        timeoutFn('hideControls', hideControlsTimeoutCallback, 2000);
    }

    const hideControlsTimeoutCallback = () => {

        if(isPlaying)
            setHiddenControls(true);
    }


    // Handle waiting
    const handleWaitingPlaying = (e) => {
        if (e.type === 'waiting') {
            timeoutFn('stalled', stalledTimeoutCallback, 500);
        } else {
            clearFn('stalled');
            setIsStalled(false);
        }
    }
    
    const stalledTimeoutCallback = () => {
        setIsStalled(true);
    }




    /**
     * VIDEO METHODS
     */
    const togglePlayback = (e) => {
        if (!mediaSessionRegistered && 'mediaSession' in navigator)
            registerMediaSession();

        handleMouseMove();
        console.log('Toggle playback', e);
        if(e === undefined || e.button === 0 || e.action === 'play' || e.action === 'pause') {
            console.log('Actual state', isPlaying, 'New state', !isPlaying);
            setIsPlaying(!isPlaying);
        }
    }
    const changeVolume = (newVolume) => { video.current.volume = newVolume; }
    const changeVideoTime = (newTime) => { video.current.currentTime = newTime; }
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
        handleMouseMove();
        if(video.current.currentTime + skipStep > video.current.duration) {
            video.current.currentTime = video.current.duration;
        } else {
            video.current.currentTime += skipStep;
        }
    }
    const skipBackward = () => {
        handleMouseMove();
        if(video.current.currentTime - skipStep < 0) {
            video.current.currentTime = 0;
        } else {
            video.current.currentTime -= skipStep;
        }
    }

    // Increase/decrease volume
    let volumeStep = 0.1;

    const increaseVolume = () => {
        handleMouseMove();
        if(video.current.volume + volumeStep > 1) {
            video.current.volume = 1;
        } else {
            video.current.volume += volumeStep;
        }
    }
    const decreaseVolume = () => {
        handleMouseMove();
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

    // Register media session
    const registerMediaSession = () => {
        setMediaSessionRegistered(true);

        // Register media session
        navigator.mediaSession.metadata = new MediaMetadata({
            title: 'Test video',
            artist: 'Test artist',
            artwork: [
                { src: defaultIcon, type: 'image/jpg' },
            ]
        });

        navigator.mediaSession.setActionHandler('play', togglePlayback);
        navigator.mediaSession.setActionHandler('pause', togglePlayback);
        navigator.mediaSession.setActionHandler('previoustrack', () => { console.log('Previous track'); });
        navigator.mediaSession.setActionHandler('nexttrack', () => { console.log('Next track'); });
    }



    /**
     * STATE EFFECTS
     */
    // Play/Pause
    useEffect(() => {
        console.log('Play/Pause', isPlaying);
        playingStateRef.current = isPlaying;

        if (isPlaying) {
            video.current.play();
            if (mediaSessionRegistered)
                navigator.mediaSession.playbackState = 'playing';
        } else {
            video.current.pause();
            if (mediaSessionRegistered)
                navigator.mediaSession.playbackState = 'paused';
        }
    }, [isPlaying]);

    // Volume and muted
    useEffect(() => {
        localStorage.setItem('vp-volume', volume);
    }, [volume, /* isMuted */]);

    // Theater mode
    useEffect(() => {
        localStorage.setItem('vp-theater-mode', isTheaterMode);
    }, [isTheaterMode]);


    return {
        // States
        currentTime, duration, bufferedChunks, isHovering,
        hiddenControls, hiddenDebug,
        isPlaying, isFullscreen, volume, muted, isTheaterMode,isPIPMode,
        isStalled,

        // Events
        initialLoad,
        handleProgress,
        handlePlay,
        handlePause,
        handleVolume,
        handleContextMenu,
        handleInput,
        handleWaitingPlaying,

        // Mouse events
        handleMouseEnterLeave,
        handleMouseMove,

        // Methods
        togglePlayback,
        toggleFullscreen,
        changeVolume,
        changeVideoTime,
        toggleTheaterMode,
        togglePIPMode
    };
}


export default useVideo;