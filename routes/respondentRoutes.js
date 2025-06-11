const router = require('express').Router();
const { getEligibleSurveys } = require('../controllers/respondentController');
const { auth, requireRole } = require('../middlewares/authMiddleware');

router.use(auth, requireRole('respondent'));

router.get('/surveys', getEligibleSurveys);

module.exports = router;
