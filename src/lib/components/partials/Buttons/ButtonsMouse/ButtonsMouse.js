import { useState, useEffect } from 'react';
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
    isHandleTheaterModeChangeFunction, formatTime }) {

    const [isHoveringFS, setIsHoveringFS] = useState(false);
    const [isHoveringPIP, setIsHoveringPIP] = useState(false);
    const [settingsMenuActive, setSettingsMenuActive] = useState(false);

    const handleMouseEnterLeaveFS = (e) => {
        if (e.type === 'mouseenter')
            return setIsHoveringFS(true);
        setIsHoveringFS(false);
    }

    const handleMouseEnterLeavePIP = (e) => {
        if (e.type === 'mouseenter')
            return setIsHoveringPIP(true);
        setIsHoveringPIP(false);
    }

    const toggleSettingsMenu = () => setSettingsMenuActive(!settingsMenuActive);

    return (
        <div className={style.ButtonsMouse}>
            <div className={style.Group}>
                {/* GROUP 1 - Left side */}
                <button tabIndex="1" className={style.Button} onPointerUp={togglePlayback}>
                    {isPlaying ? <Pause /> : <Play />}

                    <div className={style.ButtonLabel}>{isPlaying ? 'Pausa' : 'Reanudar'} (Barra espaciadora)</div>
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

                    <div className={style.ButtonLabel}>Silenciar (M)</div>
                </button>

                <div className={style.Button + ` ${style.Time}`}>
                    {formatTime(currentTime)} / {formatTime(duration)}
                </div>
            </div>


            <div className={style.Group}>
                {/* GROUP 2 - Right side */}
                <button tabIndex="1" className={style.Button
                    + ` ${style.SettingsButton}`
                    + ` ${settingsMenuActive ? style.SettingsActive : ''}`} onPointerUp={toggleSettingsMenu}>
                    <Settings />

                    <div className={style.ButtonLabel}>Ajustes de reproducción</div>
                </button>

                {settingsMenuActive &&
                    <div className={style.SettingsMenu}>
                        <div className={style.SettingsMenuContainer}>
                            <button
                                tabIndex="1"
                                className={style.SettingsMenuItem}
                                onPointerUp={toggleTheaterMode}
                            >Toggle theater</button>
                            <button
                                tabIndex="1"
                                className={style.SettingsMenuItem}
                                onPointerUp={toggleTheaterMode}
                            >Toggle theater</button>
                            <button
                                tabIndex="1"
                                className={style.SettingsMenuItem}
                                /*onPointerUp={console.log('test')}*/
                            >Velocidad de reproducción</button>
                        </div>

                        <div className={style.SettingsSubmenu}>
                            Submenu hidden when inactive
                        </div>
                    </div>
                }

                {document.pictureInPictureEnabled &&
                    <button
                        tabIndex="1"
                        className={style.Button + ` ${settingsMenuActive ? style.SettingsActive : ''}`}
                        onMouseEnter={handleMouseEnterLeavePIP}
                        onMouseLeave={handleMouseEnterLeavePIP}
                        onPointerUp={togglePIPMode}
                    >
                        <PIPIcon isHovered={isHoveringPIP} />

                        <div className={style.ButtonLabel}>Picture in Picture (I)</div>
                    </button>
                }

                {isHandleTheaterModeChangeFunction && !isFullscreen &&
                    <button
                        tabIndex="1"
                        className={style.Button + ` ${settingsMenuActive ? style.SettingsActive : ''}`}
                        onPointerUp={toggleTheaterMode}>
                        <Theater isTheaterMode={isTheaterMode} />

                        <div className={style.ButtonLabel}>Modo inmersivo (T)</div>
                    </button>
                }

                <button
                    tabIndex="1"
                    className={style.Button + ` ${settingsMenuActive ? style.SettingsActive : ''}`}
                    onMouseEnter={handleMouseEnterLeaveFS}
                    onMouseLeave={handleMouseEnterLeaveFS}
                    onPointerUp={toggleFullscreen}
                >
                    <Fullscreen isFullscreen={isFullscreen} isHovered={isHoveringFS} />

                    <div className={style.ButtonLabel}>Pantalla completa (F)</div>
                </button>
            </div>
        </div>
    )
}


export default ButtonsMouse;