import { useCallback, useEffect } from "react"


const useEscapeKey = (callback: () => void) => {
    const handleKeyDown = useCallback((event: KeyboardEvent) => {
        if (event.key === "Escape") {
            callback()
        }
    }, [callback])

    useEffect(() => {
        document.addEventListener("keydown", handleKeyDown)
        return () => {
            document.removeEventListener("keydown", handleKeyDown)
        }
    }, [handleKeyDown])
}

export default useEscapeKey