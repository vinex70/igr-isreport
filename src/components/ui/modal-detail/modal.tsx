"use client";
import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children }) => {
    // Handle keydown event for closing the modal with Escape key
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose();
            }
        };

        if (isOpen) {
            window.addEventListener("keydown", handleKeyDown);
        }

        // Cleanup event listener when the modal is closed
        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-11/12">
                <div className="flex justify-between items-center px-4 py-2 border-b border-gray-300 dark:border-gray-700">
                    <h3 className="text-lg font-bold text-gray-800 dark:text-white">{title}</h3>
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        className="text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
                    >
                        ✕
                    </Button>
                </div>
                <div className="flex justify-center w-full overflow-y-auto max-h-96 p-2">
                    {children}
                </div>
                <div className="flex justify-end px-4 py-2 border-t border-gray-300 dark:border-gray-700">
                    <Button
                        variant="outline"
                        onClick={onClose}
                        className="bg-gray-300 hover:bg-indigo-400 dark:bg-gray-600 dark:hover:bg-indigo-500"
                    >
                        Close
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
