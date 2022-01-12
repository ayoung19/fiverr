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
    if (clicks === 1) {
      setSeconds((prevState) => prevState + 1 / 120);
      setInterval(() => {
        setSeconds((prevState) => prevState + 1 / 120);
      }, 1000 / 120);
    }
  }, [clicks]);

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
            fill={true}
          >
            {clicks === 0 ? "Click To Start" : "Keep Clicking"}
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
            Button 1
          </EuiButton>
        </EuiFlexItem>
        <EuiFlexItem>
          <EuiButton
            href="https://www.clickspeedtester.com/spacebar-test/"
            target="_blank"
            iconType="popout"
            size="s"
          >
            Button 2
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </EuiPanel>
  );
};
