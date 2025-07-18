import { create } from "zustand";
import { persist } from "zustand/middleware";

interface Board {
  id: string;
  name: string;
}

interface BoardStore {
  boards: Board[];
  setBoards: (b: Board[]) => void;
  addBoard: (b: Board) => void;
}

export const useBoardStore = create<BoardStore>()(
  persist(
    (set) => ({
      boards: [],
      setBoards: (boards) => set({ boards }),
      addBoard: (board) =>
        set((state) => ({ boards: [...state.boards, board] })),
    }),
    {
      name: "board-storage",
    }
  )
);
