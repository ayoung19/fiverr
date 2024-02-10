import Papa from "papaparse";
import {
  Message,
  getStoredState,
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
  message: Message,
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

    const storedState = await getStoredState();

    if (storedState.projectToColumnSettings[message.project] === undefined) {
      storedState.projectToColumnSettings[message.project] =
        parseResult.meta.fields.reduce((acc, curr) => {
          acc[curr] = true;

          return acc;
        }, {} as { [key: string]: boolean });
    }

    storedState.originalCsv = Papa.unparse(Papa.parse(data).data);
    storedState.project = message.project;

    await setStoredState(storedState);

    const activeColumns = Object.entries(
      storedState.projectToColumnSettings[message.project]
    )
      .filter(([_, v]) => v)
      .map(([k, _]) => k);

    chrome.runtime.sendMessage({
      type: "copy",
      value: Papa.unparse(Papa.parse(storedState.originalCsv).data, {
        newline: "\n",
        delimiter: "\x09",
        columns: activeColumns,
      }),
    });

    return null;
  }

  if (message.type === "clipboardValue") {
    const storedState = await getStoredState();

    if (
      storedState.originalCsv === undefined ||
      storedState.project === undefined
    ) {
      return null;
    }

    const activeColumns = Object.entries(
      storedState.projectToColumnSettings[storedState.project]
    )
      .filter(([_, v]) => v)
      .map(([k, _]) => k);

    if (
      Papa.unparse(Papa.parse(storedState.originalCsv).data, {
        newline: "\n",
        delimiter: "\x09",
        columns: activeColumns,
      }) !== message.value
    ) {
      console.log("removing data");
      await setStoredState({
        ...storedState,
        originalCsv: undefined,
        project: undefined,
      });
    }

    return null;
  }

  console.log("BAD MESSAGE", message);
};
