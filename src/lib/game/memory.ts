import type { BoardMatrix } from "./types";

const saveLSKey = "game:config";

interface SaveConfig {
  boardSize: number;
  speed: number;
  boardMatrix: BoardMatrix;
}

export const saveCurrentConfig = (config: SaveConfig) => {
  localStorage.setItem(saveLSKey, JSON.stringify(config));
};

export const getLastSave = (): SaveConfig | undefined => {
  if (typeof localStorage === "undefined") return;

  const lastSave = localStorage.getItem(saveLSKey);

  if (lastSave) return JSON.parse(lastSave);
  else return undefined;
};
