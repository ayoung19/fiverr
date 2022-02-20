chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type == "fetch") {
    Promise.all(
      message.petIds.map(async (id: number) => {
        const response = await fetch("https://yohero.fi/api", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            code: 1097,
            playerId: "",
            message: {
              petId: id,
            },
          }),
        });

        const data = await response.json();

        return data;
      })
    ).then((data) => {
      sendResponse(data);
    });
  }
  return true;
});

export {};
