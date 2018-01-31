const router = require('express').Router();

// Controllers
const { AuthCtrl } = require('../../controllers');

// Routes
router.post('/', AuthCtrl.login);

module.exports = router;
