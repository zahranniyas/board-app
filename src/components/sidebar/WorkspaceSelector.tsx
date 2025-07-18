"use client";

import React, { useEffect, useRef, useState } from "react";
import ImageFieldIcon from "@/assets/icons/image-field.svg";
import ArrowDownIcon from "@/assets/icons/arrow-down.svg";

const WORKSPACES = [{ value: "root", label: "Root folder" }];

const WorkspaceSelector = () => {
  // Manage the state of the dropdown
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(WORKSPACES[0]);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Close the dropdown when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div
      onClick={() => setOpen((o) => !o)}
      ref={wrapperRef}
      className="relative cursor-pointer mx-auto flex h-16 w-60 items-center gap-3 rounded-lg border-neutral-7 border-2 px-3"
    >
      {/* Workspace icon */}
      <div className="w-11 h-11 shrink-0 rounded-full bg-neutral-3 flex items-center justify-center">
        <ImageFieldIcon className="h-4 w-4 shrink-0 text-white" />
      </div>

      {/* Active workspace label */}
      <div className="flex flex-col text-left gap-1">
        <span className="text-sm leading-none text-neutral-5">workspace</span>
        <div className="flex items-center font-medium text-neutral-1 focus:outline-none">
          {active.label}
        </div>
      </div>

      {/* Dropdown arrow icon */}
      <ArrowDownIcon
        className={`ml-auto h-6 w-6 text-neutral-3 pointer-events-none transition-transform duration-200 ${
          open ? "rotate-180" : ""
        }`}
      />

      {/* Dropdown menu */}
      {open && (
        <ul className="absolute p-1 left-0 top-full z-10 mt-1 w-full rounded-lg border border-neutral-6 hover:bg-neutral-7 bg-neutral-8 shadow-lg">
          {WORKSPACES.map((ws) => (
            <li key={ws.value}>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setActive(ws);
                  setOpen(false);
                }}
                className={`flex w-full cursor-pointer items-center gap-3 px-3 py-2 text-sm font-medium
                  ${
                    ws.value === active.value
                      ? "  text-primary"
                      : "text-neutral-1 "
                  }`}
              >
                <span>{ws.label}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default WorkspaceSelector;
