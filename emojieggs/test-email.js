const nodemailer = require('nodemailer');
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: { user: 'dinathayush@gmail.com', pass: 'chvaipffzodlnahr' }
});
transporter.sendMail({
  from: '"FaciEggs 🥚" <dinathayush@gmail.com>',
  to: 'dinathayush@gmail.com',
  subject: 'Test Emoji',
  text: 'Test',
  html: '<html><body><h1>Hi</h1></body></html>'
}, (err, info) => {
  if (err) console.error(err);
  else console.log(info);
});
