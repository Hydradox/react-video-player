import React, { useState, useRef, useEffect } from 'react';
import style from './VideoPlayer.module.css';
import useVideo from './hooks/useVideo.js';

// Partial components
import Buttons from './partials/Buttons/Buttons.js';
import Timeline from './partials/Timeline/Timeline.js';

// Default poster
import defaultPoster from './icons/default-poster.jpg';


const VideoPlayer = ({
    // Import props
    src,
    backgroundColor,
    progressBarColor,
    handleTheaterChange,
    poster
}) => {
    const videoRef = useRef(null);
    const videoPlayerRef = useRef(null);
    const controlsRef = useRef(null);

    // useVideo custom hook
    const {
        // States
        currentTime, duration, bufferedChunks, isHovering,
        hiddenControls, hiddenDebug,
        isPlaying, isFullscreen, volume, muted, isTheaterMode, isPIPMode,
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
    } = useVideo(videoRef, videoPlayerRef, controlsRef, handleTheaterChange);


    // Check touch device
    const isTouchDevice = () => {
        return (('ontouchstart' in window) ||
            (navigator.maxTouchPoints > 0));
    }


    // Check if handle theater mode change is a function
    const isHandleTheaterModeChangeFunction = () => {
        return (typeof handleTheaterChange === 'function');
    }


    return (
        <div
            ref={videoPlayerRef}
            tabIndex="0"
            className={style.VideoPlayer
                + (hiddenControls ? ` ${style.HiddenControls}` : '')}
            style={{ backgroundColor: backgroundColor }}
            onMouseEnter={handleMouseEnterLeave}
            onMouseLeave={handleMouseEnterLeave}
            onMouseMove={handleMouseMove}
            onContextMenu={handleContextMenu}
            onKeyDown={handleInput}
        >
            {/* DEBUG INFO */}
            <div className={style.DebugInfo
                + ` ${hiddenDebug ? style.Hidden : ''}`}>
                <strong>Video states</strong>
                <p>Video progress: {Math.round(currentTime * 10) / 10} / {Math.round(duration * 10) / 10}</p>
                <p>Buffered chunks: {bufferedChunks ? bufferedChunks.length : 0}</p>
                <p>Is hovering video: {isHovering.toString()}</p>
                <p>Controls hidden: {hiddenControls.toString()}</p>
                <p>Is browser touch: {isTouchDevice().toString()}</p>

                <strong>Playback states</strong>
                <p>Is playing: {isPlaying.toString()}</p>
                <p>Is fullscreen: {isFullscreen.toString()}</p>
                <p>Volume: {Math.round(volume / 1 * 1000) / 10 + ' %'}</p>
                <p>Is muted: {muted.toString()}</p>
                <p>Is theater mode: {isTheaterMode.toString()}</p>
                <p>Is PIP mode: {isPIPMode.toString()}</p>
                <p>Is stalled: {isStalled.toString()}</p>
            </div>


            {/* VIDEO ELEMENT */}
            <video
                ref={videoRef}
                src={src}
                className={style.Video}
                /* controls */
                poster={poster || defaultPoster}

                onLoadedMetadata={initialLoad}
                onProgress={handleProgress}
                onPlay={handlePlay}
                onPause={handlePause}
                onVolumeChange={handleVolume}
                onWaiting={handleWaitingPlaying}
                onPlaying={handleWaitingPlaying}

                // User driven events
                onPointerUp={togglePlayback}
            ></video>


            {/* CONTROLS */}
            <div
            ref={controlsRef}
                className={style.Controls
                    + (hiddenControls ? ` ${style.Hidden}` : '')
                    + (isTouchDevice() ? ` ${/*style.Touch*/''}` : '')}
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
                    isTheaterMode={isTheaterMode}
                    toggleTheaterMode={toggleTheaterMode}
                    isPIPMode={isPIPMode}
                    togglePIPMode={togglePIPMode}
                    isHandleTheaterModeChangeFunction={isHandleTheaterModeChangeFunction}
                />

                <Timeline
                    currentTime={currentTime}
                    duration={duration}
                    bufferedChunks={bufferedChunks}
                    progressBarColor={progressBarColor}
                    changeVideoTime={changeVideoTime}
                />
            </div>


            {/* LOADING SPINNER */}
            <div className={style.LoadingSpinner + ` ${isStalled ? style.Active : ''}`}>
                <div></div>
                <div></div>
                <div></div>
                <div></div>
            </div>
        </div>
    );
}


export default VideoPlayer;