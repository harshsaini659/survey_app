const { Survey, Question, Response } = require('../models');
const { Op } = require('sequelize');

exports.getEligibleSurveys = async (req, res) => {
  try {
    const user = req?.user;
    if (!user) return res.status(404).json({ msg: 'User not found' });
    const surveys = await Survey.findAll({
      where: {
        [Op.and]: [
          {
            [Op.or]: [
              { targetGender: 'all' },
              { targetGender: user?.gender }
            ]
          },
          { minAge: { [Op.lte]: user?.age } },
          { maxAge: { [Op.gte]: user?.age } }
        ]
      },
      include: [Question]
    });

    const responses = await Response.findAll({ where: { userId: user?.id } });
    const takenSurveyIds = responses?.map(r => r.surveyId);
    const eligibleSurveys = surveys?.filter(s => !takenSurveyIds?.includes(s.id));

    res.status(200).json(eligibleSurveys);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching eligible surveys' });
  }
};

exports.submitSurvey = async (req, res) => {
  try {
    const userId = req.user.id;
    const { surveyId, answers } = req.body;

    const exists = await Response.findOne({ where: { userId, surveyId } });
    if (exists) return res.status(400).json({ msg: 'You have already submitted this survey' });

    await Response.create({
      userId,
      surveyId,
      answers: JSON.stringify(answers)
    });

    res.status(201).json({ msg: 'Response submitted successfully' });
  } catch (err) {
    res.status(500).json({ msg: 'Error submitting response' });
  }
};
