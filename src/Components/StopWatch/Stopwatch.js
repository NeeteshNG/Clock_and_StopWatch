import React, { useEffect, useState } from "react";
import "./Stopwatch.css";

function Stopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState([]);
  const [timerDuration, setTimerDuration] = useState(0);
  const [reverse, setReverse] = useState(10);
  const [inputMin, setInputMin] = useState("");

  useEffect(() => {
    let intervalId;
    if (isRunning) {
      intervalId = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + reverse;
          if (newTime <= 0) {
            setIsRunning(false);
            return 0;
          }
          return newTime;
        });
      }, 10);
    }
    return () => clearInterval(intervalId);
  }, [isRunning, time]);

  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);
  const milliseconds = time % 1000;

  const startTimer = (duration) => {
    const initialTime = duration * 60 * 1000;
    setReverse(-10)
    setTimerDuration(initialTime);
    setTime(initialTime);
    setIsRunning(true);
    if (inputMin !== "") {
      const duration = parseFloat(inputMin); // Parse the user-entered minutes
      const initialTime = duration * 60 * 1000;
      setReverse(-10);
      setTimerDuration(initialTime);
      setTime(initialTime);
      setIsRunning(true);
    }
  };

  const start = () => {
    setIsRunning(true);
  };

  const stop = () => {
    setIsRunning(false);
  };

  const reset = () => {
    setReverse(10)
    setTime(0);
    setIsRunning(false);
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
      <div className="timer-buttons">
        <button className="button-91" onClick={() => startTimer(2)}>
          2 min
        </button>
        <button className="button-91" onClick={() => startTimer(5)}>
          5 min
        </button>
        <button className="button-91" onClick={() => startTimer(10)}>
          10 min
        </button>
      </div>
      <div className="timer-input">
        <input
          type="number"
          placeholder="0"
          value={inputMin}
          data-testid="input-min"
          onChange={(e) => setInputMin(e.target.value)}
        />
        <button className="button-91" onClick={startTimer}>
          Start
        </button>
      </div>
      <div className="controlling-buttons">
        <button data-testid="start" className="button-72" onClick={start} disabled={isRunning}>
          <i className="fa-solid fa-play"></i>
        </button>
        <button data-testid="stop" className="button-72" onClick={stop} disabled={!isRunning}>
          <i className="fa-solid fa-stop"></i>
        </button>
        <button data-testid="reset" className="button-72" onClick={reset}>
          <i className="fa-solid fa-power-off"></i>
        </button>
        <button data-testid="lap" className="button-72" onClick={recordLap} disabled={!isRunning}>
          <i className="fa-solid fa-bookmark"></i>
        </button>
      </div>
      <div data-testid="lap-list" className="lap-list">
        <ul>
          {laps.map((lapTime, index) => (
            <li key={index}>
              Lap {index + 1} : {formatLapTime(lapTime)}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function formatLapTime(lapTime) {
  const hours = Math.floor(lapTime / 3600000);
  const minutes = Math.floor((lapTime % 3600000) / 60000);
  const seconds = Math.floor((lapTime % 60000) / 1000);
  const milliseconds = lapTime % 1000;
  return `${hours}:${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}.${milliseconds.toString().padStart(3, "0")}`;
}

export default Stopwatch;
