import Papa from "papaparse";

export interface StoredState {
  originalCsv?: string;
  project?: string;
  projectToColumnSettings: {
    [project: string]: {
      [column: string]: boolean;
    };
  };
  extensionSettings: {
    cryptolens?: {
      key: string;
      expiresAt: number;
    };
  };
}

const initialStoredState: StoredState = {
  projectToColumnSettings: {},
  extensionSettings: {},
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

export const isCryptolensKeyValid = (
  cryptolens: StoredState["extensionSettings"]["cryptolens"]
) => {
  if (!cryptolens) {
    return false;
  }

  return cryptolens.expiresAt > new Date().getTime();
};

export const getTransformedCsv = (
  storedState: Required<StoredState>,
  options?: { isCryptolensKeyValidOverride?: boolean }
) => {
  const parseResult = Papa.parse(storedState.originalCsv, { header: true });

  const valid =
    options?.isCryptolensKeyValidOverride === undefined
      ? isCryptolensKeyValid(storedState.extensionSettings.cryptolens)
      : options.isCryptolensKeyValidOverride;

  const transformedCsv = Papa.unparse(
    {
      data: parseResult.data.slice(0, valid ? parseResult.data.length : 25),
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

  if (!valid) {
    return transformedCsv.concat(
      "\nThe free version of the extension is limited to 25 rows."
    );
  }

  return transformedCsv;
};

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
