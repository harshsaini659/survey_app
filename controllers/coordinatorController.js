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
