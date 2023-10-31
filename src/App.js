import moment from "moment";
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [time, setTime] = useState(null);

  useEffect(() => {
    setInterval(() => {
      setTime(moment().format("LTS"))
    }, 1000);
  }, [time]);

  return (
    <div className="App">
      <h1>Current Time</h1>
      {time}
    </div>
  );
}

export default App;
