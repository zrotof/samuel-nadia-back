const router = require('express').Router();

const mailsRoute = require('./mails/mails')

router.use("/mails", mailsRoute);

module.exports = router;