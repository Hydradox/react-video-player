import style from './VolumeIcon.module.css';
import { useRef, useEffect } from 'react';


function VolumeIcon({ volume }) {
    const bar1Ref = useRef();
    const bar2Ref = useRef();

    const active = 1;
    const inactive = 0.3;


    useEffect(() => {
        if(volume > 0.5) {
            bar1Ref.current.style.opacity = active;
            bar2Ref.current.style.opacity = active;

        } else if(volume > 0) {
            bar1Ref.current.style.opacity = inactive;
            bar2Ref.current.style.opacity = active;

        } else {
            bar1Ref.current.style.opacity = inactive;
            bar2Ref.current.style.opacity = inactive;
        }
    }, [volume]);


    return (
        <svg width="112" height="95" viewBox="0 0 112 95" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="volume" clipPath="url(#clip0_4_21)">
                <path d="M9.36436 43.7204C7.06205 45.7142 7.06205 49.2858 9.36436 51.2796L46.2267 83.2034C49.4649 86.0078 54.5 83.7075 54.5 79.4237L54.5 15.5762C54.5 11.2925 49.4649 8.99222 46.2267 11.7966L9.36436 43.7204Z" fill="white" />
                <rect id="Rectangle 7" x="30" y="36" width="23" height="28" rx="7" transform="rotate(90 30 36)" fill="white" />
                <path ref={bar1Ref} className={style.Volume_Bars} id="vol-bar-2" d="M70 12C106 12 106 82 70 82" stroke="white" strokeWidth="9" strokeLinecap="round" />
                <path ref={bar2Ref} className={style.Volume_Bars} id="vol-bar-1" d="M71.9091 57C77.3636 57 77.3636 36 71.9091 36C71.1818 36 71 37.5556 71 38.3333V54.6667C71 55.4444 71.1818 57 71.9091 57Z" stroke="white" strokeWidth="8" strokeLinecap="round" />
            </g>
            <defs>
                <clipPath id="clip0_4_21">
                    <rect width="112" height="95" fill="white" />
                </clipPath>
            </defs>
        </svg>

    );
}


export default VolumeIcon;