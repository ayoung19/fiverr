import Papa from "papaparse";

export interface StoredState {
  originalCsv?: string;
  project?: string;
  projectToColumnSettings: {
    [project: string]: {
      [column: string]: boolean;
    };
  };
}

const initialStoredState: StoredState = {
  projectToColumnSettings: {},
};

export const initializeStoredState = async () => {
  const { state } = await chrome.storage.local.get("state");

  if (state === undefined) {
    setStoredState(initialStoredState);
  }
};

export const setStoredState = async (state: StoredState) => {
  return await chrome.storage.local.set({ state });
};

export const getStoredState = async () => {
  const { state } = await chrome.storage.local.get("state");

  return state as StoredState;
};

export const getTransformedCsv = (storedState: Required<StoredState>) =>
  Papa.unparse(
    {
      data: Papa.parse(storedState.originalCsv, { header: true }).data,
      fields: Object.entries(
        storedState.projectToColumnSettings[storedState.project]
      )
        .filter(([_, v]) => v)
        .map(([k, _]) => k)
        .sort((a, b) => a.localeCompare(b)),
    },
    {
      newline: "\n",
      delimiter: "\x09",
    }
  );

export type MessageToBackground =
  | {
      type: "request";
      origin: string;
      project: string;
      token: string;
    }
  | {
      type: "clipboardValue";
      value: string;
    }
  | {
      type: "forwardCopy";
      value: string;
    };

export type MessageToOffscreen = { type: "copy"; value: string };
