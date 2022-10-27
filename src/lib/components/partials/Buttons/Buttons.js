import style from './Buttons.module.css';

// Icons
import Play from '../../icons/PlayIcon/PlayIcon.jsx';
import Pause from '../../icons/PauseIcon/PauseIcon.jsx';
import Volume from '../../icons/VolumeIcon/VolumeIcon.jsx';


function Buttons({ isTouchDevice, isPlaying, togglePlayback, volume, changeVolume }) {
    return (
        <div className={style.Buttons}>
            <div className={style.Group}>
                {/* GROUP 1 - Right side */}
                <div className={style.Button} onClick={togglePlayback}>
                    {isPlaying ? <Pause /> : <Play />}
                </div>

                <div className={style.Button + ' ' + style.VolumeWrapper}>
                    <Volume volume={volume} />
                    <input
                        className={style.VolumeSlider}
                        type="range"
                        min="0"
                        max="1"
                        step="0.01"

                        onChange={(e) => changeVolume(e.target.value)}
                    />
                </div>
            </div>
        </div>
    )
}


export default Buttons;