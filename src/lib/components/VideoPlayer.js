import React, { useState, useRef, useEffect } from 'react';
import style from './VideoPlayer.module.css';
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
        currentTime, duration, bufferedChunks, isHovering,
        hiddenControls, hiddenDebug,
        isPlaying, isFullscreen, volume, muted,

        // Events
        initialLoad,
        handleProgress,
        handlePlay,
        handlePause,
        handleVolume,
        handleContextMenu,

        // Mouse events
        handleMouseEnterLeave,
        handleMouseMove,

        // Methods
        togglePlayback,
        toggleFullscreen,
        changeVolume
    } = useVideo(videoRef, videoPlayerRef);


    const isTouchDevice = () => {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0));
    }


    return (
        <div
            ref={videoPlayerRef}
            className={style.VideoPlayer
                + (hiddenControls ? ` ${style.HiddenControls}` : '')}
            style={{ backgroundColor: backgroundColor }}
            onMouseEnter={handleMouseEnterLeave}
            onMouseLeave={handleMouseEnterLeave}
            onMouseMove={handleMouseMove}
            onContextMenu={handleContextMenu}
        >
            {/* DEBUG INFO */}
            <div className={style.DebugInfo
                + ` ${hiddenDebug ? style.Hidden : ''}`}>
                <strong>Video states</strong>
                <p>Video progress: {Math.round(currentTime * 10) / 10} / {Math.round(duration * 10) / 10}</p>
                <p>Buffered chunks: {bufferedChunks.length}</p>
                <p>Is hovering video: {isHovering.toString()}</p>
                <p>Controls hidden: {hiddenControls.toString()}</p>
                <p>Is browser touch: {isTouchDevice().toString()}</p>

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
                    isFullscreen={isFullscreen}
                    togglePlayback={togglePlayback}
                    toggleFullscreen={toggleFullscreen}
                    volume={volume}
                    changeVolume={changeVolume}

                    currentTime={currentTime}
                    duration={duration}
                />

                <Timeline

                />
            </div>
        </div>
    );
}


export default VideoPlayer;