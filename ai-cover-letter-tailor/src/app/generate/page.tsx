"use client";
import { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import Navbar from "../components/navbar";
import Footer from "../components/footer";

export default function HomePage() {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [tone, setTone] = useState("Professional");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState("");
  const [hasResume, setHasResume] = useState<boolean | null>(true);
  const resultRef = useRef<HTMLDivElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    setUploading(true);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      setResume(data.text || "Error extracting text.");
    } catch (err) {
      alert("Failed to upload. Try again.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    const prompt = `

You are an expert cover letter writer. Using the resume and job description below, write a ${tone.toLowerCase()} cover letter tailored specifically for this job.

Resume:
${resume}

Job Description:
${jobDesc}

Make sure:
- The resume can be a bit here and there due to it extracted from a pdf so try to make sense of data given in resume.
- Do NOT include any variables or placeholders like [Your Name], [Job Title], etc.
- Use real data from the resume wherever needed — do not leave anything empty.
- If information seems unclear or incomplete, do your best to infer based on available context.
- Only return the final cover letter — no extra formatting or explanation.

`.trim();


    const response = await fetch("/api/generate", {
      method: "POST",
      body: JSON.stringify({ prompt }),
      headers: { "Content-Type": "application/json" },
    });
    
    const data = await response.json();
    setResult(data.coverLetter || "Error generating cover letter.");
    setLoading(false);

    // Scroll to result
    setTimeout(() => resultRef.current?.scrollIntoView({ behavior: "smooth" }), 200);
  };

  const copyToClipboard = () => {
    if (result) {
      navigator.clipboard.writeText(result)
        .then(() => alert("Copied to clipboard!"))
        .catch(() => alert("Failed to copy."));
    }
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const lines = doc.splitTextToSize(result, 180); // wrap text
    doc.text(lines, 10, 10);
    doc.save("cover_letter.pdf");
  };



  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">AI Cover Letter Tailor</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-4">
            <div className="text-center">
              <h2 className="text-xl font-semibold mb-2">Do you have a resume?</h2>
              <div className="inline-flex bg-gray-200 rounded overflow-hidden">
                <button
                  type="button"
                  onClick={() => setHasResume(true)}
                  className={`px-6 py-2 text-sm font-medium ${hasResume ? "bg-blue-600 text-white" : "text-gray-700"
                    }`}
                >
                  Yes
                </button>
                <button
                  type="button"
                  onClick={() => setHasResume(false)}
                  className={`px-6 py-2 text-sm font-medium ${hasResume === false ? "bg-blue-600 text-white" : "text-gray-700"
                    }`}
                >
                  No
                </button>
              </div>
            </div>

            {hasResume && (
              <div>
                <div className="border-2 border-dashed border-gray-400 rounded p-6 text-center bg-white shadow-sm">
                  <label className="cursor-pointer text-blue-600 hover:underline">
                    <span>Select your resume file</span>
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>
                  {resume && (
                    <p className="text-sm text-gray-600 mt-2">Resume loaded successfully!</p>
                  )}
                </div>
                {uploading && <p className="text-sm mt-2">Uploading and extracting text...</p>}
                {resume && (
                  <div className="mt-4 p-3 bg-gray-100 rounded max-h-48 overflow-auto">
                    <h3 className="font-bold mb-2">Extracted Resume Text:</h3>
                    <pre className="whitespace-pre-wrap text-sm">{resume}</pre>

                
                  </div>
                )}
              </div>
            )}
          </div>

          <textarea
            rows={5}
            placeholder="Paste job description"
            value={jobDesc}
            onChange={(e) => setJobDesc(e.target.value)}
            className="w-full border p-3 rounded"
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
            disabled={loading || uploading}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Generating..." : "Generate Cover Letter"}
          </button>
        </form>

        {result && (
          <div ref={resultRef} className="mt-8 p-6 bg-gray-50 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Generated Cover Letter:</h2>
            <div className="flex gap-4 mb-4">
              <button
                onClick={copyToClipboard}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
              >
                Copy
              </button>
              <button
                onClick={downloadPDF}
                className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded"
              >
                Download PDF
              </button>
            </div>
            <pre className="whitespace-pre-wrap leading-relaxed">{result}</pre>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
};
