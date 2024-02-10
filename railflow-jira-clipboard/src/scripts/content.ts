const setButtonText = (button: HTMLButtonElement, text: string) => {
  button.replaceChildren(document.createTextNode(text));
};

const atlassianToken = document.querySelector("#atlassian-token");

if (atlassianToken !== null) {
  const token = atlassianToken.getAttribute("content");

  if (token !== null) {
    const container = document.querySelector(
      "._1e0c1txw._2lx2vrvc._1n261q9c._2hwxidpf"
    );

    if (container !== null) {
      const match = window.location.href.match(/projects\/(.*?)\/issues/);

      if (match !== null) {
        const [_, project] = match;

        const button = document.createElement("button");
        setButtonText(button, "Copy CSV");

        button.addEventListener("click", () => {
          setButtonText(button, "Copying...");

          chrome.runtime.sendMessage(
            {
              type: "request",
              origin: window.location.origin,
              project,
              token,
            },
            () => {
              setButtonText(button, "Copy CSV");
            }
          );
        });

        container.prepend(button);
      }
    }
  }
}

export {};
