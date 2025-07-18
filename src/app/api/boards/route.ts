import boards from "@/data/boards.json";
import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json(boards);
}
