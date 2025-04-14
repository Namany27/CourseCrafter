import axios from "axios";

export async function generateCoverLetter(prompt: string) {
  // const prompt = `

  // You are an expert cover letter writer. Using the resume and job description below, write a ${tone.toLowerCase()} cover letter tailored specifically for this job.
  
  // Resume:
  // ${resume}
  
  // Job Description:
  // ${jobDesc}
  
  // Make sure:
  // - The resume can be a bit here and there due to it extracted from a pdf so try to make sense of data given in resume.
  // - Do NOT include any variables or placeholders like [Your Name], [Job Title], etc.
  // - Use real data from the resume wherever needed — do not leave anything empty.
  // - If information seems unclear or incomplete, do your best to infer based on available context.
  // - Only return the final cover letter — no extra formatting or explanation.
  
  // `.trim();
  

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "deepseek/deepseek-chat-v3-0324",
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
