const router = require('express').Router();
const {createSurvey, getMySurveys, editSurvey} = require('../controllers/coordinatorController');

const { auth, requireRole } = require('../middlewares/authMiddleware');

router.use(auth, requireRole('coordinator'));

router.post('/survey', createSurvey);
router.get('/surveys', getMySurveys);
router.put('/survey/:surveyId', editSurvey);

module.exports = router;
