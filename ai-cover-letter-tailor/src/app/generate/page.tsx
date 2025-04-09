'use client';
import { useState } from 'react';

export default function Generate() {
  const [resume, setResume] = useState<File | null>(null);
  const [jd, setJd] = useState('');
  const [tone, setTone] = useState('formal');

  return (
    <div className="min-h-screen p-6 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center">Generate Your Cover Letter</h1>

      <div className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Upload Resume</label>
          <input type="file" onChange={(e) => setResume(e.target.files?.[0] || null)} />
        </div>

        <div>
          <label className="block mb-1 font-medium">Paste Job Description</label>
          <textarea
            value={jd}
            onChange={(e) => setJd(e.target.value)}
            className="w-full h-40 p-2 border rounded"
          ></textarea>
        </div>

        <div>
          <label className="block mb-1 font-medium">Select Tone</label>
          <select
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="p-2 border rounded"
          >
            <option value="formal">Formal</option>
            <option value="friendly">Friendly</option>
            <option value="confident">Confident</option>
          </select>
        </div>

        <button className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700">
          Generate Cover Letter
        </button>

        <div className="mt-6">
          <label className="block mb-1 font-medium">Output</label>
          <div className="border p-4 rounded min-h-[150px] text-gray-500">
            (AI-generated cover letter will appear here.)
          </div>
        </div>
      </div>
    </div>
  );
}
