const { Survey, Question } = require('../models');

exports.createSurvey = async (req, res) => {
  try {
    const { title, description, targetGender, minAge, maxAge, questions } = req.body;
    const coordinatorId = req.user.id;

    const survey = await Survey.create({
      title,
      description,
      targetGender,
      minAge,
      maxAge,
      coordinatorId
    });

    if (questions && questions.length > 0) {
      const questionData = questions.map(q => ({ text: q, surveyId: survey.id }));
      await Question.bulkCreate(questionData);
    }

    res.status(201).json({ msg: 'Survey created', surveyId: survey.id });
  } catch (err) {
    res.status(500).json({ msg: 'Error creating survey', error: err.message });
  }
};

exports.getMySurveys = async (req, res) => {
  try {
    const surveys = await Survey.findAll({
      where: { coordinatorId: req.user.id },
      include: [Question]
    });
    res.status(200).json(surveys);
  } catch (err) {
    res.status(500).json({ msg: 'Error fetching surveys' });
  }
};

exports.editSurvey = async (req, res) => {
  try {
    const { surveyId } = req.params;
    const { title, description, targetGender, minAge, maxAge } = req.body;

    const survey = await Survey.findOne({ where: { id: surveyId, coordinatorId: req.user.id } });
    if (!survey) return res.status(404).json({ msg: 'Survey not found' });

    await survey.update({ title, description, targetGender, minAge, maxAge });

    res.status(200).json({ msg: 'Survey updated' });
  } catch (err) {
    res.status(500).json({ msg: 'Error updating survey' });
  }
};
