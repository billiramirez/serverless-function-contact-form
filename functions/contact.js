const mailgun = require("mailgun-js");
require("dotenv").config();

exports.handler = (event, _context, callback) => {
  const mg = mailgun({
    apiKey: process.env.MAILGUN_API_KEY,
    domain: process.env.MAILGUN_DOMAIN,
  });

  const data = JSON.parse(event.body);

  const email = {
    from: "Billi Ramirez <billyramirezalex@gmail.com>",
    to: `${data.name} <${data.email}>`,
    subject: data.subject,
    text: data.body,
  };

  mg.messages().send(email, (err, body) => {
    callback(err, {
      statusCode: 200,
      body: JSON.stringify(body),
    });
  });
};
