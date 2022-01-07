import React, { FC, useEffect, useState } from "react";
import { Formik } from "formik";
import { object, string, number, boolean } from "yup";
import {
  EuiForm,
  EuiFormRow,
  EuiTextColor,
  EuiFieldText,
  EuiCheckbox,
  EuiButton,
} from "@elastic/eui";

const SettingsSchema = object().shape({
  query: string().strict(),
  sleep: number().positive().required().strict(),
  allTabs: boolean().required().strict(),
});

export const Popup: FC = () => {
  const [initialSettings, setInitialSettings] = useState<Settings | null>(null);

  useEffect(() => {
    chrome.storage.local.get("settings", ({ settings }) => {
      setInitialSettings(settings);
    });
  }, []);

  return (
    initialSettings && (
      <Formik
        initialValues={initialSettings}
        validationSchema={SettingsSchema}
        onSubmit={(values, { resetForm }) => {
          chrome.storage.local.set({
            settings: values,
          });
          resetForm({ values });
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
              />
            </EuiFormRow>
            <EuiFormRow hasChildLabel={false}>
              <EuiCheckbox
                id="allTabs"
                name="allTabs"
                onChange={handleChange}
                label="Run on all tabs"
                checked={values.allTabs}
              />
            </EuiFormRow>
            <EuiButton type="submit" disabled={!dirty} fill fullWidth>
              Save Changes
            </EuiButton>
          </EuiForm>
        )}
      </Formik>
    )
  );
};
