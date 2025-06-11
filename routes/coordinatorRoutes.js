const router = require('express').Router();
const {createSurvey} = require('../controllers/coordinatorController');

const { auth, requireRole } = require('../middlewares/authMiddleware');

router.use(auth, requireRole('coordinator'));

router.post('/survey', createSurvey);

module.exports = router;
