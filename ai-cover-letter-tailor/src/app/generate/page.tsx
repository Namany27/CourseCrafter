"use client";
import { useState } from "react";
// import { extractTextFromPDF } from "@/lib/parsePdf";

export default function HomePage() {
  const [resume, setResume] = useState("nnn");
  const [jobDesc, setJobDesc] = useState("");
  const [tone, setTone] = useState("Professional");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");
  const [hasResume, setHasResume] = useState<boolean | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    setResume(data.text);
  };
   



const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setLoading(true);
  setResult("");

  const response = await fetch("/api/generate", {
    method: "POST",
    body: JSON.stringify({ resume, jobDescription: jobDesc, tone }),
    headers: { "Content-Type": "application/json" },
  });

  const data = await response.json();
  setResult(data.coverLetter || "Error generating cover letter.");
  setLoading(false);
};

return (
  <main className="max-w-xl mx-auto p-4">
    <h1 className="text-2xl font-bold mb-4">AI Cover Letter Tailor</h1>

    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="max-w-xl mx-auto mt-10 space-y-6">
        <h2 className="text-xl font-semibold text-center">Do you have a resume?</h2>

        <div className="flex justify-center gap-4">
          <button onClick={() => setHasResume(true)} className="px-4 py-2 bg-blue-500 text-white rounded">
            Yes
          </button>
          <button onClick={() => setHasResume(false)} className="px-4 py-2 bg-gray-300 rounded">
            No
          </button>
        </div>

        {hasResume === true && (
          <div className="mt-6">
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileUpload} />

            <div className="mt-4 p-3 bg-gray-100 rounded">
              <h3 className="font-bold mb-2">Extracted Resume Text:</h3>
              <pre className="whitespace-pre-wrap text-sm">{resume}</pre>
            </div>

          </div>
        )}
      </div>
      <textarea
        rows={4}
        placeholder="Paste job description"
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        className="w-full border p-2 rounded"
        required
      />
      <select
        value={tone}
        onChange={(e) => setTone(e.target.value)}
        className="w-full border p-2 rounded"
      >
        <option value="Professional">Professional</option>
        <option value="Friendly">Friendly</option>
        <option value="Confident">Confident</option>
      </select>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        {loading ? "Generating..." : "Generate Cover Letter"}
      </button>
    </form>

    {result && (
      <div className="mt-6 p-4 bg-gray-100 rounded">
        <h2 className="font-semibold mb-2">Generated Cover Letter:</h2>
        <pre className="whitespace-pre-wrap">{result}</pre>
      </div>
    )}
  </main>
);
}
