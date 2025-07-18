"use client";
import { useEffect, useState } from "react";
import { useTaskStore, Status, Task } from "@/store/taskStore";
import Swimlane from "./Swimlane";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import TaskCard from "../TaskCard";

const lanes: { key: Status; title: string; color: string }[] = [
  { key: "todo", title: "To Do", color: "bg-neutral-6" },
  { key: "inProgress", title: "In Progress", color: "bg-task-5" },
  { key: "approved", title: "Approved", color: "bg-task-1" },
  { key: "reject", title: "Reject", color: "bg-task-2" },
];

const SwimlaneGrid = () => {
  const { tasks, setTasks, updateTask } = useTaskStore();
  const [error, setError] = useState(false);

  // Fetch data
  useEffect(() => {
    if (tasks.length === 0) {
      (async () => {
        try {
          const res = await fetch("/api/tasks");
          if (!res.ok) throw new Error("Network response was not ok");
          const data = await res.json();
          setTasks(data);
        } catch (err) {
          console.error(err);
          setError(true);
        }
      })();
    }
  }, [tasks.length, setTasks]);

  // Drag tasks
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const handleDragStart = (e: DragStartEvent) => {
    const id = e.active.id as string;
    const t = tasks.find((t) => t.id === id);
    setActiveTask(t ?? null);
  };

  const handleDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) return;

    const isStatus = (s: string): s is Status =>
      ["todo", "inProgress", "approved", "reject"].includes(s);

    const fromStatus = active.data.current?.status as Status;

    const raw = over.data.current?.status ?? (over.id as string);

    if (!isStatus(raw) || raw === fromStatus) return;

    updateTask(active.id as string, { status: raw });
  };

  if (error)
    return (
      <div className="p-6 text-red-600">
        Couldn’t load tasks. Please refresh.
      </div>
    );

  if (tasks.length === 0) {
    return <div className="p-6 text-neutral-4">Loading tasks…</div>;
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="grid md:grid-cols-2 xl:grid-cols-4 bg-neutral-7">
        {lanes.map(({ key, title, color }) => (
          <SortableContext
            key={key}
            id={key}
            items={tasks
              .filter((task) => task.status === key)
              .map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            <Swimlane
              title={title}
              tasks={tasks.filter((task) => task.status === key)}
              titleBgColor={color}
              lane={key}
            />
          </SortableContext>
        ))}
      </div>

      {/* floating */}
      <DragOverlay>
        {activeTask ? <TaskCard task={activeTask} overlay /> : null}
      </DragOverlay>
    </DndContext>
  );
};

export default SwimlaneGrid;
