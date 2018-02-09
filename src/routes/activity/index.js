const router = require('express').Router();

// Controllers
const {
    ActivityCtrl,
    HelperCtrl,
} = require('../../controllers');


router.get('/:id', ActivityCtrl.getOne)
router.post('/:id', HelperCtrl.notImplemented)
router.put('/:id', ActivityCtrl.updateOne)
router.delete('/:id', ActivityCtrl.deleteOne);


router.get('/:id/logs', ActivityCtrl.getOneLogs);
router.post('/:id/start', ActivityCtrl.startActivity);
router.post('/:id/stop', ActivityCtrl.stopActivity);

router.get('/', ActivityCtrl.getAll)
router.post('/', ActivityCtrl.addOne)
router.put('/', HelperCtrl.notImplemented)
router.delete('/', HelperCtrl.notImplemented);

module.exports = router;
