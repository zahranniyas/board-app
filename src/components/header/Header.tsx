"use client";
import Image from "next/image";
import PlusIcon from "@/assets/icons/plus-2.svg";
import SearchIcon from "@/assets/icons/search.svg";
import SettingsIcon from "@/assets/icons/settings.svg";
import BellIcon from "@/assets/icons/bell.svg";
import ImageFieldIcon from "@/assets/icons/image-field.svg";
import { useTaskStore } from "@/store/taskStore";
import { useEffect, useState } from "react";

const Header = () => {
  const query = useTaskStore((s) => s.query);
  const setQuery = useTaskStore((s) => s.setQuery);

  // local input state
  const [local, setLocal] = useState(query);

  // Added a debounce to handle large list of tasks more efficiently
  useEffect(() => {
    const id = setTimeout(() => setQuery(local), 200);
    return () => clearTimeout(id);
  }, [local, setQuery]);

  return (
    <header className="h-20 w-full flex items-center justify-between px-6 border-b border-neutral-6">
      <Image src="/assets/board-logo.svg" alt="logo" width={98} height={24} />
      <div className="flex items-center gap-12">
        <div className="flex items-center gap-6">
          {/* Add board */}
          <button
            onClick={() => console.log("To be implemented")}
            className="h-12 bg-primary text-white px-3 rounded-md flex items-center cursor-pointer hover:bg-primary/90 transition-all active:scale-95"
          >
            <span className="mr-3 font-semibold text-xs">Create new board</span>
            <PlusIcon className="w-6 h-6 text-white" />
          </button>

          {/* Search */}
          <div className="bg-neutral-7 rounded-lg h-12 w-40 md:w-60 flex items-center gap-3 px-3">
            <SearchIcon className="w-4 h-4 text-neutral-4" />
            <input
              type="text"
              aria-label="Search tasks"
              placeholder="Search tasks ..."
              className="placeholder:text-neutral-5 placeholder:text-xs focus:outline-none bg-transparent flex-1"
              value={local}
              onChange={(e) => setLocal(e.target.value)}
            />
          </div>
        </div>
        <div className="flex items-center gap-[14px]">
          <button
            onClick={() => console.log("To be implemented")}
            type="button"
            className="cursor-pointer transition-transform active:scale-95"
          >
            <SettingsIcon className="w-6 h-6 text-neutral-5 hover:text-neutral-4 transition-colors" />
          </button>
          <button
            onClick={() => console.log("To be implemented")}
            type="button"
            className="relative cursor-pointer transition-transform active:scale-95"
          >
            <div className="w-1.5 h-1.5 absolute right-[4px] top-[3px] bg-orange rounded-full" />
            <BellIcon className="w-6 h-6 text-neutral-5 hover:text-neutral-4 transition-colors" />
          </button>
          <button
            onClick={() => console.log("To be implemented")}
            type="button"
            className="w-7.5 h-7.5 bg-neutral-3 hover:bg-neutral-4 rounded-full flex items-center justify-center cursor-pointer transition-all active:scale-95"
          >
            <ImageFieldIcon className="w-[12.5px] h-[12.5px] text-white" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
