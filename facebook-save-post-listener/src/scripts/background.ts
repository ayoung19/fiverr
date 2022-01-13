chrome.runtime.onMessage.addListener((msg) => {
  if (msg.type == "post") {
    chrome.storage.local.get("settings", ({ settings }) => {
      if (settings.endpoint.length > 0) {
        fetch(settings.endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(msg.body),
        })
          .then((response) => response.json())
          .then((data) => {
            console.log("Success:", data);
          })
          .catch((error) => {
            console.error("Error:", error);
          });
      }
    });
  }
});

const initialSettings: Settings = {
  endpoint: "",
};

chrome.storage.local.get("settings", ({ settings }) => {
  if (settings === undefined) {
    chrome.storage.local.set({
      settings: initialSettings,
    });
  }
});

export {};
