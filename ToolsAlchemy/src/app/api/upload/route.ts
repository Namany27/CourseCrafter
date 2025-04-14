import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());

  // Step 1: Upload the file to PDF.co
  const uploadRes = await fetch("https://api.pdf.co/v1/file/upload", {
    method: "POST",
    headers: {
      "x-api-key": process.env.PDFCO_API_KEY!,
    },
    body: (() => {
      const data = new FormData();
      data.append("file", new Blob([buffer]), file.name);
      return data;
    })(),
  });

  const uploadData = await uploadRes.json();

  if (!uploadData.url) {
    return NextResponse.json({ error: "File upload failed", details: uploadData }, { status: 500 });
  }

  // Step 2: Convert the PDF to text
  const convertRes = await fetch("https://api.pdf.co/v1/pdf/convert/to/text", {
    method: "POST",
    headers: {
      "x-api-key": process.env.PDFCO_API_KEY!,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      url: uploadData.url,
    }),
  });

  const convertData = await convertRes.json();

  if (!convertData.url) {
    return NextResponse.json({ error: "Conversion failed", details: convertData }, { status: 500 });
  }

  // Step 3: Fetch the resulting .txt file content
  const textRes = await fetch(convertData.url);
  const extractedText = await textRes.text();

  return NextResponse.json({ text: extractedText });
}