import Image from "next/image";
import * as Icons from "@/assets/icons/tasks";
import AvatarGroup from "../boardheader/AvatarGroup";
import DotsIcon from "@/assets/icons/dots.svg";
import FlashIcon from "@/assets/icons/flash.svg";

interface Task {
  id: string;
  category: string;
  title: string;
  priority: "high" | "medium" | "low";
  assignees: string[];
  cover?: string;
  links?: number;
  comments?: number;
  extra?: { type: "due" | "reports" | "event"; text: string };
}

const TaskCard: React.FC<{ task: Task }> = ({ task }) => (
  <div className="rounded-xl border border-neutral-6 bg-white px-3 py-1.5">
    {/* category */}
    <div className="flex items-center justify-between ">
      <div className="flex items-center gap-2 py-1.5">
        <span
          className={`w-2 h-2 rounded-xs ${
            task.category === "Research"
              ? "bg-task-1"
              : task.category === "Design"
              ? "bg-task-2"
              : task.category === "Feedback"
              ? "bg-task-4"
              : task.category === "Presentation"
              ? "bg-task-3"
              : task.category === "UX Research"
              ? "bg-task-5"
              : "bg-task-7"
          }`}
        ></span>
        <p className="text-neutral-5 text-xs">{task.category}</p>
      </div>
      <button type="button">
        <DotsIcon className="w-3.5 h-3.5 cursor-pointer text-neutral-5" />
      </button>
    </div>

    {/* title */}
    <h3 className="text-sm leading-5.5 font-medium text-neutral-1 mb-2.5">
      {task.title}
    </h3>

    {/* assignees &  priority */}
    <div className="flex items-center gap-2.5">
      <AvatarGroup total={task.assignees.length} visible={3} />
      <div className="flex gap-1 items-center p-1 rounded-[5px] bg-neutral-7">
        <FlashIcon className="w-4 h-4 text-neutral-5" />
        <span className="font-medium text-[8px] text-neutral-5 capitalize">
          {task.priority}
        </span>
      </div>
    </div>

    {/* cover image (optional) */}
    {task.cover && (
      <Image
        src={task.cover}
        alt=""
        width={234}
        height={90}
        className="rounded object-cover w-full my-3.5"
      />
    )}

    {/* bottom meta */}
    <div
      className={` border-t pt-1.5 border-neutral-6 flex gap-6 items-center text-xs font-medium text-neutral-4 ${
        !task.cover ? "mt-8" : "mt-0"
      }`}
    >
      {(task.links ?? 0) > 0 && (
        <span className="flex items-center gap-1">
          <Icons.link className="h-4 w-4" /> {task.links}
        </span>
      )}
      {(task.comments ?? 0) > 0 && (
        <span className="flex items-center gap-1">
          <Icons.message className="h-4 w-4" /> {task.comments}
        </span>
      )}

      {task.extra && (
        <span
          className={`flex items-center gap-1 ${
            task.extra.type === "reports"
              ? "text-red"
              : task.extra.type === "event"
              ? "text-primary"
              : "text-neutral-4"
          }`}
        >
          {task.extra.type === "due" && <Icons.calendar className="h-4 w-4" />}
          {task.extra.type === "reports" && (
            <Icons.notice className="h-4 w-4" />
          )}
          {task.extra.type === "event" && <Icons.bell className="h-4 w-4" />}
          {task.extra.text}
        </span>
      )}
    </div>
  </div>
);

export default TaskCard;
