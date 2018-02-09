const router = require('express').Router();

// Controllers
const {
    LogCtrl,
    HelperCtrl,
} = require('../../controllers');

router.get('/', LogCtrl.getLogs)
router.post('/', LogCtrl.addLog)

module.exports = router;
