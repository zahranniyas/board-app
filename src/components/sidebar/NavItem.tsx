import * as Icons from "@/assets/icons/sidebar";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavItemProps {
  href: string;
  label: string;
  icon: keyof typeof Icons;
  badge?: string;
}

const NavItem: React.FC<NavItemProps> = ({ href, label, icon, badge }) => {
  const pathname = usePathname();
  const Icon = Icons[icon];
  const active = pathname === href;

  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`flex h-12 items-center justify-between p-3 rounded-lg hover:bg-neutral-7 transition-colors duration-200 focus:outline-none ${
        active ? "text-primary" : "text-neutral-4"
      }`}
    >
      <div className="flex items-center gap-5">
        <Icon className="h-6 w-6 shrink-0 " />
        <span className=" text-base font-medium">{label}</span>
      </div>

      {/* Badge for messages count */}
      {badge && (
        <div className="w-6 h-6 flex items-center justify-center bg-orange rounded-full">
          <span className="text-xs font-medium text-white">{badge}</span>
        </div>
      )}
    </Link>
  );
};

export default NavItem;
