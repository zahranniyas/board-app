"use client";

import BoardHeader from "@/components/boardheader/BoardHeader";
import SwimlaneGrid from "@/components/SwimlaneGrid";
import { useBoardStore } from "@/store/boardStore";
import { notFound } from "next/navigation";
import { useParams } from "next/navigation";
import { useEffect } from "react";

const BoardPage = () => {
  const { boardId } = useParams<{ boardId: string }>();

  const { boards, setBoards } = useBoardStore();

  useEffect(() => {
    if (boards.length === 0) {
      fetch("/api/boards")
        .then((r) => r.json())
        .then(setBoards)
        .catch(console.error);
    }
  }, [boards.length, setBoards]);

  if (boards.length === 0) {
    return <div className="p-6 text-neutral-4">Loading board…</div>;
  }

  const board = boards.find((b) => b.id === boardId);

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
