import { useState, useEffect } from 'react';

const useLoader = () => {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time with setTimeout
        const timer = setTimeout(() => {
        setIsLoading(false);
        }, 2000); // Simulating a 2-second loading time

        // Cleanup function to clear the timer
        return () => clearTimeout(timer);
    }, []); // Run effect only once on component mount

    return isLoading;
};

export default useLoader;