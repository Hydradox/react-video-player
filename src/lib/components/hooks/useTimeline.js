import { useState, useEffect } from 'react';

function useTimeline(timeline, style, bufferedChunks, currentTime, duration, changeVideoTime) {
    /**
     * STATES
     */
    const [isDraggingTimeline, setIsDraggingTimeline] = useState(false);
    const [thumbOffset, setThumbOffset] = useState(currentTime / duration * 100);
    

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
                }
            } catch(err) {}
        }

        // Handle pointer move
        const handlePointerMove = (e) => {
            if(isDraggingTimeline) {
                const timelineRect = timeline.current.getBoundingClientRect();
                const pointerOffset = e.clientX - timelineRect.left;
                const pointerOffsetPercentage = (pointerOffset / timelineRect.width) * 100;

                setThumbOffset(pointerOffsetPercentage);
            }
        }

        // Handle pointer up
        const handlePointerUp = (e) => {
            if(isDraggingTimeline) {
                setIsDraggingTimeline(false);
                changeVideoTime(getVideoProgress(e));
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
    }, [isDraggingTimeline])


    useEffect(() => {
        console.log('thumbOffset', thumbOffset);
    }, [thumbOffset])


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

        // Methods
        mapBufferedChunks
    };
}

export default useTimeline;