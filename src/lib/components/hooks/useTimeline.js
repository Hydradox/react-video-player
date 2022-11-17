import { useState, useEffect } from 'react';

function useTimeline(videoPlayer, videoRef, timeline, lowVideo, hoverModalRef, style, bufferedChunks, currentTime, duration, changeVideoTime) {
    /**
     * STATES
     */
    const [isDraggingTimeline, setIsDraggingTimeline] = useState(false);
    const [thumbOffset, setThumbOffset] = useState(currentTime / duration * 100);

    const [isHovered, setIsHovered] = useState(false);
    const [lowVideoTime, setLowVideoTime] = useState(0);
    const [lowVideoOffset, setLowVideoOffset] = useState(0);


    useEffect(() => {
        changeThumbOffset(currentTime / duration * 100);
    }, [currentTime, duration]);

    useEffect(() => {
        if(lowVideo.current !== null)
            lowVideo.current.currentTime = lowVideoTime;
    }, [lowVideoTime]);
    

    /**
     * EVENT HANDLERS
     */
    

    /**
     * GLOBAL EVENT LISTENERS
     */
    useEffect(() => {
        // Handle pointer down
        const handlePointerDown = (e) => {
            try {
                if(e.target.className.startsWith('Timeline')) {
                    setIsDraggingTimeline(true);
                    videoRef.current.pause();
                }
            } catch(err) {}
        }

        // Handle pointer move
        const handlePointerMove = (e) => {
            // Get sizes
            const timelineSize = timeline.current.offsetWidth;
            const hoverModalSize = hoverModalRef.current.offsetWidth;
            const cursorPos = e.clientX - timeline.current.getBoundingClientRect().left;

            setLowVideoTime(cursorPos / timelineSize * duration);

            // If cursor below 0
            if(cursorPos - hoverModalSize / 2 < 0) {
                setLowVideoOffset('0%');

            // If cursor above max
            } else if(cursorPos > timelineSize - hoverModalSize / 2) {
                setLowVideoOffset(`calc(${timelineSize - hoverModalSize}px)`);

            // If cursor in between
            } else {
                setLowVideoOffset(`${cursorPos  - hoverModalSize / 2}px`);
            }

            if(isDraggingTimeline) {
                const timelineRect = timeline.current.getBoundingClientRect();
                const pointerOffset = e.clientX - timelineRect.left;
                const pointerOffsetPercentage = (pointerOffset / timelineRect.width) * 100;

                changeThumbOffset(pointerOffsetPercentage);
            }
        }

        // Handle pointer up
        const handlePointerUp = (e) => {
            if(isDraggingTimeline) {
                setIsDraggingTimeline(false);
                changeVideoTime(getVideoProgress(e));
                videoPlayer.current.focus();
                videoRef.current.play();
            }
        }

        // Set pointer listeners
        window.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);

        // Cleanup
        return () => {
            // Remove pointer listeners
            window.removeEventListener('pointerdown', handlePointerDown);
            window.removeEventListener('pointermove', handlePointerMove);
            window.removeEventListener('pointerup', handlePointerUp);
        }
    }, [isDraggingTimeline, duration])


    /**
     * METHODS
     */
    // Map buffered chunks
    const mapBufferedChunks = () => {
        let chunks = [];
        if (bufferedChunks) {
            for (let i = 0; i < bufferedChunks.length; i++) {
                chunks.push({
                    start: bufferedChunks.start(i),
                    end: bufferedChunks.end(i)
                });
            }
        }
        return chunks.map((chunk, index) => {
            return (
                <div
                    key={index}
                    className={style.BufferedChunk}
                    style={{
                        left: `${(chunk.start / duration) * 100}%`,
                        width: `${((chunk.end - chunk.start) / duration) * 100}%`
                    }}
                ></div>
        )});
    }

    // Get video progress from cursor position
    const getVideoProgress = (e) => {
        const rect = timeline.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const videoProgress = (x / rect.width) * duration;
        return videoProgress;
    }

    // Change thumb offset
    const changeThumbOffset = (offset) => {
        if(offset > 100) {
            setThumbOffset(100);
        } else if(offset < 0) {
            setThumbOffset(0);
        } else {
            setThumbOffset(offset);
        }
    }


    return {
        // States
        thumbOffset,
        isDraggingTimeline,

        isHovered,
        lowVideoTime,
        lowVideoOffset,

        // Methods
        mapBufferedChunks,
        setIsHovered
    };
}

export default useTimeline;