
import { Resend } from 'resend';


const resend = new Resend('re_7j44V9Cu_2hfQePpjcFqhviNcWsNjem5k');

export async function sendResetEmail(email: string, token: string) {
  const resetLink = `http://localhost:3000/reset?resetToken=${token}`; // replace with your domain in prod


  try {
    await resend.emails.send({
      from: "Auth Playground <onboarding@resend.dev>",
      to: email,
      subject: "Reset Your Password",
      html: `
        <h2>Password Reset</h2>
        <p>Click the link below to reset your password:</p>
        <a href="${resetLink}">${resetLink}</a>
        <p>This link expires in 15 minutes.</p>
      `,
    });
    console.log("Reset email sent to", email);
  } catch (err) {
    console.error("Error sending reset email:", err);
    throw new Error("Failed to send reset email");
  }
}
