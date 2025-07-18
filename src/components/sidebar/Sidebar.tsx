"use client";
import { useBoardStore } from "@/store/boardStore";
import React, { useEffect, useState } from "react";
import WorkspaceSelector from "./WorkspaceSelector";
import NavItem from "./NavItem";
import NavSection from "./NavSection";
import LogoutIcon from "@/assets/icons/sidebar/sign-out.svg";

const Sidebar: React.FC = () => {
  const { boards, setBoards } = useBoardStore();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (boards.length === 0) {
      (async () => {
        try {
          const res = await fetch("/api/boards");
          if (!res.ok) throw new Error("Network response was not ok");
          const data = await res.json();
          setBoards(data);
        } catch (err) {
          console.error(err);
          setError(true);
        }
      })();
    }
  }, [boards.length, setBoards]);

  if (error)
    return (
      <aside className="flex h-full w-72 items-center justify-center border-r border-neutral-6 p-6">
        <p className="text-red-600">Couldn’t load boards.</p>
      </aside>
    );

  const boardLinks = boards.map((b) => ({
    href: `/boards/${b.id}`,
    label: b.name,
  }));

  return (
    <aside className="w-72 h-full border-r border-neutral-6 p-6 flex flex-col justify-between">
      {/* Top Links */}
      <div>
        <WorkspaceSelector />
        <nav className="mt-4 space-y-3.5">
          <NavItem href="/dashboard" label="Dashboard" icon="grid" />
          <NavSection label="Boards" icon="folder" boards={boardLinks} />
          <NavItem href="/messages" label="Messages" icon="message" badge="3" />
          <NavItem href="/calendar" label="Calendar" icon="calendar" />
          <NavItem href="/team-members" label="Team Members" icon="user" />
        </nav>
      </div>

      {/* Bottom links */}
      <div className="space-y-3.5">
        <NavItem href="/support" label="Support" icon="infoCircle" />
        <button
          type="button"
          className="flex items-center gap-5 h-12 w-full p-3 rounded-lg active:scale-95 hover:bg-neutral-1 transition-all focus:outline-none text-white bg-neutral-3 cursor-pointer"
        >
          <LogoutIcon className="h-6 w-6 shrink-0" />
          <span className=" text-base font-medium">Logout</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
