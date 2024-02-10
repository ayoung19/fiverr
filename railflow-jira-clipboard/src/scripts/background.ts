import Papa from "papaparse";

chrome.runtime.onInstalled.addListener(async () => {
  await chrome.offscreen.createDocument({
    url: "offscreen/index.html",
    reasons: [chrome.offscreen.Reason.CLIPBOARD],
    justification: "Write text to the clipboard.",
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "copy") {
    fetch(message.url)
      .then((response) => response.blob())
      .then((blob) => blob.text())
      .then((data) =>
        sendResponse(Papa.unparse(Papa.parse(data).data, { delimiter: "\x09" }))
      );
  }

  return true;
});

export {};
