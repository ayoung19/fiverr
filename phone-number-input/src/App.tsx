import React, { FC } from "react";
import { Formik } from "formik";
import { object, string } from "yup";
import {
  EuiPanel,
  EuiForm,
  EuiFormRow,
  EuiTextColor,
  EuiFieldText,
  EuiIcon,
  EuiButtonIcon,
} from "@elastic/eui";

const FormInitial = { phone_number: "" };

const FormSchema = object().shape({
  phone_number: string().test(
    "is-phone-number",
    "phone_number must contain 10 digits and the first one can't be a 0 or 1",
    (value) => {
      if (!value) {
        return false;
      }

      const stripped = value.replace(/[^0-9]/g, "");
      return (
        stripped.length === 10 && stripped[0] !== "0" && stripped[0] !== "1"
      );
    }
  ),
});

export const App: FC = () => {
  return (
    <EuiPanel
      paddingSize="m"
      hasBorder={false}
      hasShadow={false}
      color="transparent"
    >
      <Formik
        initialValues={FormInitial}
        validationSchema={FormSchema}
        onSubmit={(values, { resetForm }) => {
          const stripped = values.phone_number.replace(/[^0-9]/g, "");
          alert(
            `https://ping.server.com?ID=${values.phone_number}&N=${stripped}`
          );
          fetch(
            `https://ping.server.com?ID=${values.phone_number}&N=${stripped}`
          )
            .then((response) => response.json())
            .then((data) => console.log(data));
          resetForm({ values: FormInitial });
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit }) => (
          <EuiForm component="form" onSubmit={handleSubmit}>
            <EuiFormRow
              helpText={
                errors.phone_number &&
                touched.phone_number && (
                  <EuiTextColor color="danger">
                    {errors.phone_number}
                  </EuiTextColor>
                )
              }
            >
              <EuiFieldText
                name="phone_number"
                type="text"
                onChange={handleChange}
                isInvalid={!!errors.phone_number && touched.phone_number}
                value={values.phone_number}
                placeholder="Enter Phone Number"
                prepend={<EuiIcon type="logoElasticsearch" size="xl" />}
                append={<EuiButtonIcon type="submit" iconType="sortRight" />}
                autoFocus={true}
                compressed={true}
              />
            </EuiFormRow>
          </EuiForm>
        )}
      </Formik>
    </EuiPanel>
  );
};
