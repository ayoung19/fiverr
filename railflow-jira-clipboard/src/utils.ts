interface StoredState {
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

export type Message =
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
