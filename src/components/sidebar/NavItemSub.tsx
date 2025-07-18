import * as Icons from "@/assets/icons/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavItemProps {
  href: string;
  label: string;
  icon: keyof typeof Icons;
  badge?: string;
}

const NavItemSub: React.FC<NavItemProps> = ({ href, label, icon }) => {
  const pathname = usePathname();
  const Icon = Icons[icon];
  const active = pathname === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex items-center gap-5  hover:text-primary/80 transition-colors duration-200 focus:outline-none  ${
        active ? "text-primary" : "text-neutral-5"
      }`}
    >
      <Icon className="h-6 w-6 shrink-0" />
      <span className=" text-sm">{label}</span>
    </Link>
  );
};

export default NavItemSub;
