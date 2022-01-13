import React, { FC, useEffect, useState } from "react";
import { Formik } from "formik";
import { object, string } from "yup";
import {
  EuiPanel,
  EuiForm,
  EuiFormRow,
  EuiTextColor,
  EuiFieldText,
  EuiButton,
} from "@elastic/eui";

const SettingsSchema = object().shape({
  endpoint: string().strict(),
});

export const App: FC = () => {
  const [savedSettings, setSavedSettings] = useState<Settings>();

  useEffect(() => {
    chrome.storage.local.get("settings", ({ settings }) => {
      setSavedSettings(settings);
    });
  }, []);

  if (typeof savedSettings !== "object") {
    return null;
  }

  return (
    <EuiPanel
      paddingSize="m"
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
              label="Endpoint"
              helpText={
                errors.endpoint &&
                touched.endpoint && (
                  <EuiTextColor color="danger">{errors.endpoint}</EuiTextColor>
                )
              }
            >
              <EuiFieldText
                name="endpoint"
                type="text"
                onChange={handleChange}
                value={values.endpoint}
                isInvalid={!!errors.endpoint && touched.endpoint}
                autoFocus={true}
              />
            </EuiFormRow>
            <EuiButton type="submit" disabled={!dirty} fill fullWidth>
              Save Changes
            </EuiButton>
          </EuiForm>
        )}
      </Formik>
    </EuiPanel>
  );
};
