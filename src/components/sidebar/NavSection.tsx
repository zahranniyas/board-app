"use client";
import * as Icons from "@/assets/icons/sidebar";
import { useState } from "react";
import ArrowDownIcon from "@/assets/icons/arrow-down.svg";
import NavItemSub from "./NavItemSub";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface BoardLink {
  href: string;
  label: string;
}

interface NavSectionProps {
  label: string;
  icon: keyof typeof Icons;
  boards: BoardLink[];
}

const submenu: Variants = {
  open: {
    scaleY: 1,
    opacity: 1,
    transition: {
      ease: "easeOut",
      duration: 0.18,
      when: "beforeChildren",
      staggerChildren: 0.05,
    },
  },
  closed: {
    scaleY: 0,
    opacity: 0,
    transition: { duration: 0.18, ease: "easeIn" },
  },
};

const item: Variants = {
  open: { y: 0, opacity: 1 },
  closed: { y: -8, opacity: 0 },
};

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
      <AnimatePresence initial={false}>
        {open && (
          <motion.nav
            key="submenu"
            variants={submenu}
            initial="closed"
            animate="open"
            exit="closed"
            style={{ originY: 0 }}
            className="mt-2 p-3 flex flex-col gap-3 border-neutral-7 border-2 rounded-lg "
          >
            {boards.map((board) => (
              <motion.div key={board.href} variants={item}>
                <NavItemSub
                  key={board.href}
                  href={board.href}
                  label={board.label}
                  icon="arrowRight"
                />
              </motion.div>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
};

export default NavSection;
