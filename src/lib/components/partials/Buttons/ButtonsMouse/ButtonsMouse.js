import { useState } from 'react';
import style from './ButtonsMouse.module.css';

// Icons
import Play from '../../../icons/PlayIcon/PlayIcon.jsx';
import Pause from '../../../icons/PauseIcon/PauseIcon.jsx';
import Volume from '../../../icons/VolumeIcon/VolumeIcon.jsx';

import Settings from '../../../icons/SettingsIcon/SettingsIcon.jsx';
import PIPIcon from '../../../icons/PIPIcon/PIPIcon';
import Theater from '../../../icons/TheaterIcon/TheaterIcon';
import Fullscreen from '../../../icons/FSIcon/FSIcon.jsx';


function ButtonsMouse({ isPlaying, isFullscreen, togglePlayback,
    toggleFullscreen, volume, changeVolume, currentTime, duration,
    isTheaterMode, toggleTheaterMode, isPIPMode, togglePIPMode,
    isHandleTheaterModeChangeFunction }) {

    const [isHoveringFS, setIsHoveringFS] = useState(false);
    const [isHoveringPIP, setIsHoveringPIP] = useState(false);

    const handleMouseEnterLeaveFS = (e) => {
        if(e.type === 'mouseenter')
            return setIsHoveringFS(true);
        setIsHoveringFS(false);
    }

    const handleMouseEnterLeavePIP = (e) => {
        if(e.type === 'mouseenter')
            return setIsHoveringPIP(true);
        setIsHoveringPIP(false);
    }
    

    const formatTime = (time) => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time - hours * 3600) / 60);
        const seconds = Math.floor(time - hours * 3600 - minutes * 60);

        return `${hours > 0 ? hours + ':' : ''}${minutes < 10 ? '0' + minutes : minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    }

    return (
        <div className={style.ButtonsMouse}>
            <div className={style.Group}>
                {/* GROUP 1 - Left side */}
                <button tabIndex="1" className={style.Button} onClick={togglePlayback}>
                    {isPlaying ? <Pause /> : <Play />}
                </button>

                <button tabIndex="1" className={style.Button + ' ' + style.VolumeWrapper}>
                    <Volume volume={volume} />
                    <input
                        tabIndex="1"
                        className={style.VolumeSlider}
                        type="range"
                        min="0"
                        value={volume}
                        max="1"
                        step="0.01"

                        onChange={(e) => changeVolume(e.target.value)}
                    />
                </button>

                <div className={style.Button + ` ${style.Time}`}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                </div>
            </div>


            <div className={style.Group}>
                {/* GROUP 2 - Right side */}
                <button tabIndex="1" className={style.Button 
                    + ` ${style.SettingsButton}`}>
                    <Settings />
                </button>

                {document.pictureInPictureEnabled &&
                    <button
                        tabIndex="1"
                        className={style.Button}
                        onMouseEnter={handleMouseEnterLeavePIP}
                        onMouseLeave={handleMouseEnterLeavePIP}
                        onClick={togglePIPMode}
                    >
                        <PIPIcon isHovered={isHoveringPIP} />
                    </button>
                }
                
                {isHandleTheaterModeChangeFunction() &&
                    <button tabIndex="1" className={style.Button} onClick={toggleTheaterMode}>
                        <Theater isTheaterMode={isTheaterMode} />
                    </button>
                }

                <button
                    tabIndex="1"
                    className={style.Button}
                    onMouseEnter={handleMouseEnterLeaveFS}
                    onMouseLeave={handleMouseEnterLeaveFS}
                    onClick={toggleFullscreen}
                >
                    <Fullscreen isFullscreen={isFullscreen} isHovered={isHoveringFS} />
                </button>
            </div>
        </div>
    )
}


export default ButtonsMouse;