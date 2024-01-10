const router = require('express').Router();

const { sendCivilMailConfirmation, sendReligiousMailConfirmation } = require('../../controllers/mails/mails.controller');

router.post('/civil-wedding', sendCivilMailConfirmation);
router.post('/religious-wedding', sendReligiousMailConfirmation);

module.exports = router;