import React, { useEffect, useState } from "react";
import "./Stopwatch.css";

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => setTime(time + 1), 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const hours = Math.floor(time / 360000);
  const minutes = Math.floor((time % 360000) / 6000);
  const seconds = Math.floor((time % 6000) / 100);
  const milliseconds = time % 100;

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setTime(0);
    setLaps([]);
  };

  const recordLap = () => {
    setLaps([...laps, time]);
  };

  return (
    <div className="stopwatch-page">
      <h1 className="watch-heading">Stop Watch</h1>
      <div className="watch">
        <div className="watch-timer">
          {hours}:{minutes.toString().padStart(2, "0")}:
          {seconds.toString().padStart(2, "0")}
        </div>
        <div className="miliseconds">
          {milliseconds.toString().padStart(2, "0")}
        </div>
      </div>
      <div className="controlling-buttons">
        <button className="button-72" onClick={start}>
          <i className="fa-solid fa-play"></i>
        </button>
        <button className="button-72" onClick={stop} disabled={!isRunning}>
          <i className="fa-solid fa-stop"></i>
        </button>
        <button className="button-72" onClick={reset}>
          <i className="fa-solid fa-power-off"></i>
        </button>
        <button className="button-72" onClick={recordLap} disabled={!isRunning}>
          <i className="fa-solid fa-bookmark"></i>
        </button>
      </div>
      <div className="lap-list">
        <ul>
          {laps.map((lapTime, index) => (
            <li key={index}>
              Lap {index + 1}   :    {formatLapTime(lapTime)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function formatLapTime(lapTime) {
  const hours = Math.floor(lapTime / 360000);
  const minutes = Math.floor((lapTime % 360000) / 6000);
  const seconds = Math.floor((lapTime % 6000) / 100);
  const milliseconds = lapTime % 100;
  return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}.${milliseconds.toString().padStart(2, "0")}`;
}

export default Stopwatch;
