import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();

    // Validate the data
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Subject mapping for better readability
    const subjectMap: Record<string, string> = {
      'order': 'Order Inquiry',
      'product': 'Product Question',
      'customization': 'Custom Design Help',
      'shipping': 'Shipping & Delivery',
      'returns': 'Returns & Refunds',
      'wholesale': 'Wholesale Inquiry',
      'other': 'General Inquiry'
    };

    const emailSubject = `[PhotoInCase Contact] ${subjectMap[data.subject] || 'General Inquiry'} from ${data.name}`;

    // Send email using Resend
    await resend.emails.send({
      from: 'PhotoInCase <onboarding@resend.dev>',
      to: 'info@nizarrahme.com',
      subject: emailSubject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>New Contact Form Submission</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #7D5A3C, #A3B18A); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
          </div>
          
          <div style="background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; border: 1px solid #ddd; border-top: none;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee; width: 120px;"><strong>Name:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${data.name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Email:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">
                  <a href="mailto:${data.email}" style="color: #7D5A3C;">${data.email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;"><strong>Subject:</strong></td>
                <td style="padding: 10px 0; border-bottom: 1px solid #eee;">${subjectMap[data.subject] || 'General Inquiry'}</td>
              </tr>
            </table>
            
            <div style="margin-top: 20px; padding: 20px; background: white; border-radius: 8px; border: 1px solid #eee;">
              <h3 style="margin-top: 0; color: #7D5A3C;">Message:</h3>
              <p style="white-space: pre-wrap; margin: 0;">${data.message}</p>
            </div>
            
            <div style="margin-top: 20px; text-align: center;">
              <a href="mailto:${data.email}" style="display: inline-block; background: linear-gradient(135deg, #7D5A3C, #9A7B5B); color: white; padding: 12px 30px; text-decoration: none; border-radius: 25px; font-weight: bold;">
                Reply to ${data.name}
              </a>
            </div>
          </div>
          
          <div style="text-align: center; margin-top: 20px; color: #888; font-size: 12px;">
            <p>This email was sent from the PhotoInCase contact form.</p>
          </div>
        </body>
        </html>
      `,
      replyTo: data.email,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Failed to send message' },
      { status: 500 }
    );
  }
}
