import { useState, useEffect } from 'react';

// Function to create a timeout with cleanup on return
function useTimeout() {
    // Create timeout
    const [timeoutState, setTimeoutState] = useState(null);

    // Create timeout function
    const setTimeoutFn = (callback, delay) => {
        // Set timeout state
        //console.log('Setting timeout');
        setTimeoutState(setTimeout(callback, delay));
    };

    // Clear timeout function
    const clearTimeoutFn = () => {
        // Clear timeout state
        //console.log('Clearing timeout');
        clearTimeout(timeoutState);
    }

    useEffect(() => {
        // Clear timeout on unmount
        //console.log('Clearing timeout on unmount', timeoutState);
        return () => clearTimeout(timeoutState);
    }, [timeoutState]);

    // Return timeout
    return {
        setTimeoutFn,
        clearTimeoutFn
    };
}

export default useTimeout;