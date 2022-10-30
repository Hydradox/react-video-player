import { useEffect } from 'react';
import style from './PIPIcon.module.css';

function PIPIcon({ isHovered }) {
    return (
        <svg id={style['PIPIcon']} className={isHovered ? style.Hovered : ''} width="116" height="95" viewBox="0 0 116 95" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
                <rect x="10" y="11" width="96" height="73" rx="5" stroke="white" strokeWidth="11" />
                <rect id={style['window']} x="53" y="42" width="43" height="32" rx="3" fill="white" />
            </g>
        </svg>
    );
}

export default PIPIcon;