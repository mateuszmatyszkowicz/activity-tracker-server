const router = require('express').Router();

// Middlewares
const {
    isAuthenticated
} = require('../../middleware');

// Controllers
const {
    ActionCtrl,
    GlobalCtrl,
} = require('../../controllers');


router.route('/:id')
    .get(ActionCtrl.getOne)
    .post(GlobalCtrl.notImplemented)
    .put(ActionCtrl.updateOne)
    .delete(ActionCtrl.deleteOne)

router.route('/')
    .get(ActionCtrl.getAll)
    .post(ActionCtrl.addOne)
    .put(GlobalCtrl.notImplemented)
    .delete(GlobalCtrl.notImplemented)

module.exports = router;
