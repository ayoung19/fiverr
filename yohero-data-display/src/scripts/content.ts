const occnToRace = (occn: number) => {
  switch (occn) {
    case 1:
      return "Qi";
    case 2:
      return "Shaman";
    case 3:
      return "Mage";
    case 4:
      return "Warrior";
    case 5:
      return "Priest";
    case 6:
      return "Warlock";
    case 7:
      return "Knight";
    case 8:
      return "Assassin";
    default:
      return "";
  }
};

const createTd = (innerText: string, imgSrc?: string) => {
  const td = document.createElement("td");

  if (imgSrc) {
    const img = document.createElement("img");
    img.setAttribute("src", imgSrc);
    img.style.height = "21px";
    img.style.width = "21px";
    td.appendChild(img);
  }

  const text = document.createTextNode(innerText);

  td.appendChild(text);

  return td;
};

const check = (t1: HTMLElement, t2: HTMLElement) => {
  chrome.storage.local.get("store", ({ store }) => {
    if (store) {
      t1.style.display = "none";
      t2.style.display = "table";
    } else {
      t1.style.display = "table";
      t2.style.display = "none";
    }
  });
};

const observer = new MutationObserver((mutations) => {
  const table =
    document.getElementsByTagName("table").length === 1
      ? document.getElementsByTagName("table")[0]
      : document
          .getElementById("tokentxnsErc721")
          ?.getElementsByTagName("iframe")[0]
          .contentWindow?.document.getElementsByTagName("table")[0];

  if (table) {
    const clone = table.cloneNode(true);

    table.parentElement?.prepend(clone);

    const newTable = table.parentElement?.getElementsByTagName("table")[0];

    if (newTable) {
      check(table, newTable);

      chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === "recheck") {
          check(table, newTable);
        }
      });

      const headers = [
        "Token ID",
        "Genesis",
        "Race",
        "# of Summons",
        "HP",
        "ATT",
        "SPO",
        "DEX",
        "CRIT",
      ];

      const thead = newTable.getElementsByTagName("thead")[0];
      const tbody = newTable.getElementsByTagName("tbody")[0];

      thead?.children[0].replaceChildren(
        ...headers.map((header) => {
          const th = document.createElement("th");
          th.setAttribute("scope", "col");
          th.appendChild(document.createTextNode(header));
          return th;
        })
      );

      chrome.runtime.sendMessage(
        {
          type: "fetch",
          petIds: Array.from(
            new Set(
              Array.from(table.getElementsByTagName("tr"))
                .slice(1)
                .map((tr) =>
                  parseInt(tr.getElementsByTagName("a")[3].innerText)
                )
            )
          ),
        },
        (data) => {
          tbody?.replaceChildren(
            ...data.map((response: any) => {
              const message = JSON.parse(response.message);
              const newTr = document.createElement("tr");

              newTr.appendChild(createTd(message.pet.id.toString()));
              newTr.appendChild(
                createTd(
                  "",
                  message.pet.genesis === 1
                    ? chrome.runtime.getURL("genesis.png")
                    : undefined
                )
              );
              newTr.appendChild(
                createTd(
                  occnToRace(message.pet.occn),
                  chrome.runtime.getURL(
                    `${occnToRace(message.pet.occn).toLowerCase()}.png`
                  )
                )
              );
              newTr.appendChild(createTd(`${message.pet.callNum} / 7`));
              newTr.appendChild(createTd(message.hp));
              newTr.appendChild(createTd(message.attack));
              newTr.appendChild(createTd(message.speed));
              newTr.appendChild(createTd(message.dod));
              newTr.appendChild(createTd(message.crit));

              return newTr;
            })
          );
        }
      );
    }

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
