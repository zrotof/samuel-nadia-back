require("dotenv").config();

module.exports = {
  port: process.env.PORT || 4000,
  o2switch: {
    router: process.env.O2SWITCH_USER_EMAIL_ROUTER,
    receiver: process.env.O2SWITCH_USER_EMAIL_CONFIRMATION_RECEIVER,
    password: process.env.O2SWITCH_USER_PASS_ROUTER,
  }
};
