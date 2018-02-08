const router = require('express').Router();

// Controllers
const {
    ActionCtrl,
    HelperCtrl,
} = require('../../controllers');


router.route('/:id')
    .get(ActionCtrl.getOne)
    .post(HelperCtrl.notImplemented)
    .put(ActionCtrl.updateOne)
    .delete(ActionCtrl.deleteOne);


router.get('/:id/logs', ActionCtrl.getLogs)
router.post('/:id/start', ActionCtrl.startActivity);
router.post('/:id/stop', ActionCtrl.stopActivity);

router.route('/')
    .get(ActionCtrl.getAll)
    .post(ActionCtrl.addOne)
    .put(HelperCtrl.notImplemented)
    .delete(HelperCtrl.notImplemented);

module.exports = router;
