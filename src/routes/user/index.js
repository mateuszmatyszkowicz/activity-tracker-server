const router = require('express').Router();
const boom = require('boom');

// Controllers
const {
     UserCtrl,
     HelperCtrl,
} = require('../../controllers');

// Routes
router.get('/:id', UserCtrl.get);
router.post('/:id', HelperCtrl.notImplemented);
router.put('/:id', HelperCtrl.notImplemented);
router.delete('/:id', UserCtrl.delete);

router.get('/', UserCtrl.getAll);
router.post('/', UserCtrl.create);
router.put('/', HelperCtrl.notImplemented);
router.delete('/', HelperCtrl.notImplemented);

module.exports = router;
