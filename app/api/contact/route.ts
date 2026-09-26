import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Configure the Nodemailer transporter using Gmail SMTP
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.SMTP_EMAIL,
        pass: process.env.SMTP_PASSWORD,
      },
    });

    // Verify SMTP connection config
    try {
      await transporter.verify();
    } catch (verifyError) {
      console.error('SMTP Connection Error:', verifyError);
      return NextResponse.json(
        { error: 'Internal Server Error: SMTP configuration is invalid' },
        { status: 500 }
      );
    }

    // Set up email data
    const mailOptions = {
      from: `"${name}" <${process.env.SMTP_EMAIL}>`, // Sender address (must be the authenticated email to avoid spam blocks)
      replyTo: email, // Set the user's email as the reply-to address
      to: process.env.SMTP_EMAIL, // Send it to the same email address
      subject: `New Contact Form Submission: ${subject}`,
      text: `You have received a new message from the InfoMitra Contact Form.\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
          <h2 style="color: #0369a1; border-bottom: 2px solid #e0f2fe; padding-bottom: 10px;">New InfoMitra Contact Submission</h2>
          <p><strong>From:</strong> ${name} (<a href="mailto:${email}">${email}</a>)</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <br/>
          <h3 style="color: #333;">Message:</h3>
          <p style="white-space: pre-wrap; background: #f8fafc; padding: 15px; border-radius: 6px; color: #1e293b;">${message}</p>
        </div>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    return NextResponse.json(
      { message: 'Email sent successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Failed to send contact email:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
