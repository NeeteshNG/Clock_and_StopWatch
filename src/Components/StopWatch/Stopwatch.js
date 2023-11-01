import React, { useEffect, useState } from "react";
import "./Stopwatch.css";

function Stopwatch() {
    const [running, setRunning] = useState(false);
    const [startTime, setStartTime] = useState(0);
    const [elapsed, setElapsed] = useState(0);

    useEffect(() => {
        let interval;

        if (running) {
        interval = setInterval(() => {
            const now = new Date().getTime();
            const timeElapsed = startTime ? now - startTime + elapsed : elapsed;

            setElapsed(timeElapsed);
        }, 10);
        } else {
        clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [running, startTime, elapsed]);

    const start = () => {
        if (!running) {
        setStartTime(new Date().getTime() - elapsed);
        setRunning(true);
        }
    };

    const stop = () => {
        if (running) {
        setRunning(false);
        }
    };

    const reset = () => {
        setRunning(false);
        setStartTime(0);
        setElapsed(0);
    };

    const formatTime = (milliseconds) => {
        const totalMilliseconds = Math.floor(milliseconds);
        const hours = Math.floor(totalMilliseconds / 3600000);
        const minutes = Math.floor((totalMilliseconds % 3600000) / 60000);
        const seconds = Math.floor((totalMilliseconds % 60000) / 1000);
        const centiseconds = Math.floor((totalMilliseconds % 1000) / 10);

        return (
        `${hours.toString().padStart(2, "0")}:` +
        `${minutes.toString().padStart(2, "0")}:` +
        `${seconds.toString().padStart(2, "0")}.` +
        `${centiseconds.toString().padStart(2, "0")}`
        );
    };

    return (
        <div className="stopwatch-page">
        <h1 className="watch-heading">Stop Watch</h1>
        <div className="watch-timer">{formatTime(elapsed)}</div>
        <div className="controlling-buttons">
            <button onClick={start} disabled={running}>
            Start
            </button>
            <button onClick={stop} disabled={!running}>
            Stop
            </button>
            <button onClick={reset}>Reset</button>
        </div>
        </div>
    );
}

export default Stopwatch;
