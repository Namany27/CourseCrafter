"use client";
import { useState, useRef } from "react";
import Navbar from "./components/navbar";
import { jsPDF } from "jspdf";

export default function Home() {
  const [subject, setSubject] = useState("");
  const [duration, setDuration] = useState("1");
   const [durationUnit, setDurationUnit] = useState("Day(s)");
  const [prefferedtype, setPrefferedtype] = useState("");
  const [budget, setBudget] = useState("");
  const [currency, setCurrency] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);
  const resultRef = useRef<HTMLDivElement>(null);





  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResult("");

    const prompt = `I want to learn ${subject} but unable to find perfect plan and resourse. Can you help me to craft a course I only have ${duration} ${durationUnit}  and my budget is ${budget} ${currency}. I will prefer ${prefferedtype} .`
    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        body: JSON.stringify({ prompt }),
        headers: { "Content-Type": "application/json" },
      });

      const data = await response.json();
      setResult(data.result|| "Error while crafting course.");
    } catch (err) {
      setResult("Something went wrong.");
    }
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
    doc.save("course for ${ subject }by Course Crafter.pdf");
  };

  return (
    <>
      <Navbar />
      <main className="max-w-2xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Course crafter</h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div className="space-y-3 mt-4">
            <input
              type="text"
              placeholder="what you want to learn?"
              className="w-full border p-2 rounded"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <div className="flex gap-2">
              <input
                type="number"
                placeholder="1"
                min="1"
                className="w-1/2 border p-2 rounded"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />

              <select
                value={durationUnit}
                onChange={(e) => setDurationUnit(e.target.value)}
                className="w-1/2 border p-2 rounded"
              >
                <option value="day">Day(s)</option>
                <option value="week">Week(s)</option>
                <option value="month">Month(s)</option>
              </select>
            </div>

          </div>

          <div className="flex items-center border rounded overflow-hidden">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="bg-gray-100 text-sm px-3 py-2 border-r outline-none"
              required
            >
              <option value="">Select currency</option>
              <option value="AUD">Australian Dollar (AUD)</option>
              <option value="BRL">Brazilian Real (BRL)</option>
              <option value="CAD">Canadian Dollar (CAD)</option>
              <option value="CHF">Swiss Franc (CHF)</option>
              <option value="CNY">Chinese Yuan (CNY)</option>
              <option value="EUR">Euro (EUR)</option>
              <option value="GBP">British Pound (GBP)</option>
              <option value="HKD">Hong Kong Dollar (HKD)</option>
              <option value="IDR">Indonesian Rupiah (IDR)</option>
              <option value="INR">Indian Rupee (INR)</option>
              <option value="JPY">Japanese Yen (JPY)</option>
              <option value="KRW">South Korean Won (KRW)</option>
              <option value="MXN">Mexican Peso (MXN)</option>
              <option value="MYR">Malaysian Ringgit (MYR)</option>
              <option value="NOK">Norwegian Krone (NOK)</option>
              <option value="PHP">Philippine Peso (PHP)</option>
              <option value="PLN">Polish Zloty (PLN)</option>
              <option value="RUB">Russian Ruble (RUB)</option>
              <option value="SEK">Swedish Krona (SEK)</option>
              <option value="SGD">Singapore Dollar (SGD)</option>
              <option value="THB">Thai Baht (THB)</option>
              <option value="TRY">Turkish Lira (TRY)</option>
              <option value="TWD">New Taiwan Dollar (TWD)</option>
              <option value="USD">United States Dollar (USD)</option>
              <option value="VND">Vietnamese Dong (VND)</option>
              <option value="ZAR">South African Rand (ZAR)</option>
            </select>

            <input
              type="number"
              placeholder="Enter budget"
              className="flex-1 px-3 py-2 outline-none"
              value={budget}
              onChange={(e) => setBudget(e.target.value)}
              required
            />
          </div>





          <select
            value={prefferedtype}
            onChange={(e) => setPrefferedtype(e.target.value)}
            className="w-full border p-2 rounded"
          >
            <option value="">Select which type on content you prefer</option>
            <option value="Any type of content">Any</option>
            <option value="Videos">Videos</option>
            <option value="Documentations">Documentations</option>
            <option value="Books">Books</option>
          </select>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 disabled:opacity-50"
          >
            {loading ? "Crafting..." : "Craft your course"}
          </button>
        </form>

        {result && (
          <div ref={resultRef} className="mt-8 p-6 bg-gray-50 rounded shadow">
            <h2 className="text-xl font-semibold mb-2">Crafted Course:</h2>
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
    </>
  );
}