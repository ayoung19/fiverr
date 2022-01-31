import React, { FC, useState } from "react";
import { TEMPLATES } from "./utils";
import {
  EuiTextArea,
  EuiButton,
  EuiAccordion,
  EuiText,
  EuiButtonEmpty,
  EuiFlexGroup,
  EuiFlexItem,
  EuiLink,
  EuiListGroup,
  EuiTitle,
  EuiSpacer,
  EuiFlyout,
  EuiFlyoutHeader,
  EuiFlyoutBody,
  EuiPanel,
  EuiHorizontalRule,
  EuiButtonIcon,
} from "@elastic/eui";
import { Option } from "./components/Option";

export const App: FC = () => {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <EuiPanel hasShadow={false} hasBorder={false} color="transparent">
      {options.length === 0 ? (
        <>
          <EuiTitle size="s">
            <h1>Escribano.ai</h1>
          </EuiTitle>
          <EuiSpacer size="s" />
          <EuiText>
            <p>Pon intrucciones para la inteligencia artificial.</p>
          </EuiText>
          <EuiSpacer size="s" />
          <EuiTextArea
            onChange={(e) => setInput(e.target.value)}
            value={input}
            rows={17}
            resize="none"
            aria-label="Main text area"
          />
          <EuiSpacer />
          <EuiButton fullWidth onClick={() => setIsFlyoutVisible(true)}>
            see templates
          </EuiButton>
          <EuiButton
            onClick={() => {
              setIsLoading(true);
              fetch(
                `https://76706.wayscript.io/get?${new URLSearchParams({
                  value: input,
                })}`
              )
                .then((response) => response.json())
                .then((data) => {
                  setIsLoading(false);
                  setOptions(data);
                });
            }}
            isLoading={isLoading}
            disabled={input.length === 0}
            fill
            fullWidth
          >
            {isLoading ? "Redactando..." : "Redacta Ahora"}
          </EuiButton>
          {isFlyoutVisible && (
            <EuiFlyout
              onClose={() => setIsFlyoutVisible(false)}
              size={440}
              paddingSize="m"
            >
              <EuiFlyoutHeader hasBorder>
                <EuiTitle size="s">
                  <h2>Elige una plantilla</h2>
                </EuiTitle>
              </EuiFlyoutHeader>
              <EuiFlyoutBody>
                {Object.entries(
                  TEMPLATES.reduce((acc, template) => {
                    if (!acc[template.category]) {
                      acc[template.category] = [];
                    }
                    acc[template.category].push(template);
                    return acc;
                  }, {} as { [key: string]: Template[] })
                ).map(([category, templates]) => (
                  <>
                    <EuiAccordion
                      id={"lmao"}
                      buttonContent={
                        <EuiText size="m">
                          <h5>{category}</h5>
                        </EuiText>
                      }
                      paddingSize="none"
                    >
                      <EuiListGroup
                        listItems={templates.map((template) => ({
                          label: template.subcategory,
                          onClick: () => {
                            setInput(template.template);
                            setIsFlyoutVisible(false);
                          },
                          size: "s",
                          color: "primary",
                        }))}
                      />
                    </EuiAccordion>
                    <EuiSpacer size="s" />
                  </>
                ))}
              </EuiFlyoutBody>
            </EuiFlyout>
          )}
        </>
      ) : (
        <>
          <EuiButtonIcon
            onClick={() => setOptions([])}
            color="text"
            iconType="sortLeft"
            aria-label="Back button"
          />
          <EuiSpacer size="m" />
          {options.map((option, i) => (
            <>
              {i > 0 && <EuiHorizontalRule />}
              <Option option={option} />
            </>
          ))}
        </>
      )}
    </EuiPanel>
  );
};
