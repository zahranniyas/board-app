// src/app/api/tasks/route.ts
import tasks from "@/data/tasks.json";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(tasks);
}
