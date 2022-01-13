import React, { FC, useEffect, useState } from "react";
import {
  EuiPanel,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
  EuiStat,
  EuiSpacer,
} from "@elastic/eui";

export const App: FC = () => {
  const [clicks, setClicks] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (clicks === 1 && seconds === 0) {
      const interval = setInterval(() => {
        setSeconds((prevState) => {
          const newState = Math.min(prevState + 1 / 120, 10);

          if (newState === 10) {
            clearInterval(interval);
          }

          return newState;
        });
      }, 1000 / 120);
    }
  }, [clicks, seconds]);

  return (
    <EuiPanel
      paddingSize="l"
      hasBorder={false}
      hasShadow={false}
      color="transparent"
    >
      <EuiFlexGroup responsive={false}>
        <EuiFlexItem>
          <EuiButton
            onClick={() => setClicks((prevState) => prevState + 1)}
            disabled={seconds === 10}
            fill={true}
          >
            {clicks === 0
              ? "Click To Start"
              : seconds < 10
              ? "Keep Clicking"
              : "Done!"}
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiButton
            onClick={() => {
              setClicks(0);
              setSeconds(0);
            }}
            disabled={seconds < 10}
            fill={true}
            color="danger"
          >
            Restart
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiFlexGroup responsive={false}>
        <EuiFlexItem>
          <EuiStat title={clicks} description="Clicks" />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiStat title={seconds.toFixed(2)} description="Elapsed Seconds" />
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiStat
            title={(clicks / seconds).toFixed(2)}
            description="Clicks Per Second"
            isLoading={seconds === 0}
          />
        </EuiFlexItem>
      </EuiFlexGroup>
      <EuiSpacer />
      <EuiFlexGroup responsive={false}>
        <EuiFlexItem>
          <EuiButton
            href="https://www.clickspeedtester.com/"
            target="_blank"
            iconType="popout"
            size="s"
          >
            Click Speed Test
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiButton
            href="https://www.clickspeedtester.com/spacebar-test/"
            target="_blank"
            iconType="popout"
            size="s"
          >
            Space Bar Clicker
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPanel>
  );
};
