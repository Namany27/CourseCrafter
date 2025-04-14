"use client";
import { useState, useRef } from "react";
import { jsPDF } from "jspdf";
import Navbar from "../../components/navbar";
import Footer from "../../components/footer";
import Contact from "../../components/contact";

export default function HomePage() {
  const [resume, setResume] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [tone, setTone] = useState("Professional");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState("");
  const [hasResume, setHasResume] = useState(true);
  const resultRef = useRef<HTMLDivElement>(null);

  const [manualResume, setManualResume] = useState({
    name: "",
    email: "",
    phone: "",
    experience: "",
    education: "",
    skills: "",
  });

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

    const combinedResume = hasResume
      ? resume
      : `
Name: ${manualResume.name}
Email: ${manualResume.email}
Phone: ${manualResume.phone}
Experience: ${manualResume.experience}
Education: ${manualResume.education}
Skills: ${manualResume.skills}
`.trim();

    const prompt = `
You are an expert cover letter writer. Using the resume and job description below, write a ${tone.toLowerCase()} cover letter tailored specifically for this job.

Resume:
${combinedResume}

Job Description:
${jobDesc}

Make sure:
- The resume can be a bit here and there due to it extracted from a pdf or entered manually, so try to make sense of it.
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
    const lines = doc.splitTextToSize(result, 180);
    doc.text(lines, 10, 10);
    doc.save("cover_letter.pdf");
  };

  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">AI Cover Letter Tailor</h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="font-medium">Do you have a resume?</span>
              {/* Toggle here */}
              <label className="relative inline-block w-12 h-6">
                <input
                  type="checkbox"
                  checked={hasResume}
                  onChange={() => setHasResume(!hasResume)}
                  className="sr-only peer"
                />
                <div className="w-12 h-6 bg-gray-400 rounded-full peer peer-checked:bg-blue-500 transition-colors duration-300"></div>
                <div className="absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-all duration-300 peer-checked:translate-x-6"></div>
              </label>
            </div>


            {hasResume ? (
              <div>
                <div className="border-2 border-dashed border-gray-400 rounded p-6 text-center bg-white shadow-sm">
                  <label className="cursor-pointer text-blue-600 hover:underline">

                    {resume && <p className="text-sm text-gray-600 mt-2">Resume loaded successfully!</p> || <span>Select your resume file</span>}
                    <input
                      type="file"
                      accept=".pdf"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                </div>
                {uploading && <p className="text-sm mt-2">Uploading and extracting text...</p>}
                {/* {resume && (
                  <div className="mt-4 p-3 bg-gray-100 rounded max-h-48 overflow-auto">
                    <h3 className="font-bold mb-2">Extracted Resume Text:</h3>
                    <pre className="whitespace-pre-wrap text-sm">{resume}</pre>
                  </div>
                )} */}
              </div>
            ) : (
              <div className="space-y-3 mt-4">
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full border p-2 rounded"
                  value={manualResume.name}
                  onChange={(e) => setManualResume({ ...manualResume, name: e.target.value })}
                  required
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="w-full border p-2 rounded"
                  value={manualResume.email}
                  onChange={(e) => setManualResume({ ...manualResume, email: e.target.value })}
                  required
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full border p-2 rounded"
                  value={manualResume.phone}
                  onChange={(e) => setManualResume({ ...manualResume, phone: e.target.value })}
                />
                <textarea
                  placeholder="Experience"
                  rows={3}
                  className="w-full border p-2 rounded"
                  value={manualResume.experience}
                  onChange={(e) => setManualResume({ ...manualResume, experience: e.target.value })}
                />
                <textarea
                  placeholder="Education"
                  rows={2}
                  className="w-full border p-2 rounded"
                  value={manualResume.education}
                  onChange={(e) => setManualResume({ ...manualResume, education: e.target.value })}
                />
                <textarea
                  placeholder="Skills"
                  rows={2}
                  className="w-full border p-2 rounded"
                  value={manualResume.skills}
                  onChange={(e) => setManualResume({ ...manualResume, skills: e.target.value })}
                />
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
            <div className="flex justify-end gap-2 mb-2">
              <button
                onClick={copyToClipboard}
                className="flex items-center gap-1 text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded shadow"
                title="Copy to Clipboard"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16h8m-4-4h4m1 4a2 2 0 01-2 2H7a2 2 0 01-2-2V6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v8z" />
                </svg>
                Copy
              </button>
              <button
                onClick={downloadPDF}
                className="flex items-center gap-1 text-sm bg-purple-500 hover:bg-purple-600 text-white px-3 py-1.5 rounded shadow"
                title="Download PDF"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                PDF
              </button>
            </div>

            <pre className="whitespace-pre-wrap leading-relaxed">{result}</pre>
          </div>
        )}
      </main>
      <Contact />
      <Footer />
    </>
  );
}
