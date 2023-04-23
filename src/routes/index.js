const {Router} = require('express');
const {viewIndex, viewAbout} = require('../controllers/IndexController');
const router = Router();

router.get('/', viewIndex);
router.get('/about', viewAbout);

module.exports = router;