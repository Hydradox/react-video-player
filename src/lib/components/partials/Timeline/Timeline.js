import { useState, useRef } from 'react';
import style from './Timeline.module.css';
import useTimeline from '../../hooks/useTimeline';


function Timeline({ videoPlayerRef, videoRef, currentTime, duration, bufferedChunks, progressBarColor, changeVideoTime, lowResSrc, formatTime }) {
    const timelineRef = useRef(null);
    const hoverModalRef = useRef(null);
    const lowVideoRef = useRef(null);

    const {
        // States
        thumbOffset,
        isDraggingTimeline,

        isHovered,
        lowVideoTime,
        lowVideoOffset,

        // Methods
        mapBufferedChunks,
        setIsHovered
    } = useTimeline(videoPlayerRef, videoRef, timelineRef, lowVideoRef, hoverModalRef, style, bufferedChunks, currentTime, duration, changeVideoTime);




    return (
        <div
            className={style.TimelineWrapper + (isHovered || isDraggingTimeline ? ' ' + style.IsHovered : '')}
            ref={timelineRef}

            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div className={style.Timeline}>
                <div className={style.BufferedChunksWrapper}>{mapBufferedChunks()}</div>

                <div className={style.CurrentTime} style={{
                    width: `${thumbOffset}%`,
                    backgroundColor: progressBarColor
                }}></div>

                <div className={style.Thumb} style={{
                    left: `${thumbOffset}%`,
                    backgroundColor: progressBarColor
                }}></div>
            </div>

            <div className={style.HoverModal + (isHovered ? ' ' + style.Visible : '')}
                ref={hoverModalRef}
                style={{
                    left: `${lowVideoOffset}`
                }}
            >
                {lowResSrc && <video
                    ref={lowVideoRef}
                    className={style.HoverModalVideo}
                    src={lowResSrc}
                ></video>}

                <span>{formatTime(lowVideoTime)}</span>
            </div>

            <div className={style.TimelineBackground}></div>
        </div>
    );
}


export default Timeline;