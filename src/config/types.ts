export type LiveIndices = [number, number][];

export interface BoardState {
  width: number;
  height: number;
  aliveCellIndices: LiveIndices;
}
