import moment from "moment-timezone";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [timeZone, setTimeZone] = useState("Asia/Kolkata");
  const [time, setTime] = useState(moment().tz(timeZone).format("LTS"));
  const timeZones = moment.tz.names();

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().tz(timeZone).format("LTS"));
    }, 1000);

    return () => clearInterval(interval);
  }, [timeZone]);

  const handleZone = (zone) => {
    setTimeZone(zone);
  };

  return (
    <div className="App">
      <h1 className="time-heading">Current Time</h1>
      <p className="time">{time}</p>
      {timeZones.map((zone) => (
        <button className="zones" onClick={() => handleZone(zone)}>
          {zone}
        </button>
      ))}
    </div>
  );
}

export default App;
