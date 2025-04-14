import Link from "next/link";
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";

export default function Home() {
  return (
    <>
    <Navbar/>
    <main className="min-h-screen flex flex-col items-center justify-center p-6 text-center">
      <h1 className="text-4xl font-bold mb-4 text-blue-600">AI Cover Letter Tailor</h1>
      <p className="mb-6 max-w-md text-gray-600">
        Instantly generate tailored cover letters from your resume and job description.
      </p>
      <Link
        href="/generate"
        className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700"
      >
        Get Started
      </Link>

      <section className="mt-12 grid gap-4 md:grid-cols-3">
        {[
          { title: "Personalized", desc: "Matches your resume to each job" },
          { title: "Fast", desc: "Cover letter in seconds" },
          { title: "Polished", desc: "Professional and well-structured" },
        ].map((card, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition"
          >
            <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
            <p className="text-sm text-gray-500">{card.desc}</p>
          </div>
        ))}
      </section>
    </main>
    <Footer/>
    </>
  );
}
