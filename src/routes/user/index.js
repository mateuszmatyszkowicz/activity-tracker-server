const router = require('express').Router();
const boom = require('boom');

// Middlewares
const {
    isAuthenticated,
} = require('../../middleware');

// Controllers
const {
     UserCtrl,
     HelperCtrl,
} = require('../../controllers');

// Routes
router.get('/:id', isAuthenticated, UserCtrl.get);
router.post('/:id', HelperCtrl.notImplemented);
router.put('/:id', HelperCtrl.notImplemented);
router.delete('/:id', isAuthenticated, UserCtrl.delete);

router.get('/', isAuthenticated, UserCtrl.getAll);
router.post('/', UserCtrl.create);
router.put('/', HelperCtrl.notImplemented);
router.delete('/', HelperCtrl.notImplemented);

module.exports = router;
