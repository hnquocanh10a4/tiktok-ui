import { useState, useEffect, useMemo } from 'react';

const useElementOnScreen = (options, targetRef) => {
    const [isVisible, setIsVisible] = useState();

    const callbackFunc = (entries) => {
        // console.log('entries', entries);
        const [entry] = entries;
        // const entry = entries[0];
        setIsVisible(entry.isIntersecting);
    };

    const optionMemo = useMemo(() => {
        return options;
    }, [options]);

    useEffect(() => {
        const observer = new IntersectionObserver(callbackFunc, optionMemo);
        const currentTarget = targetRef.current;
        if (currentTarget) {
            observer.observe(currentTarget);
        }

        return () => {
            if (currentTarget) {
                observer.unobserve(currentTarget);
            }
        };
    }, [optionMemo, targetRef]);

    return isVisible;
};

export default useElementOnScreen;
