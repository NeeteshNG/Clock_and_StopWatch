import moment from "moment-timezone";
import { useEffect, useState } from "react";
import "./Clock.css";

function Clock() {
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
    <div className="Clock">
      <h1 className="time-heading">Current Time</h1>
      <p className="time">{time}</p>
      <div className="grid">
        {timeZones.map((zone) => (
          <button className="button-68" onClick={() => handleZone(zone)}>
            {zone}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Clock;
