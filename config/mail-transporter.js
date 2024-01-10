const nodemailer = require("nodemailer");
const { o2switch } = require("./dot-env");

const transporter = nodemailer.createTransport({
  host: "polski.o2switch.net",
  port: 465,
  secure: true,
  auth: {
    user: o2switch.router,
    pass: o2switch.password,
  },
});

module.exports = { transporter };
