import AvatarGroup from "./AvatarGroup";
import PencilIcon from "@/assets/icons/pencil.svg";

const BoardHeader = () => (
  <header className="flex flex-col gap-2 p-6 border-b border-neutral-6 ">
    <div className="flex items-center gap-6">
      <h1 className="text-2xl font-semibold text-neutral-1">
        Sport Xi Project
      </h1>
      <span className="rounded-[5px] bg-task-5 px-3 py-1 text-[10px] font-medium text-neutral-3">
        In Progress
      </span>
    </div>

    <p className=" text-neutral-5">event production</p>

    <div className="flex flex-wrap items-center gap-4">
      <div className="flex items-center gap-3">
        <span className=" text-neutral-5">assigned:</span>
        <AvatarGroup total={5} />
      </div>

      <button className=" rounded-[46px] flex items-center gap-2.5 border border-neutral-6 px-3 py-1.5 text-xs font-medium text-neutral-5 hover:bg-neutral-7 transition-colors cursor-pointer">
        <span>Manage</span>
        <PencilIcon className="" width={16} height={16} />
      </button>
    </div>
    <hr className="border-neutral-6 my-3" />

    <p className="text-sm text-neutral-5 ">Last updated on: 04 April, 2022</p>
  </header>
);

export default BoardHeader;
