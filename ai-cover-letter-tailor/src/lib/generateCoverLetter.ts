import axios from "axios";

export async function generateCoverLetter(resume: string, jd: string, tone: string) {
  const prompt = `
You are a professional cover letter writer. Write a ${tone} cover letter tailored to the job description based on the candidate's resume.

Resume:
${resume}

Job Description:
${jd}

Only output the final cover letter.
  `.trim();

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "mistralai/mixtral-8x7b-instruct",
        messages: [{ role: "user", content: prompt }],
      },
      {
        headers: {
          "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000", // or your site
          "X-Title": "AI Cover Letter Tailor",
        },
      }
    );

    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("OpenRouter API error:", error);
    throw new Error("Failed to generate cover letter.");
  }
}
