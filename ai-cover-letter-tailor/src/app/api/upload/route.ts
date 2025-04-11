import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const buffer = await file.arrayBuffer();
  const blob = new Blob([buffer], { type: file.type });

  const uploadForm = new FormData();
  uploadForm.append("file", blob, file.name);

  const apiKey = process.env.PDFCO_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  const response = await fetch("api.pdf.co/v1/pdf/convert/to/text", {
    method: "POST",
    headers: {
      "x-api-key": apiKey,
    },
    body: uploadForm,
  });

  const data = await response.json();

  if (!response.ok) {
    return NextResponse.json({ error: data.message || "Failed to extract text" }, { status: 500 });
  }

  return NextResponse.json({ text: data.body });
}