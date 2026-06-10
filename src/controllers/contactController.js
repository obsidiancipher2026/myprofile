const xss = require('xss');
const nodemailer = require('nodemailer');
const env = require('../config/env');

function emailTemplate({ name, email, message }) {
  const safeName = xss(name);
  const safeEmail = xss(email);
  const safeMessage = xss(message).replace(/\n/g, '<br>');
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="margin:0;padding:0;background-color:#0a0a0a;font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#0a0a0a;padding:40px 20px">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background-color:#111;border:1px solid #00e5ff;border-radius:12px;overflow:hidden">
          <tr>
            <td style="background:linear-gradient(135deg,#00e5ff,#00b8d4);padding:30px;text-align:center">
              <table cellpadding="0" cellspacing="0" style="margin:0 auto">
                <tr>
                  <td style="background:#111;width:60px;height:60px;border-radius:50%;text-align:center;vertical-align:middle;border:2px solid #00e5ff">
                    <span style="font-size:28px;line-height:60px;color:#00e5ff">&#x1f6e1;</span>
                  </td>
                </tr>
              </table>
              <h1 style="color:#111;margin:16px 0 0;font-size:22px;letter-spacing:1px;font-weight:700">Shayan Ahmed</h1>
              <p style="color:#111;margin:4px 0 0;font-size:13px;opacity:0.85">Cybersecurity Portfolio</p>
            </td>
          </tr>
          <tr>
            <td style="padding:30px">
              <h2 style="color:#00e5ff;font-size:18px;margin:0 0 20px;border-bottom:1px solid #222;padding-bottom:10px">New Contact Message</h2>
              <table width="100%" cellpadding="0" cellspacing="0">
                <tr>
                  <td style="padding:12px 16px;background:#1a1a1a;border-radius:8px;border-left:3px solid #00e5ff">
                    <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px">Name</span>
                    <p style="color:#fff;margin:4px 0 0;font-size:15px">${safeName}</p>
                  </td>
                </tr>
                <tr><td height="10"></td></tr>
                <tr>
                  <td style="padding:12px 16px;background:#1a1a1a;border-radius:8px;border-left:3px solid #00e5ff">
                    <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px">Email</span>
                    <p style="color:#fff;margin:4px 0 0;font-size:15px">
                      <a href="mailto:${safeEmail}" style="color:#00e5ff;text-decoration:none">${safeEmail}</a>
                    </p>
                  </td>
                </tr>
                <tr><td height="10"></td></tr>
                <tr>
                  <td style="padding:12px 16px;background:#1a1a1a;border-radius:8px;border-left:3px solid #00e5ff">
                    <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px">Message</span>
                    <p style="color:#ddd;margin:4px 0 0;font-size:14px;line-height:1.6">${safeMessage}</p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
          <tr>
            <td style="background:#0d0d0d;padding:20px 30px;text-align:center;border-top:1px solid #1a1a1a">
              <p style="color:#555;font-size:12px;margin:0">This message was sent from your cybersecurity portfolio contact form.</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}

exports.submit = (prisma) => async (req, res) => {
  const errors = [];
  const { name, email, message } = req.body;

  if (!name || name.trim().length < 2) errors.push('Name is required (min 2 characters).');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Valid email is required.');
  if (!message || message.trim().length < 10) errors.push('Message must be at least 10 characters.');

  if (errors.length) {
    return res.render('pages/contact', {
      title: 'Contact — Shayan Ahmed',
      errors,
      form: { name, email, message },
    });
  }

  try {
    await prisma.contactMessage.create({
      data: {
        name: xss(name.trim()),
        email: xss(email.trim()),
        message: xss(message.trim()),
      },
    });

    if (env.smtp.user && env.smtp.pass) {
      try {
        const transporter = nodemailer.createTransport({
          host: env.smtp.host,
          port: env.smtp.port,
          secure: false,
          auth: { user: env.smtp.user, pass: env.smtp.pass },
        });
        await transporter.sendMail({
          from: `"Shayan Ahmed — Portfolio" <${env.smtp.user}>`,
          to: env.smtp.notifyEmail,
          subject: `New Contact: ${name} sent you a message`,
          html: emailTemplate({ name, email, message }),
        });
      } catch (mailErr) {
        console.error('Email send failed:', mailErr.message);
      }
    }

    res.render('pages/contact', {
      title: 'Contact — Shayan Ahmed',
      errors: null,
      form: {},
      success: 'Thank you! Your message has been sent successfully.',
    });
  } catch (err) {
    res.render('pages/contact', {
      title: 'Contact — Shayan Ahmed',
      errors: ['Something went wrong. Please try again later.'],
      form: { name, email, message },
    });
  }
};
