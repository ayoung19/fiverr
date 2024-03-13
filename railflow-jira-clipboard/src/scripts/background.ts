import Papa from "papaparse";
import {
  MessageToBackground,
  getStoredState,
  getTransformedCsv,
  initializeStoredState,
  setStoredState,
} from "../utils";

chrome.runtime.onInstalled.addListener(async () => {
  initializeStoredState();

  await chrome.offscreen.createDocument({
    url: "offscreen/index.html",
    reasons: [chrome.offscreen.Reason.CLIPBOARD],
    justification: "Write text to the clipboard.",
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  handleMessage(message, sender).then(sendResponse);
  return true;
});

const handleMessage = async (
  message: MessageToBackground,
  sender: chrome.runtime.MessageSender
) => {
  if (message.type === "request") {
    const response = await fetch(
      `${message.origin}/sr/jira.issueviews:searchrequest-csv-all-fields/temp/SearchRequest.csv?jqlQuery=project+%3D+%22${message.project}%22+ORDER+BY+created+DESC&atl_token=${message.token}&tempMax=1000`
    );
    const blob = await response.blob();
    const data = await blob.text();

    const parseResult = Papa.parse(data, { header: true });

    if (parseResult.meta.fields === undefined) {
      return null;
    }

    const prevStoredState = await getStoredState();

    if (
      prevStoredState.projectToColumnSettings[message.project] === undefined
    ) {
      prevStoredState.projectToColumnSettings[message.project] =
        parseResult.meta.fields.reduce((acc, curr) => {
          acc[curr] = true;

          return acc;
        }, {} as { [key: string]: boolean });
    }

    const newStoredState = {
      ...prevStoredState,
      originalCsv: data,
      project: message.project,
    };

    chrome.runtime.sendMessage({
      type: "copy",
      value: getTransformedCsv(newStoredState),
    });

    await setStoredState(newStoredState);

    return true;
  }

  if (message.type === "clipboardValue") {
    const { originalCsv, project, ...rest } = await getStoredState();

    if (originalCsv === undefined || project === undefined) {
      return null;
    }

    if (
      message.value !==
        getTransformedCsv(
          { ...rest, originalCsv, project },
          { isCryptolensKeyValidOverride: true }
        ) &&
      message.value !==
        getTransformedCsv(
          { ...rest, originalCsv, project },
          { isCryptolensKeyValidOverride: false }
        )
    ) {
      await setStoredState({
        ...rest,
        originalCsv: undefined,
        project: undefined,
      });

      return true;
    }

    if (
      message.value !== getTransformedCsv({ ...rest, originalCsv, project })
    ) {
      const response = (await chrome.runtime.sendMessage({
        type: "copy",
        value: getTransformedCsv({ ...rest, originalCsv, project }),
      })) as true | null;

      return response;
    }

    return true;
  }

  if (message.type === "forwardCopy") {
    const response = (await chrome.runtime.sendMessage({
      type: "copy",
      value: message.value,
    })) as true | null;

    return response;
  }

  return null;
};
