chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type == "fetch") {
    fetch("https://yohero.fi/api", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        code: 1097,
        playerId: "",
        message: {
          petId: message.petId,
        },
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        sendResponse(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        sendResponse(null);
      });
  }
  return true;
});

export {};
