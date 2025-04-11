import { NextRequest, NextResponse } from "next/server";
import { generateCoverLetter } from "@/lib/generateCoverLetter";

export async function POST(req: NextRequest) {
  try {
    const { resume, jobDescription, tone } = await req.json();
    const coverLetter = await generateCoverLetter(resume, jobDescription, tone);
    return NextResponse.json({ coverLetter });
  } catch (err) {
    console.error("API Error:", err);
    return NextResponse.json({ error: "Failed to generate cover letter" }, { status: 500 });
  }
}
