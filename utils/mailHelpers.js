const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");

const mailHelper = async (user) => {
  //send grid setup
  const transport = nodemailer.createTransport(
    sendgridTransport({
      auth: {
        api_key:
          "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",
      },
    })
  );

  transport
    .sendMail({
      to: user.email,
      from: "pythongaming184@gmail.com",
      subject: user.subject,
      html: user.message,
    })
    .then(console.log("Success!"))
    .catch((err) => console.log(err));

  //mailtrap setup
  // let transporter = nodemailer.createTransport({
  //   host: process.env.SMTP_HOST,
  //   port: process.env.SMTP_PORT,
  //   auth: {
  //     user: process.env.SMTP_USER,
  //     pass: process.env.SMTP_PASS,
  //   },
  // });
};

module.exports = mailHelper;
