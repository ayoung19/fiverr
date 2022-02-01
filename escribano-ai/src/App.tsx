import React, { Children, FC, useEffect, useState } from "react";
import { ALL_TEMPLATES } from "./utils";
import {
  EuiTextArea,
  EuiButton,
  EuiAccordion,
  EuiText,
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
  EuiFormRow,
  EuiFlexGroup,
  EuiFlexItem,
} from "@elastic/eui";

export const App: FC = () => {
  const [input, setInput] = useState("");
  const [options, setOptions] = useState<string[]>([]);
  const [isFlyoutVisible, setIsFlyoutVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState<string>();

  useEffect(() => {
    navigator.clipboard.readText().then((text) => setCopied(text));
  }, []);

  return (
    <EuiPanel
      hasShadow={false}
      hasBorder={false}
      color="transparent"
      onCopy={() => {
        navigator.clipboard.readText().then((text) => setCopied(text));
      }}
    >
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
          <EuiFormRow
            helpText={
              <EuiLink onClick={() => setIsFlyoutVisible(true)}>
                Ver plantillas
              </EuiLink>
            }
          >
            <EuiTextArea
              onChange={(e) => setInput(e.target.value)}
              value={input}
              rows={18}
              resize="none"
              aria-label="Main text area"
            />
          </EuiFormRow>
          <EuiSpacer />
          <EuiButton
            onClick={() => {
              chrome.storage.local.get("useCount", ({ useCount = 0 }) => {
                if (useCount === 2) {
                  window.open("https://www.google.com/");
                } else {
                  chrome.storage.local.set({ useCount: useCount + 1 });
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
                }
              });
            }}
            isLoading={isLoading}
            disabled={input.length === 0}
            fill={true}
            fullWidth={true}
          >
            {isLoading ? "Redactando..." : "Redacta Ahora"}
          </EuiButton>
          {isFlyoutVisible && (
            <EuiFlyout
              onClose={() => setIsFlyoutVisible(false)}
              size={300}
              paddingSize="m"
            >
              <EuiFlyoutHeader hasBorder={true}>
                <EuiTitle size="s">
                  <h2>Elige una plantilla</h2>
                </EuiTitle>
              </EuiFlyoutHeader>
              <EuiFlyoutBody>
                {Children.toArray(
                  Object.entries(
                    ALL_TEMPLATES.reduce((acc, template) => {
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
                              setInput(template.content);
                              setIsFlyoutVisible(false);
                            },
                            size: "s",
                            color: "primary",
                          }))}
                        />
                      </EuiAccordion>
                      <EuiSpacer size="s" />
                    </>
                  ))
                )}
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
          {Children.toArray(
            options.map((option, i) => (
              <>
                {i > 0 && <EuiHorizontalRule />}
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
                          setCopied(option);
                        });
                      }}
                      fill={copied === option}
                      size="s"
                      iconType="copyClipboard"
                      iconSide="right"
                    >
                      {copied === option ? "Copiado" : "Copiar"}
                    </EuiButton>
                  </EuiFlexItem>
                </EuiFlexGroup>
              </>
            ))
          )}
        </>
      )}
    </EuiPanel>
  );
};
