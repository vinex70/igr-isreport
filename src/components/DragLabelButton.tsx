"use client";

import { useState } from "react";
import Draggable from "react-draggable";

interface DragLabelButtonProps {
    onClick: () => void;
    label?: string;
    className?: string;
    initialPosition?: { x: number; y: number };
}

export default function DragLabelButton({
    onClick,
    label = "Click Me",
    className = "",
    initialPosition = { x: 0, y: 0 },
}: DragLabelButtonProps) {
    const [dragging, setDragging] = useState(false);

    const handleStart = () => setDragging(true);
    const handleStop = () => {
        setTimeout(() => setDragging(false), 100);
    };

    const handleClick = () => {
        if (!dragging) onClick();
    };

    return (
        <Draggable
            onStart={handleStart}
            onStop={handleStop}
            defaultPosition={initialPosition}
        >
            <button
                onClick={handleClick}
                className={`fixed z-50 bg-blue-600 text-white px-4 py-3 rounded-full shadow-lg hover:bg-blue-700 transition duration-300 cursor-move ${className}`}
                title={label}
            >
                {label}
            </button>
        </Draggable>
    );
}
