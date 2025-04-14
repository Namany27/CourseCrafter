import { NextRequest, NextResponse } from "next/server";
import { generateCoverLetter } from "@/lib/generateCoverLetter";

export async function POST(req: NextRequest) {
  try {
    const { prompt } = await req.json();
    const coverLetter = await generateCoverLetter(prompt);
    return NextResponse.json({ coverLetter });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "Failed to generate cover letter" }, { status: 500 });
  }
}
