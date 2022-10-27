import style from './Timeline.module.css';


function Timeline({ currentTime, duration, bufferedChunks, progressBarColor }) {
    return (
        <div className={style.TimelineWrapper}>
            <div className={style.Timeline}></div>
        </div>
    );
}


export default Timeline;