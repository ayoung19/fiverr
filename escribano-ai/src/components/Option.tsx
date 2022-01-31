import React, { FC, useState } from "react";
import {
  EuiText,
  EuiSpacer,
  EuiFlexGroup,
  EuiFlexItem,
  EuiButton,
} from "@elastic/eui";

interface OptionProps {
  option: string;
}

export const Option: FC<OptionProps> = ({ option }) => {
  const [copied, setCopied] = useState(false);

  return (
    <>
      <EuiText size="s">
        <p>{option}</p>
      </EuiText>
      <EuiSpacer size="m" />
      <EuiFlexGroup
        justifyContent="flexEnd"
        gutterSize="none"
        responsive={false}
      >
        <EuiFlexItem grow={false}>
          <EuiButton
            onClick={() => {
              navigator.clipboard.writeText(option).then(() => {
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2500);
              });
            }}
            fill={copied}
            size="s"
            iconType="copyClipboard"
            iconSide="right"
          >
            {copied ? "Copiado" : "Copiar"}
          </EuiButton>
        </EuiFlexItem>
      </EuiFlexGroup>
    </>
  );
};
