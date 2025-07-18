import Image from "next/image";

interface AvatarGroupProps {
  total: number;
  visible?: number;
}

const AvatarGroup: React.FC<AvatarGroupProps> = ({ total, visible = 3 }) => {
  const placeholders = Array(Math.min(total, visible)).fill(
    "/assets/user-prof.png"
  );
  const overflow = total - visible;

  return (
    <div className="flex items-center">
      {placeholders.map((src, i) => (
        <Image
          key={i}
          src={src}
          alt=""
          width={24}
          height={24}
          className={`-ml-2 first:ml-0 rounded-full border border-white`}
        />
      ))}
      {overflow > 0 && (
        <div className="-ml-2 flex h-6 w-6 items-center justify-center rounded-full bg-neutral-6 text-[9px] font-semibold text-neutral-3 border border-white">
          +{overflow}
        </div>
      )}
    </div>
  );
};

export default AvatarGroup;
