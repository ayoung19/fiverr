import React, { FC, useEffect, useState } from "react";

export const App: FC = () => {
  const [clicks, setClicks] = useState(0);
  const [milliseconds, setMilliseconds] = useState(0);

  useEffect(() => {
    if (clicks === 1) {
      setInterval(() => {
        setMilliseconds((prevState) => prevState + 1000 / 120);
      }, 1000 / 120);
    }
  }, [clicks]);

  return (
    <>
      <button onClick={() => setClicks((prevState) => prevState + 1)}>
        click
      </button>
      <div>clicks: {clicks}</div>
      <div>seconds: {Math.floor(milliseconds / 10) / 100}</div>
      <div>
        clicks per second: {Math.floor((clicks / milliseconds) * 100000) / 100}
      </div>
      <a href="https://www.clickspeedtester.com/" target="_blank">
        button 1
      </a>
      <a href="https://www.clickspeedtester.com/spacebar-test/" target="_blank">
        button 2
      </a>
    </>
  );
};
