import { DEFAULT_BOARD_SIZE, DEFAULT_UPDATE_FREQ } from "./config";
import type { BoardMatrix } from "./types";

const saveLSKey = "game:config";

interface SaveConfig {
  boardSize: number;
  speed: number;
  boardMatrix: BoardMatrix;
}

export const saveCurrentConfig = (config: SaveConfig) => {
  if (typeof localStorage !== "undefined")
    localStorage.setItem(saveLSKey, JSON.stringify(config));
};

export const getLastSave = (): SaveConfig | undefined => {
  if (typeof localStorage === "undefined") return;

  const lastSave = localStorage.getItem(saveLSKey);

  if (lastSave) return JSON.parse(lastSave);
  else return undefined;
};

export const getInitialBoardSize = () => {
  const save = getLastSave();
  return save ? save.boardSize : DEFAULT_BOARD_SIZE;
};

export const getInitialSpeed = () => {
  const save = getLastSave();
  return save ? save.speed : DEFAULT_UPDATE_FREQ;
};

export const getInitialBoardMatrix = () => {
  const save = getLastSave();
  return save
    ? save.boardMatrix
    : Array.from({ length: DEFAULT_BOARD_SIZE }, () =>
        Array.from({ length: DEFAULT_BOARD_SIZE }, () => false)
      );
};
