import { useState, useEffect, useRef } from "react";

export const useIsVisible = () => {
    const [isVisible, setIsVisible] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let observer: IntersectionObserver | null = null;

        if (ref.current) {
            observer = new IntersectionObserver(
                ([entry]) => {
                    console.log("Element is visible:", entry.isIntersecting); // Debug
                    setIsVisible(entry.isIntersecting);
                },
                {
                    threshold: 0.5, // Naikkan threshold
                }
            );

            observer.observe(ref.current);
        }

        return () => {
            if (observer && ref.current) {
                observer.unobserve(ref.current);
            }
        };
    }, []);

    return { ref, isVisible };
};
