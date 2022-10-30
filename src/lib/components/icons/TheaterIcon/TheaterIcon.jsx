import style from './TheaterIcon.module.css';

function TheaterIcon({ isTheaterMode }) {
    return (
        <svg id={style['TheaterIcon']} className={isTheaterMode ? style.TheaterActive : ''} width="124" height="95" viewBox="0 0 124 95" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g>
                <rect x="10" y="17" width="104" height="61" rx="5" stroke="white" strokeWidth="11" />
            </g>
        </svg>
    );
}

export default TheaterIcon;