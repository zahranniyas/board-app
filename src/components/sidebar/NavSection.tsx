"use client";
import * as Icons from "@/assets/icons/sidebar";
import { useState } from "react";
import ArrowDownIcon from "@/assets/icons/arrow-down.svg";
import NavItemSub from "./NavItemSub";
import { usePathname } from "next/navigation";

interface BoardLink {
  href: string;
  label: string;
}

interface NavSectionProps {
  label: string;
  icon: keyof typeof Icons;
  boards: BoardLink[];
}

const NavSection: React.FC<NavSectionProps> = ({ label, icon, boards }) => {
  const [open, setOpen] = useState(true);
  const Icon = Icons[icon];

  const pathname = usePathname();
  const subActive = boards.some((b) => b.href === pathname);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className={`flex h-12 w-full items-center justify-between p-3 rounded-lg hover:bg-neutral-7 transition-all duration-200 focus:outline-none cursor-pointer  ${
          subActive
            ? "border-neutral-7 border-2 text-primary"
            : "border-transparent text-neutral-4"
        }`}
      >
        <div className="flex items-center gap-5">
          <Icon className="h-6 w-6 shrink-0 " />
          <span className=" text-base font-medium">{label}</span>
        </div>
        <ArrowDownIcon
          className={`ml-auto h-6 w-6  transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {/* Modal for Board sub items */}
      {open && (
        <nav className="mt-2 p-3 flex flex-col gap-3 border-neutral-7 border-2 rounded-lg ">
          {boards.map((board) => (
            <NavItemSub
              key={board.href}
              href={board.href}
              label={board.label}
              icon="arrowRight"
            />
          ))}
        </nav>
      )}
    </>
  );
};

export default NavSection;
