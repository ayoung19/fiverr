const observer = new MutationObserver((mutations) => {
  const table = document
    .getElementById("tokentxnsErc721")
    ?.getElementsByTagName("iframe")[0]
    .contentWindow?.document.getElementsByTagName("table")[0];

  console.log(table);

  if (table) {
    const trs = table.getElementsByTagName("tr");
    const newHeaders = ["# of Summons"];
    trs[0].append(
      ...newHeaders.map((header) => {
        const th = document.createElement("th");
        const text = document.createTextNode(header);

        th.setAttribute("scope", "col");
        th.appendChild(text);

        return th;
      })
    );

    Array.from(trs)
      .slice(1)
      .forEach(async (tr) => {
        console.log(parseInt(tr.getElementsByTagName("a")[3].innerText));
        chrome.runtime.sendMessage(
          {
            type: "fetch",
            petId: parseInt(tr.getElementsByTagName("a")[3].innerText),
          },
          (data) => {
            const message = JSON.parse(data.message);
            console.log(message);

            const td = document.createElement("td");
            const span = document.createElement("span");
            const text = document.createTextNode(`${message.pet.callNum} / 7`);

            span.appendChild(text);
            td.appendChild(span);
            tr.appendChild(td);
          }
        );
      });
    observer.disconnect();
    return;
  }
});

observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  characterData: true,
});

export {};
