const router = require('express').Router();

const { AuthCtrl } = require('../../controllers');

router.post('/', AuthCtrl.login);

module.exports = router;
