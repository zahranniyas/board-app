import TaskCard from "@/components/TaskCard";
import PlusIcon from "@/assets/icons/plus-2.svg";
import DotsIcon from "@/assets/icons/dots.svg";
import type { Task, Status } from "@/store/taskStore";
import { useDroppable } from "@dnd-kit/core";

interface SwimlaneProps {
  title: string;
  tasks: Task[];
  titleBgColor?: string;
  lane: Status;
}

const Swimlane: React.FC<SwimlaneProps> = ({
  title,
  tasks,
  titleBgColor,
  lane,
}) => {
  const { setNodeRef, isOver } = useDroppable({ id: lane });

  return (
    <section
      ref={setNodeRef}
      className={`border-r border-neutral-6 last:border-r-0 ${
        isOver ? "bg-neutral-6/20" : ""
      }`}
    >
      <div className="bg-white p-3.5 flex items-center justify-between">
        <div className={`${titleBgColor} rounded-[46px] px-6 py-1 w-fit`}>
          <h2 className="text-sm font-medium leading-5.5">{title}</h2>
        </div>
        <div className="flex items-center gap-1 text-neutral-3">
          <button type="button">
            <PlusIcon className="w-5 h-5 cursor-pointer" />
          </button>
          <button type="button">
            <DotsIcon className="w-5 h-5 cursor-pointer" />
          </button>
        </div>
      </div>
      <div className="p-3.5 flex flex-col gap-3.5">
        {tasks.map((t) => (
          <TaskCard key={t.id} task={t} />
        ))}
      </div>
    </section>
  );
};

export default Swimlane;
