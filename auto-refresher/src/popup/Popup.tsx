import React, { FC, useEffect, useState } from "react";
import { Formik } from "formik";
import { object, string, number, boolean } from "yup";
import {
  EuiPanel,
  EuiForm,
  EuiFormRow,
  EuiTextColor,
  EuiFieldText,
  EuiCheckbox,
  EuiButton,
  EuiSpacer,
  EuiFlexGroup,
  EuiSwitch,
} from "@elastic/eui";

const SettingsSchema = object().shape({
  query: string().strict(),
  sleep: number().positive().required().strict(),
  allTabs: boolean().required().strict(),
});

export const Popup: FC = () => {
  const [savedSettings, setSavedSettings] = useState<Settings>();
  const [switchOn, setSwitchOn] = useState<boolean>();

  useEffect(() => {
    chrome.storage.local.get("settings", ({ settings }) => {
      setSavedSettings(settings);
    });

    chrome.storage.local.get("caller", ({ caller }) => {
      setSwitchOn(!!caller.tabId);
    });
  }, []);

  if (typeof savedSettings !== "object" || typeof switchOn !== "boolean") {
    return null;
  }

  return (
    <EuiPanel
      paddingSize="l"
      hasBorder={false}
      hasShadow={false}
      color="transparent"
    >
      <Formik
        initialValues={savedSettings}
        validationSchema={SettingsSchema}
        onSubmit={(values, { resetForm }) => {
          chrome.storage.local.set({
            settings: values,
          });
          resetForm({ values });
          setSavedSettings(values);
        }}
      >
        {({ values, errors, touched, dirty, handleChange, handleSubmit }) => (
          <EuiForm component="form" onSubmit={handleSubmit}>
            <EuiFormRow
              label="Query"
              helpText={
                errors.query &&
                touched.query && (
                  <EuiTextColor color="danger">{errors.query}</EuiTextColor>
                )
              }
            >
              <EuiFieldText
                name="query"
                type="text"
                onChange={handleChange}
                value={values.query}
                isInvalid={errors.query && touched.query}
                disabled={switchOn}
              />
            </EuiFormRow>
            <EuiFormRow
              label="Sleep"
              helpText={
                errors.sleep &&
                touched.sleep && (
                  <EuiTextColor color="danger">{errors.sleep}</EuiTextColor>
                )
              }
            >
              <EuiFieldText
                name="sleep"
                type="number"
                onChange={handleChange}
                value={values.sleep}
                isInvalid={errors.sleep && touched.sleep}
                disabled={switchOn}
              />
            </EuiFormRow>
            <EuiFormRow hasChildLabel={false}>
              <EuiCheckbox
                id="allTabs"
                name="allTabs"
                onChange={handleChange}
                label="Run on all tabs"
                checked={values.allTabs}
                disabled={switchOn}
              />
            </EuiFormRow>
            <EuiButton type="submit" disabled={!dirty} fill fullWidth>
              Save Changes
            </EuiButton>
          </EuiForm>
        )}
      </Formik>
      <EuiSpacer size="xl" />
      <EuiFlexGroup justifyContent="center">
        <EuiFormRow>
          <EuiSwitch
            label=""
            checked={switchOn}
            onChange={() => {
              setSwitchOn((prevState) => {
                const newState = !prevState;

                chrome.tabs.query(
                  { active: true, currentWindow: true },
                  ([tab]) => {
                    chrome.storage.local.set({
                      caller: {
                        tabId: newState ? tab.id : undefined,
                      },
                    });
                  }
                );

                if (newState) {
                  chrome.tabs.query(
                    savedSettings.allTabs
                      ? {}
                      : { active: true, currentWindow: true },
                    (tabs) => {
                      console.log(tabs);
                      tabs.forEach((tab) => {
                        chrome.tabs.sendMessage(tab.id, { type: "reload" });
                      });
                    }
                  );
                }

                return newState;
              });
            }}
          />
        </EuiFormRow>
      </EuiFlexGroup>
    </EuiPanel>
  );
};
