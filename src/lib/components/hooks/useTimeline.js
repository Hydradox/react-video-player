import { useState, useEffect } from 'react';

function useTimeline(timeline, style, bufferedChunks, duration, changeVideoTime) {
    /**
     * STATES
     */
    const [isDraggingTimeline, setIsDraggingTimeline] = useState(false);
    

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
                    changeVideoTime(getVideoProgress(e));
                }
            } catch(err) {}
        }

        // Handle pointer move
        const handlePointerMove = (e) => {
            if(isDraggingTimeline) {
                changeVideoTime(getVideoProgress(e));
            }
        }

        // Handle pointer up
        const handlePointerUp = (e) => {
            setIsDraggingTimeline(false);
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


    return {
        // Methods
        mapBufferedChunks
    };
}

export default useTimeline;