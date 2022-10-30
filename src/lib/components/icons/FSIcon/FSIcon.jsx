import styles from './FSIcon.module.css';

function FSIcon({ isFullscreen, isHovered }) {
    const fsEnter = () => {
        return (
            <svg id={styles['FullscreenEnterIcon']} className={(isHovered ? styles.Hovered : '')} width="95" height="95" viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <g id={styles['tl-corner']}>
                        <rect x="9.05816" y="8.12347" width="10.6046" height="28.2791" rx="5.30232" fill="white" />
                        <rect x="9.05816" y="18.7281" width="10.6046" height="28.2791" rx="5.30232" transform="rotate(-90 9.05816 18.7281)" fill="white" />
                    </g>
                    <g id={styles['tr-corner']}>
                        <rect x="85.9418" y="8.12347" width="10.6046" height="27.3953" rx="5.30232" transform="rotate(90 85.9418 8.12347)" fill="white" />
                        <rect x="75.3372" y="8.12347" width="10.6046" height="27.3953" rx="5.30232" fill="white" />
                    </g>
                    <g id={styles['br-corner']}>
                        <rect x="85.9418" y="85.8909" width="10.6046" height="27.3953" rx="5.30232" transform="rotate(-180 85.9418 85.8909)" fill="white" />
                        <rect x="85.9418" y="75.2862" width="10.6046" height="27.3953" rx="5.30232" transform="rotate(90 85.9418 75.2862)" fill="white" />
                    </g>
                    <g id={styles['bl-corner']}>
                        <rect x="9.05816" y="86" width="10.6046" height="28.2791" rx="5.30232" transform="rotate(-90 9.05816 86)" fill="white" />
                        <rect x="19.6628" y="86" width="10.6046" height="28.2791" rx="5.30232" transform="rotate(-180 19.6628 86)" fill="white" />
                    </g>
                </g>
            </svg>
        );
    }

    const fsExit = () => {
        return (
            <svg id={styles['FullscreenExitIcon']} className={(isHovered ? styles.Hovered : '')} width="95" height="95" viewBox="0 0 95 95" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g>
                    <g id={styles['exit-tl-corner']}>
                        <rect x="37.4204" y="35.4773" width="10.6364" height="27.4773" rx="5.31818" transform="rotate(-180 37.4204 35.4773)" fill="white" />
                        <rect x="37.4204" y="24.8409" width="10.6364" height="27.4773" rx="5.31818" transform="rotate(90 37.4204 24.8409)" fill="white" />
                    </g>
                    <g id={styles['exit-tr-corner']}>
                        <rect x="58.6932" y="36.3636" width="10.6364" height="28.3636" rx="5.31818" transform="rotate(-90 58.6932 36.3636)" fill="white" />
                        <rect x="69.3295" y="36.3636" width="10.6364" height="28.3636" rx="5.31818" transform="rotate(-180 69.3295 36.3636)" fill="white" />
                    </g>
                    <g id={styles['exit-br-corner']}>
                        <rect x="58.6932" y="57.6364" width="10.6364" height="28.3636" rx="5.31818" fill="white" />
                        <rect x="58.6932" y="68.2727" width="10.6364" height="28.3636" rx="5.31818" transform="rotate(-90 58.6932 68.2727)" fill="white" />
                    </g>
                    <g id={styles['exit-bl-corner']}>
                        <rect x="37.4204" y="57.6364" width="10.6364" height="27.4773" rx="5.31818" transform="rotate(90 37.4204 57.6364)" fill="white" />
                        <rect x="26.7841" y="57.6364" width="10.6364" height="27.4773" rx="5.31818" fill="white" />
                    </g>
                </g>
            </svg>
        );
    }


    return isFullscreen ? fsExit() : fsEnter();
}


export default FSIcon;