import moment from "moment-timezone";
import { useEffect, useState } from "react";
import "./Clock.css";

function Clock() {
  const [timeZone, setTimeZone] = useState("Asia/Kolkata");
  const [time, setTime] = useState(moment().tz(timeZone).format("LTS"));
  const timeZones = moment.tz.names();

  const itemsPerPage = 20;
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = Math.ceil(timeZones.length / itemsPerPage);

  const pagesToShow = 5;
  const middlePage = Math.floor(pagesToShow / 2);
  let startPage = Math.max(0, currentPage - middlePage);
  const endPage = Math.min(totalPages - 1, startPage + pagesToShow - 1);
  if (endPage - startPage + 1 < pagesToShow) {
    startPage = Math.max(0, endPage - pagesToShow + 1);
  }

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
    if (page >= 0 && page < totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="Clock">
      <h1 className="timeZone">{timeZone}</h1>
      <p className="time">{time}</p>
      <div className="grid">
        {displayedTimeZones.map((zone) => (
          <button
            className="button-68"
            key={zone}
            onClick={() => handleZone(zone)}
          >
            {zone}
          </button>
        ))}
      </div>
      <div className="pagination-container">
        {totalPages > 1 && (
          <div className="pagination">
            <button
              className="button-74"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 0}
            >
              <i className="fa-solid fa-circle-arrow-right fa-rotate-180"></i>
            </button>
            <ul className="page-numbers">
              {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
                <li
                  key={startPage + index}
                  className={
                    currentPage === startPage + index ? "current-page" : ""
                  }
                  onClick={() => handlePageChange(startPage + index)}
                >
                  {startPage + index + 1}
                </li>
              ))}
            </ul>
            <button
              className="button-74"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages - 1}
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
