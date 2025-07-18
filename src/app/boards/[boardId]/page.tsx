"use client";

import BoardHeader from "@/components/boardheader/BoardHeader";
import SwimlaneGrid from "@/components/SwimlaneGrid";
import { useBoardStore } from "@/store/boardStore";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";

const BoardPage = () => {
  const { boardId } = useParams<{ boardId: string }>();

  const board = useBoardStore((s) => s.boards.find((b) => b.id === boardId));

  if (!board) notFound();

  if (board.id !== "sport-xi") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
        <h1 className="text-2xl font-semibold">{board.name}</h1>
        <p className="text-neutral-4">No swimlane data for this board yet.</p>
      </div>
    );
  }

  return (
    <>
      <BoardHeader />
      <SwimlaneGrid />
    </>
  );
};

export default BoardPage;
