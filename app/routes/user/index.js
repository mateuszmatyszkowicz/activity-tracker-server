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
router.post('/login', UserCtrl.login);

router.post('/signup', UserCtrl.signup);

router.delete('/:id', UserCtrl.delete);

router.get('/', isAuthenticated, UserCtrl.getAll);

router.get('/:id', isAuthenticated, UserCtrl.get);

module.exports = router;
