const router = require('express').Router();

// Middlewares
const {
    isAuthenticated
} = require('../../middleware');

// Controllers
const {
     UserCtrl
} = require('../../controllers');


// Routes
router.post('/', UserCtrl.signup);

router.delete('/', isAuthenticated, UserCtrl.deleteAll);
router.delete('/:id', isAuthenticated, UserCtrl.delete);

router.get('/', isAuthenticated, UserCtrl.getAll);
router.get('/:id', isAuthenticated, UserCtrl.get);

module.exports = router;
