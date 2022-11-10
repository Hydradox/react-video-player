import { useRef } from "react";

// Hook that can be used to delay a function call and cancel it if needed and can hold multiple timeouts with names
export default function useTimeout() {
    const timeouts = useRef({});
    
    const timeoutFn = (name, callback, delay) => {
        clearFn(name);
        timeouts.current[name] = setTimeout(callback, delay);
    };
    
    const clearFn = (name) => {
        clearTimeout(timeouts.current[name]);
    };
    
    return { timeoutFn, clearFn };
}