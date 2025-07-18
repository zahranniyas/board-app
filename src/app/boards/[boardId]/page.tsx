"use client";
import { useBoardStore } from "@/store/boardStore";
import { notFound } from "next/navigation";
import { use } from "react";

const BoardPage = ({ params }: { params: Promise<{ boardId: string }> }) => {
  const { boardId } = use(params);

  const board = useBoardStore((s) => s.boards.find((b) => b.id === boardId));

  if (!board) notFound();

  return (
    <div className="p-8">
      <h1 className="text-2xl font-semibold">{board.name}</h1>
      <p className="">Board content loading...</p>
    </div>
  );
};

export default BoardPage;
