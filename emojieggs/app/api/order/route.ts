import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface OrderPayload {
  to: string;
  subject: string;
  body: string;
  customerName?: string;
  customerPhone?: string;
  customerAddress?: string;
  customerMessage?: string;
  pack?: string;
  occasion?: string;
  faces?: string;
  addOns?: string;
  total?: string;
}

function buildHtmlEmail(data: OrderPayload): string {
  const {
    customerName = '',
    customerPhone = '',
    customerAddress = '',
    customerMessage = '',
    pack = '',
    occasion = '',
    faces = '',
    addOns = 'None',
    total = '₹0',
  } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="margin:0;padding:0;background:#f4f1eb;font-family:'Segoe UI',Arial,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f1eb;padding:32px 0;">
    <tr>
      <td align="center">
        <table role="presentation" width="520" cellspacing="0" cellpadding="0" style="background:#ffffff;border-radius:24px;overflow:hidden;box-shadow:0 8px 32px rgba(0,0,0,0.08);">
          
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1A1A2E,#2D2D44);padding:32px 32px 24px;text-align:center;">
              <div style="font-size:48px;margin-bottom:8px;">🥚</div>
              <h1 style="margin:0;color:#FFB800;font-size:24px;font-weight:800;letter-spacing:-0.5px;">New FaciEggs Order!</h1>
              <p style="margin:6px 0 0;color:rgba(255,255,255,0.6);font-size:13px;font-weight:600;">A fresh order just came in 🎉</p>
            </td>
          </tr>

          <!-- Customer Details -->
          <tr>
            <td style="padding:28px 32px 0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F9F6EF;border-radius:16px;padding:20px;">
                <tr>
                  <td>
                    <p style="margin:0 0 12px;font-size:11px;font-weight:800;text-transform:uppercase;color:#999;letter-spacing:1px;">👤 Customer Details</p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding:6px 0;font-size:14px;color:#888;font-weight:600;width:90px;">Name</td>
                        <td style="padding:6px 0;font-size:14px;color:#1A1A2E;font-weight:700;">${customerName}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:14px;color:#888;font-weight:600;">Phone</td>
                        <td style="padding:6px 0;font-size:14px;color:#1A1A2E;font-weight:700;">${customerPhone}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:14px;color:#888;font-weight:600;">Address</td>
                        <td style="padding:6px 0;font-size:14px;color:#1A1A2E;font-weight:700;">${customerAddress}</td>
                      </tr>
                      ${customerMessage ? `
                      <tr>
                        <td style="padding:6px 0;font-size:14px;color:#888;font-weight:600;">Message</td>
                        <td style="padding:6px 0;font-size:14px;color:#1A1A2E;font-weight:700;">${customerMessage}</td>
                      </tr>
                      ` : ''}
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Order Details -->
          <tr>
            <td style="padding:16px 32px 0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#F9F6EF;border-radius:16px;padding:20px;">
                <tr>
                  <td>
                    <p style="margin:0 0 12px;font-size:11px;font-weight:800;text-transform:uppercase;color:#999;letter-spacing:1px;">📦 Order Details</p>
                    <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                      <tr>
                        <td style="padding:6px 0;font-size:14px;color:#888;font-weight:600;width:90px;">Pack</td>
                        <td style="padding:6px 0;font-size:14px;color:#1A1A2E;font-weight:700;">${pack}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:14px;color:#888;font-weight:600;">Occasion</td>
                        <td style="padding:6px 0;font-size:14px;color:#1A1A2E;font-weight:700;">${occasion}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:14px;color:#888;font-weight:600;">Faces</td>
                        <td style="padding:6px 0;font-size:14px;color:#1A1A2E;font-weight:700;">${faces}</td>
                      </tr>
                      <tr>
                        <td style="padding:6px 0;font-size:14px;color:#888;font-weight:600;">Add-Ons</td>
                        <td style="padding:6px 0;font-size:14px;color:#1A1A2E;font-weight:700;">${addOns}</td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Total -->
          <tr>
            <td style="padding:16px 32px 0;">
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:linear-gradient(135deg,#1A1A2E,#2D2D44);border-radius:16px;padding:20px;">
                <tr>
                  <td style="font-size:14px;color:rgba(255,255,255,0.7);font-weight:700;">Order Total</td>
                  <td align="right" style="font-size:28px;color:#FFB800;font-weight:800;">${total}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 32px 32px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#bbb;font-weight:600;">This is an automated notification from FaciEggs 🥚</p>
              <p style="margin:4px 0 0;font-size:11px;color:#ddd;">Please contact the customer to confirm delivery.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

export async function POST(request: Request) {
  try {
    const data: OrderPayload = await request.json();
    const { to, subject, body } = data;

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;

    if (!emailUser || !emailPass) {
      throw new Error('EMAIL_USER or EMAIL_PASS environment variables are not set.');
    }

    // Use explicit SMTP configuration for Gmail to ensure reliability in serverless environments
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: { user: emailUser, pass: emailPass },
    });

    // Determine sender address based on available credentials
    const fromAddress = emailUser;
    const htmlContent = buildHtmlEmail(data);

    const adminEmail = process.env.EMAIL_USER || 'dinathayush@gmail.com';
    const mailOptions = {
      from: `"FaciEggs 🥚" <${fromAddress}>`,
      to: adminEmail,
      subject,
      text: body, // plain text fallback
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);

    console.log('Message sent: %s', info.messageId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error sending order email:', error);
    return NextResponse.json(
      { success: false, error: String(error) },
      { status: 500 },
    );
  }
}
