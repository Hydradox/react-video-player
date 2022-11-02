import { useState, useRef } from 'react';
import style from './Timeline.module.css';
import useTimeline from '../../hooks/useTimeline';


function Timeline({ currentTime, duration, bufferedChunks, progressBarColor, changeVideoTime }) {
    const timelineRef = useRef(null);

    const {
        // Methods
        mapBufferedChunks
    } = useTimeline(timelineRef, style, bufferedChunks, duration, changeVideoTime);


    return (
        <div
            className={style.TimelineWrapper}
            ref={timelineRef}
        >
            <div className={style.Timeline}>
                <div className={style.BufferedChunksWrapper}>{mapBufferedChunks()}</div>

                <div className={style.CurrentTime} style={{
                    width: `${(currentTime / duration) * 100}%`,
                    backgroundColor: progressBarColor
                }}></div>

                <div className={style.Thumb} style={{
                    left: `${(currentTime / duration) * 100}%`,
                    backgroundColor: progressBarColor
                }}></div>
            </div>
        </div>
    );
}


export default Timeline;