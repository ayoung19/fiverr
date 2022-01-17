import React, { FC, useEffect, useRef, useState } from "react";
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
  EuiFlexGroup,
  EuiFlexItem,
  EuiText,
  EuiSpacer,
} from "@elastic/eui";

interface Store {
  id: string;
}

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
  const [storedId, setStoredId] = useState<string>();
  const [accountId, setAccountId] = useState<string>("");

  useEffect(() => {
    chrome.storage.local.get("store", ({ store }) => {
      if (store === undefined) {
        chrome.storage.local.set({
          store: {
            id: "",
          },
        });
      }
      setStoredId(store ? store.id : "");
    });
  }, []);

  if (storedId === undefined) {
    return null;
  }

  return (
    <EuiPanel
      paddingSize="m"
      hasBorder={false}
      hasShadow={false}
      color="transparent"
    >
      {storedId.length === 0 ? (
        <EuiForm
          component="form"
          onSubmit={() => {
            chrome.storage.local.set({ store: { id: accountId } });
            setStoredId(accountId);
          }}
        >
          <EuiFormRow>
            <EuiFieldText
              type="text"
              onChange={(event) => {
                setAccountId(event.target.value);
              }}
              value={accountId}
              placeholder="Enter Account ID"
              prepend={<EuiIcon type="user" size="xl" />}
              append={
                <EuiButtonIcon
                  type="submit"
                  aria-label="submit"
                  iconType="sortRight"
                />
              }
              autoFocus={true}
              compressed={true}
            />
          </EuiFormRow>
        </EuiForm>
      ) : (
        <>
          <EuiFlexGroup justifyContent="spaceBetween" responsive={false}>
            <EuiFlexItem grow={false}>
              <EuiText size="s">
                <dl>
                  <dt>Account ID</dt>
                  <dd>{storedId}</dd>
                </dl>
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonIcon
                onClick={() => {
                  setAccountId(storedId);
                  setStoredId("");
                }}
                iconType="pencil"
                color="warning"
                aria-label="edit"
              />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer />
          <Formik
            initialValues={FormInitial}
            validationSchema={FormSchema}
            onSubmit={(values, { resetForm }) => {
              const stripped = values.phone_number.replace(/[^0-9]/g, "");
              alert(
                `https://get.icheckup.com/Request.aspx?ID=${storedId}&N=${stripped}`
              );
              fetch(
                `https://get.icheckup.com/Request.aspx?ID=${storedId}&N=${stripped}`
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
                    append={
                      <EuiButtonIcon
                        type="submit"
                        aria-label="submit"
                        iconType="sortRight"
                      />
                    }
                    autoFocus={true}
                    compressed={true}
                  />
                </EuiFormRow>
              </EuiForm>
            )}
          </Formik>
        </>
      )}
    </EuiPanel>
  );
};
