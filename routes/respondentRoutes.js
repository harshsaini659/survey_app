const router = require('express').Router();
const { getEligibleSurveys, submitSurvey} = require('../controllers/respondentController');
const { auth, requireRole } = require('../middlewares/authMiddleware');

router.use(auth, requireRole('respondent'));

router.get('/surveys', getEligibleSurveys);
router.post('/submit', submitSurvey);

module.exports = router;
