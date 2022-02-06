import React, { FC, useEffect, useState } from "react";
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
  EuiGlobalToastList,
  EuiImage,
} from "@elastic/eui";
import { Toast } from "@elastic/eui/src/components/toast/global_toast_list";
import { v4 } from "uuid";

const FormInitial = { phone_number: "" };

const FormSchema = object().shape({
  phone_number: string().test(
    "is-phone-number",
    "Please enter a valid phone number.",
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
  const [storedName, setStoredName] = useState<string>();
  const [accountId, setAccountId] = useState<string>("");
  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    chrome.storage.local.get("store", ({ store = { id: "", name: "" } }) => {
      setStoredId(store.id);
      setStoredName(store.name);
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
      <EuiGlobalToastList
        toasts={toasts}
        dismissToast={(removedToast) => {
          setToasts((prevState) =>
            prevState.filter((toast) => toast.id !== removedToast.id)
          );
        }}
        toastLifeTimeMs={1000}
      />
      {storedId.length === 0 ? (
        <EuiForm
          component="form"
          onSubmit={(event) => {
            event.preventDefault();
            fetch(`https://get.icheckup.com/request.asmx/ID?id=${accountId}`)
              .then((response) => response.json())
              .then((data) => {
                if (data.Valid === "Yes") {
                  chrome.storage.local.set({
                    store: { id: accountId, name: data.Message },
                  });
                  setStoredId(accountId);
                  setStoredName(data.Message);
                } else {
                  setToasts((prevState) =>
                    prevState.concat({
                      id: v4(),
                      title: "Error",
                      text: data.Message,
                      color: "danger",
                      iconType: "alert",
                    })
                  );
                }
              });
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
                  disabled={accountId.length === 0}
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
                <span>{storedName}</span>
              </EuiText>
            </EuiFlexItem>
            <EuiFlexItem grow={false}>
              <EuiButtonIcon
                onClick={() => {
                  setAccountId(storedId);
                  setStoredId("");
                  setStoredName("");
                }}
                iconType="pencil"
                color="warning"
                aria-label="edit"
              />
            </EuiFlexItem>
          </EuiFlexGroup>
          <EuiSpacer size="m" />
          <Formik
            initialValues={FormInitial}
            validationSchema={FormSchema}
            onSubmit={(values, { resetForm }) => {
              const stripped = values.phone_number.replace(/[^0-9]/g, "");
              fetch(
                `https://get.icheckup.com/request.asmx/Feedback?id=${storedId}&n=${stripped}`
              )
                .then((response) => response.text())
                .then((data) => {
                  if (data.toLowerCase().includes("success")) {
                    setToasts((prevState) =>
                      prevState.concat({
                        id: v4(),
                        title: "Success",
                        text: "Request was successfully sent!",
                        color: "success",
                        iconType: "check",
                      })
                    );
                  } else {
                    setToasts((prevState) =>
                      prevState.concat({
                        id: v4(),
                        title: "Error",
                        text: "Request was not sent. Please check your configuration.",
                        color: "danger",
                        iconType: "alert",
                      })
                    );
                  }
                });
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
                    prepend={
                      <EuiPanel
                        paddingSize="s"
                        hasBorder={false}
                        hasShadow={false}
                        color="transparent"
                        grow={false}
                      >
                        <EuiImage size={16} alt="logo" src="./logo.png" />
                      </EuiPanel>
                    }
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
