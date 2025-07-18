"use client";
import { useEffect, useState } from "react";
import { useTaskStore } from "@/store/taskStore";
import Swimlane from "./Swimlane";

const SwimlaneGrid = () => {
  const { tasks, setTasks } = useTaskStore();
  const [error, setError] = useState(false);

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

  if (error)
    return (
      <div className="p-6 text-red-600">
        Couldn’t load tasks. Please refresh.
      </div>
    );

  if (tasks.length === 0) {
    return <div className="p-6 text-neutral-4">Loading tasks…</div>;
  }

  const byStatus = (s: string) => tasks.filter((t) => t.status === s);

  return (
    <div className="grid md:grid-cols-2 xl:grid-cols-4 bg-neutral-7">
      <Swimlane
        title="To Do"
        tasks={byStatus("todo")}
        titleBgColor="bg-neutral-6"
      />
      <Swimlane
        title="In Progress"
        tasks={byStatus("inProgress")}
        titleBgColor="bg-task-5"
      />
      <Swimlane
        title="Approved"
        tasks={byStatus("approved")}
        titleBgColor="bg-task-1"
      />
      <Swimlane
        title="Reject"
        tasks={byStatus("reject")}
        titleBgColor="bg-task-2"
      />
    </div>
  );
};

export default SwimlaneGrid;
