import { NextRequest, NextResponse } from "next/server";
import { generateCourse } from "@/lib/courseGenerator";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const result = await generateCourse(prompt);
    return NextResponse.json({ result });  // <-- Match frontend key
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
  }
}