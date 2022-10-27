import React, { useState, useRef, useEffect } from 'react';
import style from './styles/VideoPlayer.module.css';
import useVideo from './hooks/useVideo.js';

// Partial components
import Buttons from './partials/Buttons/Buttons.js';
import Timeline from './partials/Timeline/Timeline.js';


const VideoPlayer = ({
    // Import props
    src,
    backgroundColor,
    progressBarColor,
    handleTheaterModeChange
}) => {
    const videoRef = useRef(null);
    const videoPlayerRef = useRef(null);

    // useVideo custom hook
    const {
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
    } = useVideo(videoRef);


    const isTouchDevice = () => {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0));
    }


    return (
        <div
            className={style.VideoPlayer
                + (hiddenControls ? ` ${style.HiddenControls}` : '')}
            style={{ backgroundColor: backgroundColor }}
            onMouseEnter={handleMouseEnterLeave}
            onMouseLeave={handleMouseEnterLeave}
            onMouseMove={handleMouseMove}
        >
            {/* DEBUG INFO */}
            <div className={style.DebugInfo}>
                <strong>Video states</strong>
                <p>Video progress: {Math.round(currentTime * 10) / 10} / {Math.round(duration * 10) / 10}</p>
                <p>Buffered chunks: {bufferedChunks.length}</p>
                <p>Is hovering video: {isHovering.toString()}</p>
                <p>Is controls hidden: {hiddenControls.toString()}</p>

                <strong>Playback states</strong>
                <p>Is playing: {isPlaying.toString()}</p>
                <p>Is fullscreen: {isFullscreen.toString()}</p>
                <p>Volume: {Math.round(volume / 1 * 1000) / 10 + ' %'}</p>
            </div>


            {/* VIDEO ELEMENT */}
            <video
                ref={videoRef}
                src={src}
                className={style.Video}
                /* controls */
                muted

                onLoadedMetadata={initialLoad}
                onProgress={handleProgress}
                onPlay={handlePlay}
                onPause={handlePause}
                onVolumeChange={handleVolume}
                onClick={togglePlayback}
            ></video>


            {/* CONTROLS */}
            <div
                className={style.Controls
                    + (hiddenControls ? ` ${style.Hidden}` : '')
                    + (isTouchDevice() ? ` ${style.Touch}` : '')}
            >
                <Buttons
                    isTouchDevice={isTouchDevice}
                    isPlaying={isPlaying}
                    togglePlayback={togglePlayback}
                    volume={volume}
                    changeVolume={changeVolume}
                />

                <Timeline

                />
            </div>
        </div>
    );
}


export default VideoPlayer;