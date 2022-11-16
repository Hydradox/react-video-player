import { useState, useRef } from 'react';
import style from './Timeline.module.css';
import useTimeline from '../../hooks/useTimeline';


function Timeline({ currentTime, duration, bufferedChunks, progressBarColor, changeVideoTime }) {
    const timelineRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const {
        // States
        thumbOffset,
        isDraggingTimeline,

        // Methods
        mapBufferedChunks
    } = useTimeline(timelineRef, style, bufferedChunks, currentTime, duration, changeVideoTime);




    return (
        <div
            className={style.TimelineWrapper + (isHovered || isDraggingTimeline ? ' ' + style.IsHovered : '')}
            ref={timelineRef}

            onPointerEnter={() => setIsHovered(true)}
            onPointerLeave={() => setIsHovered(false)}
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
        </div>
    );
}


export default Timeline;