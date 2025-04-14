// /app/api/contact/route.ts (or /pages/api/contact.ts if using Pages Router)
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { firstName, lastName, email, phone, message } = body;

    if (!firstName || !lastName || !email || !message) {
      return new Response(JSON.stringify({ success: false, message: 'Missing required fields' }), {
        status: 400,
      });
    }

    const data = await resend.emails.send({
      from: 'GeineTools <onboarding@resend.dev>',
      to: ['reetay229@gmail.com'], // replace with your email
      subject: `New Contact Message from ${firstName} ${lastName}`,
      text: `
New message from GeineTools:

Name: ${firstName} ${lastName}
Email: ${email}
Phone: ${phone}

Message:
${message}
      `,
    });
    console.log("Resend response:", data);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
  console.error("API error:", error);

  let errorMessage = "An unknown error occurred.";

  if (error instanceof Error) {
    errorMessage = error.message;
  }

  return new Response(
    JSON.stringify({ success: false, error: errorMessage }),
    { status: 500 }
  );
  }
}
