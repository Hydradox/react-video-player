import style from './ButtonsTouch.module.css';

function ButtonsTouch({ isPlaying, togglePlayback, volume, changeVolume }) {
    return (
        <div className={style.ButtonsTouch}>
            Touch controls
        </div>
    )
}

export default ButtonsTouch;