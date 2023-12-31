import moment from "moment-timezone";
import { useEffect, useState } from "react";
import "./Clock.css";

function Clock() {
  const [timeZone, setTimeZone] = useState("Asia/Kolkata");
  const [time, setTime] = useState(moment().tz(timeZone).format("LTS"));
  const timeZones = moment.tz.names();

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(0);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedTimeZones = timeZones.slice(startIndex, endIndex);
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(moment().tz(timeZone).format("LTS"));
    });

    return () => clearInterval(interval);
  }, [timeZone]);

  const handleZone = (zone) => {
    setTimeZone(zone);
  };

  const handlePageChange = (page) => {
      setCurrentPage(page);
  };

  return (
    <div className="Clock">
      <h1 data-testid="timeZone" className="timeZone">{timeZone}</h1>
      <p className="time">{time}</p>
      <div className="grid">
        {displayedTimeZones.map((zone) => (
          <button
            data-testid="zone-button"
            className="button-68"
            key={zone}
            onClick={() => handleZone(zone)}
          >
            {zone}
          </button>
        ))}
      </div>
      <div data-testid="pagination-container" className="pagination-container">
        {timeZones.length > itemsPerPage && (
          <div className="pagination">
            <button
              data-testid="prev-button"
              className="button-74"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              <i className="fa-solid fa-circle-arrow-right fa-rotate-180"></i>
            </button>
            <h1 data-testid="current-page" className="page-numbers">
              {currentPage + 1}
            </h1>
            <button
              className="button-74"
              data-testid="next-button"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={endIndex >= timeZones.length}
            >
              <i className="fa-solid fa-circle-arrow-right"></i>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Clock;
