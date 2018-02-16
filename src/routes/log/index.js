const router = require('express').Router();

// Controllers
const {
    LogCtrl,
    HelperCtrl,
} = require('../../controllers');

router.get('/', LogCtrl.getLogs)
router.get('/summary', LogCtrl.getLogsSummary)
router.post('/', LogCtrl.addLog)


module.exports = router;
